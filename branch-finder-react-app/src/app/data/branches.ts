import { Branch } from '../schema/branch';

function getBranches(): Branch[] {
  return [
    {
      name: 'Bracknell',
      address: {
        addressLine1: 'somewhere in bracknell',
        addressLine2: '',
        town: 'Bracknell',
        county: 'Berkshire',
        postcode: 'RG423SH',
      },
      coordinates: {
        latitude: 51.423723,
        longitude: -0.739431,
        eastings: 487742,
        northings: 170166,
      },
    },
    {
      name: 'Slough',
      address: {
        addressLine1: 'somewhere in Slough',
        addressLine2: '',
        town: 'Slough',
        county: 'Berkshire',
        postcode: 'SL24HL',
      },
      coordinates: {
        latitude: 51.532009,
        longitude: -0.573974,
        eastings: 499011,
        northings: 182419,
      },
    },
    {
      name: 'Reading',
      address: {
        addressLine1: '30 Queen Victoria Street',
        addressLine2: '',
        town: 'Reading',
        county: 'Berkshire',
        postcode: 'RG11TG',
      },
      coordinates: {
        latitude: 51.456322,
        longitude: -0.971855,
        eastings: 471531,
        northings: 173539,
      },
    },
    {
      name: 'Woking',
      address: {
        addressLine1: '4 Mercia Walk',
        addressLine2: '',
        town: 'Woking',
        county: 'Surrey',
        postcode: 'GU216XS',
      },
      coordinates: {
        latitude: 51.31948,
        longitude: -0.558215,
        eastings: 500569,
        northings: 158806,
      },
    },
  ] as Branch[];
}

export default getBranches;
