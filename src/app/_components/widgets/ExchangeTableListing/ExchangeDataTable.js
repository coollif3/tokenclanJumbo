import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { displayRedGreenColumn } from "@app/_utilities/helpers/";
import styles from "./styles.module.css";

const colorPalette = {
  red: "#E73145",
  green: "#5DCBA6",
};

export default function ExchangeDataTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Exchange</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Volume 24hr (BTC)</TableCell>
            <TableCell align="right">24h</TableCell>
            <TableCell align="right">7d</TableCell>
            <TableCell align="right">30d</TableCell>
            <TableCell align="right" sx={{ pr: 4 }}>
              Coin
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.tokenclan}>
          {rows.map((row, index) => (
            <TableRow
              key={row.exchange_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>
                <Link href={`/exchanges/${row.slug}`}>{row.exchange}</Link>
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.vol_24hr}</TableCell>
              {displayRedGreenColumn(row.one_day_chng, colorPalette)}
              {displayRedGreenColumn(row.seven_day_chng, colorPalette)}
              {displayRedGreenColumn(row.thirty_day_chng, colorPalette)}
              <TableCell align="right" sx={{ pr: 4 }}>
                <Link href={`/coins/${row.coin_slug}?route=exchange`}>
                  {row.coin}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
