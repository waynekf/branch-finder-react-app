import { Branch } from "../schema/branch";

function getBranches() : Branch[] {
  return [{
      name: "My nearest branch",
      address: {
        addressLine1: "",
        addressLine2: "",
        town: "",
        county: "",
        postcode: "RG423SH",
      },
      coordinates: [-0.739431, 51.423723]
    },
    {
      name: "My nearest branch",
      address: {
        addressLine1: "",
        addressLine2: "",
        town: "",
        county: "",
        postcode: "SL24HL",
      },
      coordinates: [-0.573974, 51.532009]},
    {
      name: "Reading Branch",
      address: {
        addressLine1: "30 Queen Victoria Street",
        addressLine2: "",
        town: "Reading",
        county: "Berkshire",
        postcode: "RG11TG",
      },
      coordinates: [-0.971855, 51.456322]},
    {
      name: "Woking Branch",
      address: {
        addressLine1: "4 Mercia Walk",
        addressLine2: "",
        town: "Woking",
        county: "Surrey",
        postcode: "GU216XS",
      },
      coordinates: [-0.558215, 51.31948]},
    {},
  ] as Branch[];
}

export default getBranches;
 