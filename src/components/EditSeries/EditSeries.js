import React, { useState } from "react";

// import InputField from "../UI/Input/Input";
export default function EditSeries(props) {
  const [title, setTitle] = useState(props.seriesData.title);
  const [season, setSeason] = useState(props.seriesData.season);
  const [episode, setEpisode] = useState(props.seriesData.episode);
  const [extraInfo, setExtraInfo] = useState(props.seriesData.extraInfo);

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
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          id="season"
          name="season"
          value={season}
          onChange={(event) => {
            setSeason(event.target.value);
          }}
        />
        <input
          type="text"
          id="episode"
          name="episode"
          value={episode}
          onChange={(event) => {
            setEpisode(event.target.value);
          }}
        />
        <input
          type="text"
          id="extraInfo"
          name="extraInfo"
          value={extraInfo}
          onChange={(event) => {
            setExtraInfo(event.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}
