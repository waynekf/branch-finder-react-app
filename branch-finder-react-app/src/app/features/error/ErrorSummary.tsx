"use client";

import { CustomError } from "../error/CustomError";

function ErrorSummary(props: { customError: CustomError }) {
  return (
    <>
    {props.customError.msg}
    </>
  );
}

export default ErrorSummary;
