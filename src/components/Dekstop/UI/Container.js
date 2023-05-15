import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const SimpleContainer = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ marginTop: "20px", width: "100%" }}>
        <Box
          sx={{
            boxShadow: "2px 2px 6px gray",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1.2rem",
            paddingBottom: "2rem",
          }}
        >
          {props.children}
        </Box>
      </div>
    </React.Fragment>
  );
};
export default SimpleContainer;
