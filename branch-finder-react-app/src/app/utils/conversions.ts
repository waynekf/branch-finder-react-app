import { Branch } from '../schema/branch';
import { Feature } from '../schema/map';
import { PostcodeResponse } from '../schema/postcode';

const fromBranchToFeature = (branch: Branch): Feature => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [branch.coordinates.longitude, branch.coordinates.latitude],
    },
    properties: {
      title: 'Branch',
      description: `${branch.name}`,
      address: {
        addressLine1: branch.address.addressLine1,
        addressLine2: branch.address.addressLine2,
        town: branch.address.town,
        county: branch.address.county,
        postcode: branch.address.postcode,
      },
      coordinates2: [branch.coordinates.eastings, branch.coordinates.northings],
      distance: 0,
    },
  } as Feature;
};

const fromPostcodeResponseToFeature = (postcode: PostcodeResponse): Feature => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [postcode.longitude, postcode.latitude],
    },
    properties: {
      title: 'Home',
      description: `${postcode.postcode}`,
      address: {
        addressLine1: '',
        addressLine2: '',
        town: postcode.admin_ward,
        county: postcode.admin_county,
        postcode: postcode.postcode,
      },
      coordinates2: [postcode.eastings, postcode.northings],
    },
  } as Feature;
};

const getMapPoints = (
  features: Feature[],
  type: 'Home' | 'Branch',
): Feature[] => {
  return (features || []).filter(
    (feature) => feature.properties.title === type,
  ) as Feature[];
};

export { fromBranchToFeature, fromPostcodeResponseToFeature, getMapPoints };
