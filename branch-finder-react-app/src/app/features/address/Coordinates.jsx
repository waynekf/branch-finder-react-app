function Coordinates({ latitude, longitude, northings, eastings }) {
  if (latitude && longitude) {
    const latitude_degrees =
      +latitude > 0 ? Math.floor(+latitude) : -1 * Math.ceil(+latitude);
    const latitude_minutes = String(latitude).slice(-6, -2);
    const latitude_seconds = String(latitude).slice(-2);

    const longitude_degrees =
      +longitude > 0 ? Math.floor(+longitude) : -1 * Math.ceil(+longitude);
    const longitude_minutes = String(longitude).slice(-6, -2);
    const longitude_seconds = String(longitude).slice(-2);

    return (
      <>
        <div>
          <u>Coordinates</u>:
        </div>
        <div>
          <span>{`${latitude_degrees}°${latitude_minutes}'${latitude_seconds}'' ${+latitude > 0 ? "N" : "S"}`}</span>
          <br />
          <span>{`${longitude_degrees}°${longitude_minutes}'${longitude_seconds}'' ${+longitude > 0 ? "E" : "W"}`}</span>
          <br />
          <span>
            {northings} {eastings}
          </span>
        </div>
      </>
    );
  } else {
    return <span></span>;
  }
}

export default Coordinates;
