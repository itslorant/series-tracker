import React, { useEffect, useReducer, useState } from "react";

import axios from "axios";

import SeriesForm from "../components/SeriesForm/SeriesForm";
import SeriesList from "../components/SeriesList/SeriesList";

const seriesReducer = (currentSeries, action) => {
  switch (action.type) {
    case "SET":
      return action.series;
    case "ADD":
      return [...currentSeries, action.serie];
    case "DELETE":
      return currentSeries.filter((se) => se.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

export default function Series() {
  const [userSeries, dispatch] = useReducer(seriesReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    axios({
      url: process.env.REACT_APP_BASE_URL+"/series.json",
      method: "GET",
    })
      .then((response) => {
        const series = [];
        for (const key in response.data) {
          series.push({
            id: key,
            title: response.data[key].title,
            season: response.data[key].season,
            episode: response.data[key].episode,
          });
        }
        dispatch({ type: "SET", series: series });
      })
      .catch((error) => setError(error.message));
  }, [isLoading]);

  const addSeriesHandler = (series) => {
    axios({
      url: process.env.REACT_APP_BASE_URL+"/series.json",
      method: "POST",
      data: series,
    })
      .then((response) => {
        dispatch({
          type: "ADD",
          serie: { id: response.data.name, ...response.data },
        });
        setIsLoading((prevLoading) => !prevLoading);
      })
      .catch((error) => setError(error.message));
  };
  return (
    <React.Fragment>
      {error}
      {console.log("rendered")}
      <SeriesForm onAddSeries={addSeriesHandler} />
      <SeriesList series={userSeries} />
    </React.Fragment>
  );
}
