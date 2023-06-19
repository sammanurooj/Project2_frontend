import React from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Index } from "../../container/Table/userLocation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
});

const TableComponent = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px", // Adjust the marginTop value to reduce space
            
          }}
        >
          <Card sx={{ width: "70%" }}>
            <CardContent sx={{ paddingTop: "30px", marginRight: "0px" }}>
              <TableContainer>
                <Table>
                  <TableHead
                    sx={{ backgroundColor: theme.palette.primary.main }}
                  >
                    <TableRow>
                      <TableCell align="left" sx={{ color: "#fff" }}>
                        ID
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#fff" }}>
                        City
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#fff" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Index />
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default TableComponent;
