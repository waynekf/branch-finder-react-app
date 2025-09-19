export type Features = {
  type: string;
  features: Feature[];
};

export type Feature = {
  type: string;
  geometry: Geometry;
  properties: Property;
};

export type Geometry = {
  type: string;
  coordinates: number[];
};

export type Property = {
  title: string;
  description: string;
};

/*
const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-0.638025, 51.391925],
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.',
      },
    },
  ],
};
*/
