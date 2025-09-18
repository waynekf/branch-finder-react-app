'use client';

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapContainer.style.scss';

function MapContainer({ postcode }) {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    if (postcode?.latitude !== undefined && postcode?.longitude !== undefined) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_API_KEY;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [postcode?.longitude, postcode?.latitude],
        zoom: 10.12,
      });
    }

    return () => {
      try {
        if (mapRef.current) {
          mapRef.current.remove();
        }
      } catch {
      } finally {
      }
    };
  }, [postcode]);

  return (
    <div id="map-container" className="map-container" ref={mapContainerRef} />
  );
}

export default MapContainer;

/*Instructions: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/?step=4*/
/*Tokens: https://console.mapbox.com/account/access-tokens/*/
