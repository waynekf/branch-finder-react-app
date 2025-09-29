'use client';

import { CustomError } from '../error/CustomError';

function ErrorSummary(props: { customError: CustomError }) {
  if (Object.getOwnPropertyNames(props.customError).length > 0) {
    return (
      <div>
        <ul>
          <li>{props.customError.msg}</li>
        </ul>
      </div>
    );
  }

  return <></>;
}

export default ErrorSummary;
