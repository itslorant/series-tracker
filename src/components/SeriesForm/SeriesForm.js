import React, { useState } from "react";

// import InputField from "../UI/Input/Input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SeriesForm(props) {
  // const [title, setTitle] = useState("");
  // const [season, setSeason] = useState("");
  // const [episode, setEpisode] = useState("");
  // const [extraInfo, setExtraInfo] = useState("");
  let titleProp = "";
  let seasonProp = "";
  let episodeProp = "";
  let extraInfoProp = "";
  if (props.seriesData !== undefined) {
    titleProp = props.seriesData.title;
    seasonProp = props.seriesData.season;
    episodeProp = props.seriesData.episode;
    extraInfoProp = props.seriesData.extraInfo;
  }
  const [title, setTitle] = useState(titleProp);
  const [season, setSeason] = useState(seasonProp);
  const [episode, setEpisode] = useState(episodeProp);
  const [extraInfo, setExtraInfo] = useState(extraInfoProp);

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
          label="Title"
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
          label="Season"
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
          label="Episode"
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
          label="Extra info"
          type="text"
          id="extraInfo"
          name="extraInfo"
          value={extraInfo}
          onChange={(event) => {
            setExtraInfo(event.target.value);
          }}
          size="small"
        />
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}
