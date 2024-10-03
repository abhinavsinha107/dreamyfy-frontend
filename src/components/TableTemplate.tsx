import { useState } from "react";
import { StyledTableCell, StyledTableRow } from "./styles";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
} from "@mui/material";
import { RootState, useAppSelector } from "../redux/store";
import { useApproveCourseMutation } from "../services/api";
import { notifySuccess } from "../toast";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const role = useAppSelector((state: RootState) => state.user.user?.role);

  const [approveCourse] = useApproveCourseMutation();

  const handleApproveCourse = async (_id: string) => {
    try {
      const res = await approveCourse(_id).unwrap();
      notifySuccess(res?.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => {
                if (column.id === "addClass" && role !== "TEACHER") return;
                return (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                );
              })}
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log(row, "row");
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {columns.map((column) => {
                      if (
                        column.id === "addClass" &&
                        role === "TEACHER" &&
                        row.isApproved === true
                      ) {
                        return (
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: "black",
                                "&:hover": {
                                  bgcolor: "#333",
                                },
                              }}
                              onClick={() =>
                                navigate("/Teacher/add-class", {
                                  state: { courseId: row.id },
                                })
                              }
                            >
                              <AddIcon />
                            </Button>
                          </StyledTableCell>
                        );
                      }
                      if (
                        column.id === "addClass" &&
                        role === "TEACHER" &&
                        row.isApproved === false
                      ) {
                        return <Box></Box>;
                      }
                      if (column.id === "addClass" && role !== "TEACHER") {
                        return;
                      }
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.id === "isApproved" ? (
                            <Select
                              value={value}
                              displayEmpty
                              size="small"
                              variant="standard"
                              disabled={role === "TEACHER"}
                              onChange={() => handleApproveCourse(row.id)}
                            >
                              <MenuItem key={1} value={"true"}>
                                True
                              </MenuItem>
                              <MenuItem key={2} value={"false"}>
                                False
                              </MenuItem>
                            </Select>
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </StyledTableCell>
                      );
                    })}
                    <StyledTableCell align="center">
                      <ButtonHaver row={row} />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 5));
          setPage(0);
        }}
      />
    </>
  );
};

export default TableTemplate;
