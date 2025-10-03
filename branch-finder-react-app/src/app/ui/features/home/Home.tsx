'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import getPostcode from '../../../api/mapping-api';
import logger from '../../../../logger';
import { CustomError } from 'branch-finder-schemas';
import ErrorSummary from '../error/ErrorSummary';
import MapContainer from '../map/MapContainer';
import { FeatureCollection } from 'branch-finder-schemas';
import getBranches from 'branch-finder-data';
import {
  fromBranchToFeature,
  fromPostcodeResponseToFeature,
  getDistance,
  wait,
} from 'branch-finder-utils';

import './Home.style.scss';

function Home() {
  const [search, setSearch] = useState(
    process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_POSTCODE as string,
  );
  const [currentState, setCurrentState] = useState(
    'SearchPostcode' as 'SearchPostcode' | 'ShowMap',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({} as CustomError);
  const [mapPoints, setMapPoints] = useState({} as FeatureCollection);

  const initialMapPoints: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-2.025738, 53.95772],
        },
        properties: {
          title: 'Home',
          description: 'BD23 1DN',
          address: {
            addressLine1: '',
            addressLine2: '',
            town: 'Skipton West & West Craven',
            county: 'North Yorkshire',
            postcode: 'BD23 1DN',
          },
          coordinates2: [398409, 451291],
          distance: 0,
        },
      },
    ],
  };
  
  useEffect(() => {
    setIsLoading(true);
    logger.info('calling postcode api...');
    getPostcode(search)
      .then((postcode) => {
        wait(500);
        const mapPoints: FeatureCollection = {
          type: 'FeatureCollection',
          features: [
            fromPostcodeResponseToFeature(postcode),
            ...getBranches().map(fromBranchToFeature),
          ],
        };

        for (const point of mapPoints.features) {
          const distance = getDistance(
            {
              Eastings: postcode.eastings,
              Northings: postcode.northings,
            },
            {
              Eastings: point.properties.coordinates2[0],
              Northings: point.properties.coordinates2[1],
            },
          );
          point.properties.distance = distance;
        }
        return setMapPoints(mapPoints);
      })
      .catch((error) => {
        if (error.status === 404) {
          setError(error);
          setMapPoints(initialMapPoints);
        }
      })
      .finally(() => {
        setSubmitted(false);
        setIsLoading(false);
      });
  }, [submitted]);

  function openDialog(event: React.FormEvent) {
    if (search !== '') {
      setCurrentState('SearchPostcode');
      event.preventDefault();
    }
  }

  function closeDialog(event: React.FormEvent) {
    setCurrentState('ShowMap');
    event.preventDefault();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (search === '') {
      setError({ status: 404, msg: 'Password is mandatory' } as CustomError);

      return;
    } else {
      setError({} as CustomError);
    }
    setCurrentState("ShowMap");
    setSubmitted(true);
  }

  function handleClear(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(false);
    setSearch('');
    setError({} as CustomError);
    setMapPoints(initialMapPoints);
    logger.info('cleared form');
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSubmitted(false);
    setSearch(event.target.value);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    setSearch(search.toUpperCase());
  }

  const searchPostcodeDialog = (
    <dialog open>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={closeDialog}></button>
          <p>
            <strong>Search Postcode</strong>
          </p>
        </header>
        <p>Enter your home postcode to search for your local branch:</p>
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
          <button className="primary">submit</button>
          <button className="secondary" onClick={handleClear}>
            clear
          </button>
          {error && <ErrorSummary customError={error} />}
        </form>
      </article>
    </dialog>
  );

  const defaultMapPoints: FeatureCollection = {
    type: 'FeatureCollection',
    features: mapPoints.features?.filter(
      (point) => point.properties.title === 'Home',
    ),
  };

  return (
    <section>
      <a href="/" onClick={openDialog}>
        search for another postcode...
      </a>
      {currentState === 'SearchPostcode' && searchPostcodeDialog}
      {isLoading && <p>loading...</p>}
      <MapContainer mapPoints={isLoading ? defaultMapPoints : mapPoints} />
    </section>
  );
}

export default Home;
