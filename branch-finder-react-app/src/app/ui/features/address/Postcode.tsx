'use client';

function Postcode(props: {
  selected: {
    postcode: string;
    region: string;
    country: string;
    longitude: number;
    latitude: number;
    eastings: number;
    northings: number;
  };
}) {
  return (
    <>
      {props.selected && props.selected.postcode}
      <br />
      {props.selected?.country && props.selected.country}
      <br />
      {props.selected?.longitude && props.selected.longitude}
      <br />
      {props.selected?.latitude && props.selected.latitude}
      <br />
      {props.selected?.region && props.selected.region}
      <br />
      {props.selected?.eastings && props.selected.eastings}
      <br />
      {props.selected?.northings && props.selected.northings}
    </>
  );
}

export default Postcode;
