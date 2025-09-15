import { useContext } from "react";
import { AddressContext } from "../../contexts/AddressContext";
import Coordinates from "./Coordinates";

function Address() {
  const { address } = useContext(AddressContext);

  if (address.address && Object.keys(address.address).length > 0) {
    return (
      <div className="address">
        <div>
          <Coordinates
            id="coordinates"
            latitude={address?.address?.latitude}
            longitude={address?.address?.longitude}
            northings={address?.address?.northings}
            eastings={address?.address?.eastings}
          />
        </div>
        <div>
          <span>
            <label>{address?.address?.parish}</label>
          </span>
        </div>
        <div>
          <span>
            <label>{address?.address?.region}</label>
          </span>
        </div>
        <div>
          <span>
            <label>
              {address?.address?.outcode} {address?.address?.incode}
            </label>
          </span>
        </div>
      </div>
    );
  } else {
    return <div className="address">{address?.error?.msg}</div>;
  }
}

export default Address;
