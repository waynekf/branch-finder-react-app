'use client';

function AddressCard(props: { town: string }) {
  console.log(props.town, 'YYY ^^^^^^^^^^^^^^^^^^^^^^^^^^^123');

  return (
    <>
      <div>QWERTY {props.town}</div>
    </>
  );
}

export default AddressCard;
