import * as React from "react";
import { Box, Modal, useMediaQuery } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  padding: "2rem",
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
          style={{
            position: "absolute",
            right: matches ? "1rem" : "2rem",
            top: matches ? "1rem" : "2rem",
            cursor: "pointer",
          }}
          onClick={props.onClose}
        />
        {props.children}
      </Box>
    </Modal>
  );
};
export default SimpleModal;
