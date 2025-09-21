import { PostcodeResponse } from '../schema/postcode/PostcodeResponse';
import { CustomError } from '../ui/features/error/CustomError';

function getPostcode(postcode: string) {
  const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_POSTCODE_BASE_URL as string;
  const url = baseUrl + `/${postcode}`;
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
