import React from "react";
import { Box, Modal, useMediaQuery } from "@mui/material";
import CancelIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "15px",
  padding: "2rem",
  overflow: "hidden",
  outline: "none",
};

const SimpleModal = (props) => {
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <Modal
      open={props.onOpen}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: matches ? "90%" : style.width,
          padding: matches ? "1rem" : style.padding,
        }}
      >
        <CancelIcon
          fontSize={matches ? "medium" : "large"}
          sx={{
            color: "gray",
            position: "absolute",
            right: matches ? "1rem" : "2rem",
            top: matches ? "1rem" : "2rem",
            cursor: "pointer",
            transition: "all 300ms",
            "&:hover": {
              color: "rgb(50, 50, 50)",
            },
          }}
          onClick={props.onClose}
        />
        {props.children}
      </Box>
    </Modal>
  );
};
export default SimpleModal;
