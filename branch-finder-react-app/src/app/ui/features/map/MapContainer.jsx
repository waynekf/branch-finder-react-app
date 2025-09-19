'use client';

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapContainer.style.scss';

function MapContainer({ homePostcode, myfeatures }) {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    if (
      homePostcode?.latitude !== undefined &&
      homePostcode?.longitude !== undefined
    ) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_API_KEY;
      
      console.log("=>");
      console.log(homePostcode, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [homePostcode?.longitude, homePostcode?.latitude],
        zoom: 10.12,
      });

      // add markers to map
      for (const feature of myfeatures.features) {
        // code from step 7-1 will go here
        const el = document.createElement('div');
        el.className = 'home-marker';
        
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map); // Replace this line with code from step 7-2

        //code from step 8 will go here
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<p>${feature.properties.title}</p><p>${feature.properties.description}</p>`,
              ),
          )
          .addTo(map);
      }

      mapRef.current = map;
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
  }, [homePostcode]);

  return (
    <>
      {homePostcode.postcode && (
        <div
          id="map-container"
          className="map-container"
          ref={mapContainerRef}
        />
      )}
    </>
  );
}

export default MapContainer;
