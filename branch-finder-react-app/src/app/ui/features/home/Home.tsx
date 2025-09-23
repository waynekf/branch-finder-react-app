'use client';

import getPostcode from '@/app/api/mapping-api';
import { ChangeEvent, useEffect, useState } from 'react';
import logger from '../../../../logger';
import { CustomError } from '../error/CustomError';
import ErrorSummary from '../error/ErrorSummary';
import MapContainer from '../map/MapContainer';
import EmptyMapContainer from '../map/EmptyMapContainer';
import { FeatureCollection } from '../../../schema/map/FeatureCollection';
import './Home.style.scss';
import getBranches from '@/app/data/branches';
import {
  fromBranchToFeature,
  fromPostcodeResponseToFeature,
} from '@/app/utils/conversions';

function Home() {
  const [search, setSearch] = useState(
    process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_POSTCODE as string,
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({} as CustomError);
  const [mapPoints, setMapPoints] = useState({} as FeatureCollection);

  useEffect(() => {
    logger.info('calling postcode api...');
    getPostcode(search)
      .then((postcode) => {
        const mapPoints: FeatureCollection = {
          type: 'FeatureCollection',
          features: [
            fromPostcodeResponseToFeature(postcode),
            ...getBranches().map(fromBranchToFeature),
          ],
        };
        return setMapPoints(mapPoints);
      })
      .catch((error) => {
        console.log(error, ' ERROR');
        if (error.status === 404) {
          setError(error);
          setMapPoints({} as FeatureCollection);
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
    setMapPoints({} as FeatureCollection);
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
    <div>
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
      {!error.msg && <MapContainer mapPoints={mapPoints} />}
      {error.msg && <EmptyMapContainer customError={error} />}
      {error && <ErrorSummary customError={error} />}
    </div>
  );
}

export default Home;
