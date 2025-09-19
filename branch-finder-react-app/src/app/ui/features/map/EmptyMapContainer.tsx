'use client';

import { CustomError } from '../error/CustomError';
import ErrorSummary from '../error/ErrorSummary';

import './MapContainer.style.scss';

function EmptyMapContainer(props: { error: CustomError }) {
  return (
    <div id="map-container" className="map-container">
      <ErrorSummary customError={props.error} />
    </div>
  );
}

export default EmptyMapContainer;
