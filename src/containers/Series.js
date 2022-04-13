import React, { useCallback, useEffect, useReducer, useState } from "react";

import useHttp from "../hooks/http";

import SeriesForm from "../components/SeriesForm/SeriesForm";
import SeriesList from "../components/SeriesList/SeriesList";
import SearchField from "../components/Search/Search";
import Modal from "../components/UI/Modal/Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Spinner from "../components/UI/Spinner/Spinner";

import style from "./Series.module.css";

const seriesReducer = (currentSeries, action) => {
  switch (action.type) {
    case "SET":
      return action.series;
    case "ADD":
      return [...currentSeries, action.serie];
    case "MODIFY":
      const newState = currentSeries.map((cs) => {
        if (cs.id === action.serie.id) return action.serie;
        return { ...cs };
      });
      return newState;
    case "FILTER":
      return currentSeries.filter((se) =>
        se.title.toLowerCase().includes(action.title.toLowerCase().trim())
      );
    case "DELETE":
      return currentSeries.filter((se) => se.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

export default function Series() {
  const [userSeries, dispatch] = useReducer(seriesReducer, []);
  const [seriesId, setSeriesId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { sendRequest, clear, isLoading, data, error, reqBody, reqMethod } =
    useHttp();

  useEffect(() => {
    if (!isLoading && data && !error) {
      switch (reqMethod) {
        case "POST":
          dispatch({
            type: "ADD",
            serie: { id: data.name, ...reqBody },
          });
          clear();
          break;
        case "PATCH":
          dispatch({
            type: "MODIFY",
            serie: { id: seriesId, ...data },
          });
          clear();
          onCloseModal();
          break;
        default:
          throw new Error("This method is not available!");
      }
    }
    if (!isLoading && !data && !error && reqMethod === "DELETE") {
      dispatch({
        type: "DELETE",
        id: reqBody.seriesId,
      });
      clear();
    }
  }, [data, isLoading, error, reqMethod, reqBody, seriesId, clear]);

  const onAddSeriesHandler = (series) => {
    sendRequest("/series.json", "", "POST", series);
    onCloseModal();
  };

  const onDeleteSeriesHandler = (event, seriesId) => {
    sendRequest(`/series/${seriesId}.json`, "", "DELETE", { seriesId });
  };

  const onModifySeriesHandler = (event, seriesId) => {
    setSeriesId(seriesId);
    setShowModal(true);
  };

  const modifySeries = (series) => {
    sendRequest(`/series/${seriesId}.json`, "", "PATCH", series);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setSeriesId(null);
  };

  const getSeries = useCallback((searchedSeries) => {
    dispatch({ type: "SET", series: searchedSeries });
  }, []);

  const filteredTitle = useCallback((title) => {
    dispatch({ type: "FILTER", title: title });
  }, []);

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

  let seriesList = [];
  if (userSeries) {
    seriesList = (
      <SeriesList
        series={userSeries}
        onModifySeries={(event, seriesId) =>
          onModifySeriesHandler(event, seriesId)
        }
        onDeleteSeries={(event, seriesId) =>
          onDeleteSeriesHandler(event, seriesId)
        }
      />
    );
  }

  let search = (
    <SearchField loadSeries={getSeries} filterableTitle={filteredTitle} />
  );
  return (
    <React.Fragment>
      <h1>Series</h1>
      {error}
      {isLoading && <Spinner />}
      {showModal && modal}
      {search}
      {!isLoading && seriesList}
      <div className={style.AddButton}>{!showModal && addButton}</div>
    </React.Fragment>
  );
}
