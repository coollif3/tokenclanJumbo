import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { displayRedGreenColumn, filterCoinList } from "@app/_utilities/helpers";
import styles from "./styles.module.css";
import { numberSeperatorFormat } from "@app/_utilities/helpers";

const colorPalette = {
  red: "#FF5E5B",
  green: "#5DCBA6",
};

const CoinDataTable = (props) => {
  const rows = props.rows || [];
  // console.log("rows: ", rows);

  const filteredData = filterCoinList(rows);
  // console.log("filteredData: ", filteredData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price (USD)</TableCell>
            <TableCell align="right">Price Change % 24h</TableCell>
            <TableCell align="right">Vol 24h</TableCell>
            <TableCell align="right" sx={{ pr: 4 }}>
              Market Cap
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.tokenclan}>
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <TableRow
                key={row.coin_relations_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/coins/${row.coin_slug}`}
                    underline="none"
                    sx={{ textDecoration: "none" }}
                  >
                    {row.coin_name}
                  </Link>
                </TableCell>
                <TableCell align="right">{numberSeperatorFormat(row.price)}</TableCell>
                {displayRedGreenColumn(numberSeperatorFormat(row.price_chg_percent_24h), colorPalette)}
                <TableCell align="right">{numberSeperatorFormat(row.total_vol)}</TableCell>
                <TableCell align="right">{numberSeperatorFormat(row.market_cap)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoinDataTable;