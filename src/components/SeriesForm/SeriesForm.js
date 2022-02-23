import React, { useState } from "react";

// import InputField from "../UI/Input/Input";
export default function SeriesForm(props) {
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddSeries({title: title, season: season, episode: episode});
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
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}
