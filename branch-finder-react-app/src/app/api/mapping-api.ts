import { PostcodeResponse } from 'branch-finder-schemas';
import { CustomError } from 'branch-finder-schemas';

function getPostcode(postcode: string) {
  const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_POSTCODE_BASE_URL as string;
  const url = baseUrl + `/${postcode}`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw {
          status: res.status,
          msg: 'unexpected error',
        } as CustomError;
      } else if (res.status === 404) {
        return Promise.reject({
          status: res.status,
          msg: 'Failed to match postcode',
        } as CustomError);
      }
      return res.json();
    })
    .then((postcode) => {
      return postcode.result as PostcodeResponse;
    });
}

export default getPostcode;
