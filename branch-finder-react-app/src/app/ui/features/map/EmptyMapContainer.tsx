'use client';

import { CustomError } from '../error/CustomError';
import ErrorSummary from '../error/ErrorSummary';

import './MapContainer.style.scss';

function EmptyMapContainer(props: { customError: CustomError }) {
  return (
    <div id="map-container" className="map-container">
      <ErrorSummary customError={props.customError} />
    </div>
  );
}

export default EmptyMapContainer;
