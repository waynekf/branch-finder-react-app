'use client';

import { CustomError } from "branch-finder-schemas";

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
