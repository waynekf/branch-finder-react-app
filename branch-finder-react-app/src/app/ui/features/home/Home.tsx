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
import { Branch } from '@/app/schema/branch/Branch';
import { Feature } from '@/app/schema/map/Feature';

function Home() {
  const [search, setSearch] = useState(
    process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_POSTCODE as string,
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({} as CustomError);
  const [features, setFeatures] = useState({} as FeatureCollection);

  useEffect(() => {
    logger.info('calling postcode api...');
    getPostcode(search)
      .then((data) => {
        
        
        const branches: Branch[] = getBranches();
        
        
        const home1: Feature[] = [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [data?.longitude, data?.latitude],
          },
          properties: {
            title: 'Home',
            description: 'Where I live',
            address: {
              addressLine1: '',
              addressLine2: '',
              town: '',
              county: '',
              postcode: 'SL59TG',
            },
          },
          }];
        
        const branches1: Feature[] = [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-0.739431, 51.423723],
            },
            properties: {
              title: 'Branch',
              description: 'My nearest branch',
              address: {
                addressLine1: '',
                addressLine2: '',
                town: '',
                county: '',
                postcode: 'RG423SH',
              },
            },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-0.573974, 51.532009],
            },
            properties: {
              title: 'Branch',
              description: 'Another My nearest branch',
              address: {
                addressLine1: '',
                addressLine2: '',
                town: '',
                county: '',
                postcode: 'SL24HL',
              },
            },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-0.971855, 51.456322],
            },
            properties: {
              title: 'Branch',
              description: 'Reading Branch',
              address: {
                addressLine1: '30 Queen Victoria Street',
                addressLine2: '',
                town: 'Reading',
                county: 'Berkshire',
                postcode: 'RG11TG',
              },
            },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-0.558215, 51.31948],
            },
            properties: {
              title: 'Branch',
              description: 'Yet Another My nearest branch',
              address: {
                addressLine1: '4 Mercia Walk',
                addressLine2: '',
                town: 'Woking',
                county: 'Surrey',
                postcode: 'GU216XS',
              },
            },
          },
        ];
        
        
        
        const features1: Feature[] = [...home1, ...branches1]
        
        console.log(features1, "mmmmmmmmmmmmmmm");
        
        
        
        let myfeatures: FeatureCollection = {
          type: 'FeatureCollection',
          features: features1,
        };
        
        return setFeatures(myfeatures);
      })
      .catch((error) => {
        console.log(error, ' ERROR');
        if (error.status === 404) {
          setError(error);
          setFeatures({} as FeatureCollection);
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
    setFeatures({} as FeatureCollection);
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
      {!error.msg && <MapContainer myFeatures={features} />}
      {error.msg && <EmptyMapContainer error={error} />}
      {error && <ErrorSummary customError={error} />}
    </div>
  );
}

export default Home;
