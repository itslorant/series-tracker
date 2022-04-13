import React, { useEffect, useState, useRef } from "react";

import useHttp from "../../hooks/http";
import TextField from "@mui/material/TextField";

const SearchField = (props) => {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef();
  const { sendRequest, isLoading, data } = useHttp();
  const { loadSeries, filterableTitle } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInput === inputRef.current.value) {
        if (userInput === "") {
          const userId = localStorage.getItem("userId");
          sendRequest("/series.json", `orderBy="userId"&equalTo="${userId}"`, "GET");
        } else {
          filterableTitle(userInput);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [sendRequest, inputRef, userInput, filterableTitle]);

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
  }, [data, loadSeries]);

  return (
    <React.Fragment>
      {isLoading && <p>Searching...</p>}
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
    </React.Fragment>
  );
};

export default SearchField;
