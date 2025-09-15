"use client";

import { ChangeEvent, useEffect, useState } from "react";
import getPostcode from "@/app/api/mapping-api";
import { PostcodeResponse } from "@/app/types/PostcodeResponse";
import Postcode from "./Postcode";
import ErrorSummary from "../error/ErrorSummary";
import { CustomError } from "../error/CustomError";
import logger from '../../../logger';

function Search() {
  const [search, setSearch] = useState("SL59SJ");
  const [postcode, setPostcode] = useState({} as PostcodeResponse);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({} as CustomError);

  useEffect(() => {
    logger.info("calling postcode api...");
    getPostcode(search).then((data) => {
      return setPostcode(data);
    })
    .catch((error) => {
      if (error.status === 404) {
        setError(error);
        setPostcode({} as PostcodeResponse);
      }
    })
    .finally(()=>{
      setSubmitted(false);
    });
  }, [submitted]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (search === "") {
      setError({status: 404, msg: "Password is mandatory"} as CustomError);
    } else {
      setError({} as CustomError);
    }
    setSubmitted(true);
  };

  function handleClear(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(false);
    setSearch("");
    setError({} as CustomError);
    setPostcode({} as PostcodeResponse);
    logger.info("cleared form");
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSubmitted(false);
    setSearch(event.target.value);
  }
  
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    setSearch(search.toUpperCase());
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="postcode">Postcode:</label>
      <input id="postcode" name="postcode" value={search} type="text" onChange={handleChange} onKeyDown={handleKeyDown}></input>
      <button>submit</button>
      <button onClick={handleClear}>clear</button>
    </form>
    <ErrorSummary customError={error}/>
    <Postcode selected={postcode}/>
    </>
  );
}

export default Search;
