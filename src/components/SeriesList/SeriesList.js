import React from "react";

export default function SeriesList(props) {
  const list = props.series.map((se) => {
    return (
      <tr key={se.id}>
        <td>{se.title}</td>
        <td>{se.season}</td>
        <td>{se.episode}</td>
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
        </tr>
      </thead>
      <tbody>{list}</tbody>
    </table>
  );
}
