import { createContext, useState } from "react";

const defaultAddress = {
  postcode: "",
  address: {},
};

const AddressContext = createContext({
  defaultAddress,
  setAddress: () => {},
});

const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(defaultAddress);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export { AddressContext, AddressProvider };
