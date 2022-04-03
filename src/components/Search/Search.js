import React, { useEffect, useState, useRef } from "react";

import useHttp from "../../hooks/http";
import TextField from "@mui/material/TextField";

const SearchField = (props) => {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef();
  const { sendRequest, clear, isLoading, data, error } = useHttp();
  const { loadSeries } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      const userId = localStorage.getItem("userId");
      const url = '/series.json';
      if (userInput === inputRef.current.value) {
        const queryParams =
          userInput.length === 0
            ? `orderBy="userId"&equalTo="${userId}"`
            : `orderBy="title"&equalTo="${userInput}"`;
        sendRequest(url, queryParams, "GET");
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [sendRequest, inputRef, userInput]);

  useEffect(() => {
    const series = [];
    for (const key in data) {
      series.push({
        id: key,
        title: data[key].title,
        season: data[key].season,
        episode: data[key].episode,
        extraInfo: data[key].extraInfo,
      });
    }
    loadSeries(series);
  }, [data, loadSeries, ]);

  return (
    <TextField
      label="Search"
      type="text"
      id="search"
      name="search"
      inputRef={inputRef}
      size="small"
      sx={{ background: "white", borderRadius: "4px", margin: "0 0 10px 0" }}
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
    />
  );
};

export default SearchField;
