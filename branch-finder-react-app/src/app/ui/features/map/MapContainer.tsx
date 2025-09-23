'use client';

import { useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl, { MapOptions, PopupOptions } from 'mapbox-gl';
import { FeatureCollection } from '../../../schema/map/FeatureCollection';
import { Feature } from '@/app/schema/map';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapContainer.style.scss';
import { Position, getDistance } from '@/app/utils/getDistance';
import AddressCard from '../address/AddressCard';

function MapContainer(props: { mapPoints: FeatureCollection }) {
  const mapRef = useRef({});
  const mapContainerRef = useRef({});

  const home: Feature = (props.mapPoints.features || []).find(
    (feature) => feature.properties.title === 'Home',
  ) as Feature;
  const branches: Feature[] = (props.mapPoints.features || []).filter(
    (feature) => feature.properties.title === 'Branch',
  ) as Feature[];

  useEffect(() => {
    const lat: number = home?.geometry.coordinates[0] ?? 0;
    const lng: number = home?.geometry.coordinates[1] ?? 0;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [lat, lng],
      zoom: 10.12,
    } as MapOptions);

    const popupOtions: PopupOptions = {
      offset: 25,
      closeButton: false,
      closeOnClick: true,
    };

    const homeMarker = document.createElement('div');
    homeMarker.className = 'home-marker';
    new mapboxgl.Marker(homeMarker)
      .setLngLat([lat, lng])
      .setPopup(
        new mapboxgl.Popup(popupOtions).setHTML(
          `<p>${home?.properties.title}</p><p>${home?.properties.description}</p>`,
        ),
      )
      .addTo(map);

    for (const feature of branches || []) {
      const branchMarker = document.createElement('div');
      const root = createRoot(branchMarker);
      
      root.render(<AddressCard town={feature.properties.address.town} />);
      branchMarker.className = 'branch-marker';

      new mapboxgl.Marker(branchMarker)
        .setLngLat([
          feature.geometry.coordinates[0],
          feature.geometry.coordinates[1],
        ])
        .setPopup(new mapboxgl.Popup(popupOtions).setDOMContent(branchMarker))
        .addTo(map);
    }

    mapRef.current = map;

    return () => {
      try {
        if (mapRef.current) {
          mapRef.current.remove();
        }
      } catch {}
    };
  }, [props.mapPoints]);

  return (
    <>
      <div id="map-container" className="map-container" ref={mapContainerRef} />
    </>
  );
}

export default MapContainer;
