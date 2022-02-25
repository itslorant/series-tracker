import React, { useState } from "react";

// import InputField from "../UI/Input/Input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
export default function SeriesForm(props) {
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit({
      title: title,
      season: season,
      episode: episode,
      extraInfo: extraInfo,
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <TextField
          label="text"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          size="small"
        />
        <TextField
          label="season"
          type="text"
          id="season"
          name="season"
          value={season}
          onChange={(event) => {
            setSeason(event.target.value);
          }}
          size="small"
        />
        <TextField
          label="episode"
          type="text"
          id="episode"
          name="episode"
          value={episode}
          onChange={(event) => {
            setEpisode(event.target.value);
          }}
          size="small"
        />
        <TextField
          label="extraInfo"
          type="text"
          id="extraInfo"
          name="extraInfo"
          value={extraInfo}
          onChange={(event) => {
            setExtraInfo(event.target.value);
          }}
          size="small"
        />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </React.Fragment>
  );
}
