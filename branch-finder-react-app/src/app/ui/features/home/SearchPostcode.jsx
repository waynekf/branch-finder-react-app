import { useEffect, useState, useContext, Suspense } from 'react';
import Spinner from 'react-loading-indicators';
import { AddressContext } from '../../contexts/AddressContext';
import getPostcode from '../../../apis/mapping-api';
import Posts from '../../sub-pages/Posts';

function SearchPostcode() {
  const { address, setAddress } = useContext(AddressContext);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (address && address.postcode !== '') {
      getPostcode(address.postcode)
        .then((data) => {
          setAddress({
            postcode: data.postcode,
            address: data,
            error: {},
          });
        })
        .catch((error) => {
          setAddress({
            postcode: address.postcode,
            address: {},
            error,
          });
        })
        .finally(() => {});
    } else {
      setAddress({
        postcode: '',
        address: {},
        error: {
          status: 404,
          msg: 'Postcode is mandatory',
        },
      });
    }
  }, [submitted]);

  const handlePostcodeSubmit = function (event) {
    event.preventDefault();
    setSubmitted(true);
    setSubmitted(!submitted);
  };

  const handlePostcodeChange = function (event) {
    setAddress({ postcode: event.target.value.toUpperCase(), address: {} });
  };

  const handleKeyDown = function (event) {
    setAddress({ postcode: event.target.value.toUpperCase(), address: {} });
  };

  return (
    <div>
      <form onSubmit={handlePostcodeSubmit}>
        <input
          type="text"
          onChange={handlePostcodeChange}
          onKeyDown={handleKeyDown}
          value={address.postcode}
        />
        <button>Search</button>
      </form>

      <Suspense fallback={<Spinner style={{ fontSize: '8px' }} />}>
        <Posts />
      </Suspense>
    </div>
  );
}

export default SearchPostcode;
