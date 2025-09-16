'use client';

function Postcode(props: { selected: { country: string; postcode: string } }) {
  return (
    <>
      {props.selected && props.selected.postcode}
      {props.selected && props.selected.country}
    </>
  );
}

export default Postcode;
