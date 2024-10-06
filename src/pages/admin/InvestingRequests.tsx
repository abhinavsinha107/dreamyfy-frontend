import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import { useGetInvestmentRequestsQuery } from "../../services/api";

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Phone Number</strong></TableCell>
            <TableCell><strong>Note</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {investmentRequests.map((request: InvestmentRequest) => (
            <TableRow key={request._id}>
              <TableCell>{request.name}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.phoneNumber}</TableCell>
              <TableCell>{request.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvestmentRequests;
