import { Branch } from '@/app/schema/branch/Branch';

function Branches(): Branch[] {
  return [
    {
      name: 'Skipton',
      address: {
        addressLine1: '59 High Street',
        addressLine2: '',
        town: 'Skipton',
        county: 'North Yorkshire',
        postcode: 'BD23 1DS',
      },
    },
    {
      name: 'Woking',
      address: {
        addressLine1: '4 Mercia Walk',
        addressLine2: '',
        town: 'Woking',
        county: 'Surrey',
        postcode: 'GU21 6XS',
      },
    },
  ];
}

export default Branches;
