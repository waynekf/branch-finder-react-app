type Position = {
  Northings: number;
  Eastings: number;
};

const getDistance = (position1: Position, position2: Position): number => {
  const a = Math.abs(position1.Eastings - position2.Eastings);
  const b = Math.abs(position1.Northings - position2.Northings);
  const m = Math.pow(Math.pow(a, 2) + Math.pow(b, 2), 0.5);
  const kms = m / 1000;

  return Math.floor(kms);
};

export type { Position };
export { getDistance };
