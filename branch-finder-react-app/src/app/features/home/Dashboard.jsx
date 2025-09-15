import Address from "../address/Address";
import Map from "../map/Map";
import { AddressProvider } from "../../contexts/AddressContext";
import SearchPostcode from "./SearchPostcode";

function Dashboard() {
  return (
    <AddressProvider>
      <section className="intro" id="zen-intro">
        <div className="summary" id="zen-summary" role="article">
          <SearchPostcode />
          <Address />
        </div>

        <div className="preamble" id="zen-preamble" role="article"></div>
      </section>

      <div className="main supporting" id="zen-supporting" role="main">
        <div className="explanation" id="zen-explanation" role="article">
          <h3>So What is This About?</h3>
          <Map />
        </div>

        <div className="participation" id="zen-participation" role="article">
          <h3>Participation</h3>
        </div>

        <div className="benefits" id="zen-benefits" role="article">
          <h3>Benefits</h3>
        </div>

        <div className="requirements" id="zen-requirements" role="article">
          <h3>Requirements</h3>
        </div>
      </div>
    </AddressProvider>
  );
}

export default Dashboard;
