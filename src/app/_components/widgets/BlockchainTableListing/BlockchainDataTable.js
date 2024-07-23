import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { displayRedGreenColumn } from "@app/_utilities/helpers";

export default function BlockchainDataTable({ rows }) {
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
              <TableCell>
                <Link href={`/blockchains/${row.slug}`}>{row.name}</Link>
              </TableCell>
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
