import React from "react";

export default function SeriesList(props) {
  const list = props.series.map((se) => {
    return (
      <tr key={se.id} id={se.id}>
        <td>{se.title}</td>
        <td>{se.season}</td>
        <td>{se.episode}</td>
        <td>{se.extraInfo}</td>
        <td onClick={props.onModifySeries}>Modify</td>
        <td onClick={props.onDeleteSeries}>Delete</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Season</th>
          <th>Episode</th>
          <th>Extra info</th>
        </tr>
      </thead>
      <tbody>{list}</tbody>
    </table>
  );
}
