import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import style from "./SeriesList.module.css";

export default function SeriesList(props) {
  const list = props.series
    .sort((a, b) => {
      return a.title > b.title;
    })
    .map((se) => {
      return {
        id: se.id,
        title: se.title,
        season: se.season,
        episode: se.episode,
        extra: se.extraInfo,
      };
    });

  return (
    <div className={style.Table}>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 850 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Season</TableCell>
                <TableCell align="right">Episode</TableCell>
                <TableCell align="right">Extra info</TableCell>
                <TableCell align="right">Modify</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="right">{row.season}</TableCell>
                  <TableCell align="right">{row.episode}</TableCell>
                  <TableCell align="right">{row.extra}</TableCell>
                  <TableCell
                    align="right"
                    onClick={(e) => props.onModifySeries(e, row.id)}
                  >
                    <EditIcon color="primary" />
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={(e) => props.onDeleteSeries(e, row.id)}
                  >
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
