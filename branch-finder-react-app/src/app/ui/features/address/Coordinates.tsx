'use client';

function Coordinates(props: { position: number[] }) {
  const latitude_degrees =
    +props.position[1] > 0
      ? Math.floor(+props.position[1])
      : -1 * Math.ceil(+props.position[1]);
  const latitude_minutes = String(props.position[1]).slice(-6, -2);
  const latitude_seconds = String(props.position[1]).slice(-2);

  const longitude_degrees =
    +props.position[0] > 0
      ? Math.floor(+props.position[0])
      : -1 * Math.ceil(+props.position[0]);
  const longitude_minutes = String(props.position[0]).slice(-6, -2);
  const longitude_seconds = String(props.position[0]).slice(-2);

  return props?.position?.[0] && props?.position?.[1] ? (
    <span>
      {`${latitude_degrees}°${latitude_minutes}'${latitude_seconds}'' ${
        +props.position[1] > 0 ? 'N' : 'S'
      }`}{' '}
      {`${longitude_degrees}°${longitude_minutes}'${longitude_seconds}'' ${
        +props.position[0] > 0 ? 'E' : 'W'
      }`}
    </span>
  ) : (
    <span></span>
  );
}

export default Coordinates;
