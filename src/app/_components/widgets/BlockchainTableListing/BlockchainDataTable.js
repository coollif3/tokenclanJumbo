import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { displayRedGreenColumn } from "@app/_utilities/helpers";
import styles from "./styles.module.css";

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
        <TableBody className={styles.tokenclan}>
          {rows.map((row) => (
            <TableRow
              key={row.blockchain_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.blockchain_id}
              </TableCell>
              <TableCell>
                <Link
                  href={`/blockchains/${row.slug}`}
                  underline="none"
                  sx={{ textDecoration: "none" }}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell align="right">{row.usd}</TableCell>
              <TableCell align="right">{row.dominance}</TableCell>
              {displayRedGreenColumn(row.one_day_chng)}
              {displayRedGreenColumn(row.seven_day_chng)}
              {displayRedGreenColumn(row.thirty_day_chng, true)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
