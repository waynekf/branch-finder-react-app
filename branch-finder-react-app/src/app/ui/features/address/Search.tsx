'use client';

import getPostcode from '@/app/api/mapping-api';
import { PostcodeResponse } from '@/app/schema/postcode/PostcodeResponse';
import { ChangeEvent, useEffect, useState } from 'react';
import logger from '../../../../logger';
import { CustomError } from '../error/CustomError';
import ErrorSummary from '../error/ErrorSummary';
import Coordinates from './Coordinates';
import Postcode from './Postcode';
import './Search.scss';
import MapContainer from '../map/MapContainer';

function Search() {
  const [search, setSearch] = useState(
    process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_POSTCODE as string,
  );
  const [postcode, setPostcode] = useState({} as PostcodeResponse);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({} as CustomError);

  useEffect(() => {
    logger.info('calling postcode api...');
    getPostcode(search)
      .then((data) => {
        return setPostcode(data);
      })
      .catch((error) => {
        if (error.status === 404) {
          setError(error);
          setPostcode({} as PostcodeResponse);
        }
      })
      .finally(() => {
        setSubmitted(false);
      });
  }, [submitted]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (search === '') {
      setError({ status: 404, msg: 'Password is mandatory' } as CustomError);
    } else {
      setError({} as CustomError);
    }
    setSubmitted(true);
  }

  function handleClear(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(false);
    setSearch('');
    setError({} as CustomError);
    setPostcode({} as PostcodeResponse);
    logger.info('cleared form');
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSubmitted(false);
    setSearch(event.target.value);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    setSearch(search.toUpperCase());
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postcode">Postcode:</label>
        <input
          id="postcode"
          name="postcode"
          value={search}
          type="text"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        ></input>
        <button>submit</button>
        <button onClick={handleClear}>clear</button>
      </form>
      <ErrorSummary customError={error} />
      <Postcode selected={postcode} />
      <Coordinates postcode={postcode} />
      <MapContainer postcode={postcode} />
    </>
  );
}

export default Search;
