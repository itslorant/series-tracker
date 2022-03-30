import React, { useEffect, useReducer, useState } from "react";

import axios from "axios";

import SeriesForm from "../components/SeriesForm/SeriesForm";
import SeriesList from "../components/SeriesList/SeriesList";
import Modal from "../components/UI/Modal/Modal";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import style from "./Series.module.css";

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    axios({
      url: process.env.REACT_APP_BASE_URL + "/series.json" + queryParams,
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
    onCloseModal();
  };

  const onDeleteSeriesHandler = (event, seriesId) => {
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

  const onModifySeriesHandler = (event, seriesId) => {
    setSeriesId(seriesId);
    setShowModal(true);
  };

  const modifySeries = (series) => {
    axios({
      url: process.env.REACT_APP_BASE_URL + `/series/${seriesId}.json`,
      method: "PATCH",
      data: series,
    })
      .then((response) => {
        setIsLoading((prevLoading) => !prevLoading);
      })
      .catch((error) => setError(error.message));
    setSeriesId(null);
    onCloseModal();
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setSeriesId(null)
  };

  let modalTitle = "Add Series";
  let seriesForm = <SeriesForm onSubmit={onAddSeriesHandler} />;
  if (seriesId) {
    modalTitle = "Edit Series";
    seriesForm = (
      <SeriesForm
        onSubmit={modifySeries}
        seriesData={userSeries.filter((se) => se.id === seriesId)[0]}
      />
    );
  }

  let modal = (
    <Modal title={modalTitle} onClose={onCloseModal}>
      {seriesForm}
    </Modal>
  );

  let addButton = (
    <Fab color="primary" aria-label="add" onClick={() => onShowModal()}>
      <AddIcon />
    </Fab>
  );

  return (
    <React.Fragment>
      <h1>Series</h1>
      {error}
      {showModal && modal}
      <SeriesList 
        series={userSeries}
        onModifySeries={(event, seriesId) =>
          onModifySeriesHandler(event, seriesId)
        }
        onDeleteSeries={(event, seriesId) => onDeleteSeriesHandler(event, seriesId)}
      />
      <div className={style.AddButton}>{!showModal && addButton}</div>
    </React.Fragment>
  );
}
