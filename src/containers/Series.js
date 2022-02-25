import React, { useEffect, useReducer, useState } from "react";

import axios from "axios";

import SeriesForm from "../components/SeriesForm/SeriesForm";
import EditSeries from "../components/EditSeries/EditSeries";
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
  const [seriesId, setSeriesId] = useState(null);

  useEffect(() => {
    axios({
      url: process.env.REACT_APP_BASE_URL + "/series.json",
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
            extraInfo: response.data[key].extraInfo,
          });
        }
        dispatch({ type: "SET", series: series });
      })
      .catch((error) => setError(error.message));
  }, [isLoading]);

  const onAddSeriesHandler = (series) => {
    axios({
      url: process.env.REACT_APP_BASE_URL + "/series.json",
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

  const onDeleteSeriesHandler = (event) => {
    const seriesId = event.target.parentNode.id;
    axios({
      url: process.env.REACT_APP_BASE_URL + `/series/${seriesId}.json`,
      method: "DELETE",
    })
      .then((response) => {
        dispatch({
          type: "DELETE",
          serie: { id: seriesId },
        });
        setIsLoading((prevLoading) => !prevLoading);
      })
      .catch((error) => setError(error.message));
  };

  const onModifySeriesHandler = (event) => {
    const seriesId = event.target.parentNode.id;
    setSeriesId(seriesId)
  };

  const modifySeries = (series)=>{
    axios({
      url: process.env.REACT_APP_BASE_URL + `/series/${seriesId}.json`,
      method: "PATCH",
      data: series,
    })
      .then((response) => {
        setIsLoading((prevLoading) => !prevLoading);
      })
      .catch((error) => setError(error.message));
      setSeriesId(null)
  }


  let seriesForm = <SeriesForm onSubmit={onAddSeriesHandler} />;
  if (seriesId) {
    seriesForm = <EditSeries onSubmit={modifySeries} seriesData={userSeries.filter((se) => se.id === seriesId)[0]} />;
  }
  
  
  return (
    <React.Fragment>
      {error}
      {console.log("rendered", seriesId)}
      {seriesForm}
      <SeriesList
        series={userSeries}
        onModifySeries={(event) => onModifySeriesHandler(event)}
        onDeleteSeries={(event) => onDeleteSeriesHandler(event)}
      />
    </React.Fragment>
  );
}
