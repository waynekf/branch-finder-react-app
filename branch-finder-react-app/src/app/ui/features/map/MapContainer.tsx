'use client';

import { useRef, useEffect } from 'react';
import mapboxgl, { MapOptions } from 'mapbox-gl';
import { FeatureCollection } from '../../../schema/map/FeatureCollection';
import { Feature } from '@/app/schema/map';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapContainer.style.scss';

function MapContainer(props: { myFeatures: FeatureCollection }) {
  const mapRef = useRef({});
  const mapContainerRef = useRef({});

  useEffect(() => {
    const home: Feature = (props.myFeatures.features || []).find(
      (feature) => feature.properties.title === 'Home',
    ) as Feature;
    const branches: Feature[] = (props.myFeatures.features || []).filter(
      (feature) => feature.properties.title === 'Branch',
    ) as Feature[];

    const lat: number = home?.geometry.coordinates[0] ?? 0;
    const lng: number = home?.geometry.coordinates[1] ?? 0;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [lat, lng],
      zoom: 10.12,
    } as MapOptions);

    const homeMarker = document.createElement('div');
    homeMarker.className = 'home-marker';
    new mapboxgl.Marker(homeMarker)
      .setLngLat([lat, lng])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<p>${home?.properties.title}</p><p>${home?.properties.description}</p>`,
          ),
      )
      .addTo(map);

    for (const feature of branches || []) {
      const branchMarker = document.createElement('div');
      branchMarker.className = 'branch-marker';

      new mapboxgl.Marker(branchMarker)
        .setLngLat([
          feature.geometry.coordinates[0],
          feature.geometry.coordinates[1],
        ])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<p>${feature.properties.title}</p><p>${feature.properties.description}</p>`,
            ),
        )
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
  }, [props.myFeatures]);

  return (
    <div id="map-container" className="map-container" ref={mapContainerRef} />
  );
}

export default MapContainer;
