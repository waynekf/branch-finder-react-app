'use client';

import { useRef, useEffect, RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl, { MapOptions, PopupOptions } from 'mapbox-gl';
import { FeatureCollection, Feature } from 'branch-finder-schemas';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapContainer.style.scss';
import AddressCard from '../address/AddressCard';
import { getMapPoints } from 'branch-finder-utils';

function MapContainer(props: { mapPoints: FeatureCollection }) {
  const mapRef: RefObject<FeatureCollection> = useRef({} as FeatureCollection);
  const mapContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  const home: Feature = getMapPoints(props.mapPoints.features, 'Home')[0];
  const branches: Feature[] = getMapPoints(props.mapPoints.features, 'Branch');

  useEffect(() => {
    const lat: number = home?.geometry.coordinates[0] ?? 53.95772;
    const lng: number = home?.geometry.coordinates[1] ?? -2.025738;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [lat, lng],
      zoom: 10.12,
    } as MapOptions);

    const popupOptions: PopupOptions = {
      offset: 25,
      closeButton: false,
      closeOnClick: true,
    };

    const homeMarker = document.createElement('div');
    homeMarker.className = 'home-marker';
    new mapboxgl.Marker(homeMarker)
      .setLngLat([lat, lng])
      .setPopup(
        new mapboxgl.Popup(popupOptions).setHTML(
          `<p>${home?.properties.title}</p><p>${home?.properties.description}</p>`,
        ),
      )
      .addTo(map);

    for (const feature of branches || []) {
      const branchMarker = document.createElement('div');

      const branchPopup = document.createElement('div');
      const root = createRoot(branchPopup);

      root.render(
        <AddressCard
          feature={feature}
          branch={feature.properties.description}
          address={feature.properties.address}
          homeCoordinates={home.properties.coordinates2}
          branchCoordinates={feature.properties.coordinates2}
          distance={feature.properties.distance}
        />,
      );
      branchMarker.className = 'branch-marker';

      new mapboxgl.Marker(branchMarker)
        .setLngLat([
          feature.geometry.coordinates[0],
          feature.geometry.coordinates[1],
        ])
        .setPopup(new mapboxgl.Popup(popupOptions).setDOMContent(branchPopup))
        .addTo(map);
    }

    return () => {
      try {
        if (mapRef.current) {
        }
      } catch {}
    };
  }, [props.mapPoints]);

  return (
    <div
      id="map-container"
      className="map-container"
      aria-busy="true"
      ref={mapContainerRef}
    />
  );
}

export default MapContainer;
