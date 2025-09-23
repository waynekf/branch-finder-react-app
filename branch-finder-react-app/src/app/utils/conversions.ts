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
      description: `${branch.name} Branch`,
      address: {
        addressLine1: branch.address.addressLine1,
        addressLine2: branch.address.addressLine2,
        town: branch.address.town,
        county: branch.address.county,
        postcode: branch.address.postcode,
      },
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
    },
  } as Feature;
};

export { fromBranchToFeature, fromPostcodeResponseToFeature };
