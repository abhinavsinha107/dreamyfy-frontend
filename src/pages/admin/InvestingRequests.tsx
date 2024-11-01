import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Container } from "@mui/material";
import { useGetInvestmentRequestsQuery } from "../../services/api";
import { StyledTableCell, StyledTableRow } from "../../components/styles";

interface InvestmentRequest {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  note: string;
  status: string; // Add other relevant fields as needed
}

const InvestmentRequests: React.FC = () => {
  const { data: investmentRequests, error, isLoading } = useGetInvestmentRequestsQuery();

  if (isLoading) return <Typography>Loading investment requests...</Typography>;
  if (error) return <Typography>Error fetching investment requests.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
      <TableContainer sx={{ borderRadius: 2 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell style={{ backgroundColor: '#161e2f', color: '#fff' }}><strong>Name</strong></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#161e2f', color: '#fff' }}><strong>Email</strong></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#161e2f', color: '#fff' }}><strong>Phone Number</strong></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#161e2f', color: '#fff' }}><strong>Note</strong></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {investmentRequests.map((request: InvestmentRequest) => (
              <StyledTableRow key={request._id}>
                <StyledTableCell>{request.name}</StyledTableCell>
                <StyledTableCell>{request.email}</StyledTableCell>
                <StyledTableCell>{request.phoneNumber}</StyledTableCell>
                <StyledTableCell>{request.note}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default InvestmentRequests;
