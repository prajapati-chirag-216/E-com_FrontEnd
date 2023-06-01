import React from "react";
import { Box, Divider, Typography } from "@mui/material";
const ShippingModal = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "0 0.5rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{ letterSpacing: "1px", color: "rgb(50, 50, 50)" }}
      >
        Shipping policy
      </Typography>
      <Divider
        sx={{
          borderColor: "rgb(200, 200, 200)",
          width: "80rem",
          transform: "translateX(-5rem)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          paddingBottom: "2rem",
        }}
      >
        <Typography variant="h6" letterSpacing="1px">
          Delivery Time
        </Typography>
        <Typography variant="h6" letterSpacing="1px">
          - 3 to 5 days in Metro Cities with Airport.
        </Typography>
        <Typography variant="h6" letterSpacing="1px">
          - 5 to 7 Days In 2nd Tier Cities With Airport.
        </Typography>
        <Typography variant="h6" letterSpacing="1px">
          - 10 to 15 days In Rural Area
        </Typography>
      </Box>
    </Box>
  );
};

export default ShippingModal;
