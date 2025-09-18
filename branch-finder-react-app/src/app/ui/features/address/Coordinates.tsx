'use client';

import { PostcodeResponse } from '../../../schema/postcode/PostcodeResponse';

function Coordinates(props: { postcode: PostcodeResponse }) {
  if (props?.postcode?.latitude && props?.postcode?.longitude) {
    const latitude_degrees =
      +props.postcode.latitude > 0
        ? Math.floor(+props.postcode.latitude)
        : -1 * Math.ceil(+props.postcode.latitude);
    const latitude_minutes = String(props.postcode.latitude).slice(-6, -2);
    const latitude_seconds = String(props.postcode.latitude).slice(-2);

    const longitude_degrees =
      +props.postcode.longitude > 0
        ? Math.floor(+props.postcode.longitude)
        : -1 * Math.ceil(+props.postcode.longitude);
    const longitude_minutes = String(props.postcode.longitude).slice(-6, -2);
    const longitude_seconds = String(props.postcode.longitude).slice(-2);

    return (
      <>
        <u>Coordinates</u>:
        <span>{`${latitude_degrees}°${latitude_minutes}'${latitude_seconds}'' ${
          +props.postcode.latitude > 0 ? 'N' : 'S'
        }`}</span>
        <br />
        <span>{`${longitude_degrees}°${longitude_minutes}'${longitude_seconds}'' ${
          +props.postcode.longitude > 0 ? 'E' : 'W'
        }`}</span>
        <br />
        <span>
          {props.postcode.northings} {props.postcode.eastings}
        </span>
      </>
    );
  } else {
    return <span></span>;
  }
}

export default Coordinates;
