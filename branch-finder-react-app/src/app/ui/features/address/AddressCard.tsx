'use client';

import Link from 'next/link';
import { Address } from '@/app/schema/address/Address';
import { Feature } from '@/app/schema/map';
import Coordinates from './Coordinates';

type AddressCardProps = {
  feature: Feature;
  branch: string;
  address: Address;
  homeCoordinates: number[];
  branchCoordinates: number[];
  distance: number;
};

function AddressCard(props: AddressCardProps) {
  return (
    <div className="container">
      <div>
        <Link href={`/branches/${props.branch}`}>
          <b>{props.branch.toUpperCase()}</b>
        </Link>
      </div>
      <div>{props.address.addressLine1}</div>
      <div>{props.address.addressLine2}</div>
      <div>{props.address.town}</div>
      <div>{props.address.county}</div>
      <div>{props.address.postcode}</div>
      <div>
        <Coordinates
          position={[
            props.feature.geometry.coordinates[0],
            props.feature.geometry.coordinates[1],
          ]}
        />
      </div>
      <div>
        Distance to travel:
        {props.distance + ' km'}
      </div>
    </div>
  );
}

export default AddressCard;
