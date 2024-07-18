import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DataTable({ rows }) {
  function displayRedGreenColumn(item, last = false) {
    const num = (+item).toFixed(2);
    if (last) {
      if (num > 0) {
        return (
          <TableCell
            align="right"
            sx={{ color: "green", pr: 4 }}
          >{`${num}%`}</TableCell>
        );
      } else {
        return (
          <TableCell
            align="right"
            sx={{ color: "red", pr: 4 }}
          >{`${num}%`}</TableCell>
        );
      }
    }
    if (num > 0) {
      return (
        <TableCell align="right" sx={{ color: "green" }}>{`${num}%`}</TableCell>
      );
    } else {
      return (
        <TableCell align="right" sx={{ color: "red" }}>{`${num}%`}</TableCell>
      );
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Blockchain ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">TVL (USD)</TableCell>
            <TableCell align="right">Dominance %</TableCell>
            <TableCell align="right">24h</TableCell>
            <TableCell align="right">7d</TableCell>
            <TableCell align="right" sx={{ pr: 4 }}>
              30d
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.blockchain_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.blockchain_id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.usd}</TableCell>
              <TableCell align="right">{row.dominance}</TableCell>
              {displayRedGreenColumn(row["1day_usd_chng"])}
              {displayRedGreenColumn(row["7day_usd_chng"])}
              {displayRedGreenColumn(row["30day_usd_chng"], true)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
