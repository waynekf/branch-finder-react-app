import { PostcodeResponse } from '../schema/postcode/PostcodeResponse';
import { CustomError } from '../ui/features/error/CustomError';

function getPostcode(postcode: string) {
  const url = `https://api.postcodes.io/postcodes/${postcode}`;
  return fetch(url)
    .then((res) => {
      if (res.status === 404) {
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
