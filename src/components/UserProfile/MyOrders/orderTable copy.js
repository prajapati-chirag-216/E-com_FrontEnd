import * as React from "react";
import { useState, useEffect, memo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Container, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { styled } from "@mui/material/styles";
import StepLabel from "@mui/material/StepLabel";
import PropTypes from "prop-types";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import LoadingSpinner from "../../Dekstop/UI/LoadingSpinner";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PendingActionsIcon />,
    2: <DeliveryDiningIcon />,
    3: <DoorBackIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ["Pending", "Shipped", "Reaching Your Door"];
const columns = [
  { id: "product", label: "product", minWidth: 80 },
  {
    id: "Image",
    label: "Image",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Quantity",
    label: "Quntity",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "TransactionId",
    label: "TransactionId",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Your Name",
    label: "Your Name",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Phone",
    label: "Phone",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Shipping Address",
    label: "Shipping Address",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Ordered At",
    label: "Ordered At",
    minWidth: 80,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const OrderTable = ({ orderData }) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      orderData.length !== 0 ?orderData.map((order) => ({
        product: order.orderedItems?.productId.name,
        Image: (
          <img
            width="50px"
            height="50px"
            style={{ objectFit: "cover" }}
            src={order.productId.image[0]}
          />
        ),
        Quantity: order.quntity,
        TransactionId: orderData._id,
        "Your Name": orderData.shippingAddress.userName,
        Phone: orderData.contactInformation.phoneNumber,
        "Shipping Address": orderData.shippingAddress.address,
        "Ordered At": new Date(orderData.createdAt).toLocaleString(),
      })):[]
    );
  }, [orderData]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Text_Color = {
    DeliveryStatus: {
      Pending: "red",
      Shipped: "gray",
      "Out For Delivery": "green",
    },

    TransactionId: "blue",
  };

  const font_weight = {
    DeliveryStatus: "700",
  };

  if (!rows)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <LoadingSpinner />
      </Container>
    );
  return (
    <Box
      sx={{
        padding: "1rem",
        marginTop: "3rem",
        marginBottom: "5rem",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", rowGap: "3rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "2rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Typography
              align="center"
              sx={{
                fontSize: "1.8rem",
                letterSpacing: "2px",
                color: "black",
                fontWeight: "550",
                flexGrow: 1,
                marginLeft: "5rem",
              }}
            >
              Your Order status
            </Typography>
            <Typography
              sx={{
                marginLeft: "auto",
                width: "fit-content",
                letterSpacing: "2px",
              }}
            >
              {rows.length > 0 && rows[0]["Ordered At"].split(",")[0]}
            </Typography>
          </Box>
          <Stepper
            style={{ width: "80%" }}
            alternativeLabel
            activeStep={
              orderData.deliveryStatus === "Pending"
                ? 0
                : orderData.deliveryStatus === "Shipped"
                ? 1
                : 2
            }
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1%" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              style={{
                                color:
                                  column.id === "DeliveryStatus"
                                    ? Text_Color[column.id][value]
                                    : Text_Color[column.id],
                                fontWeight: font_weight[column.id],
                              }}
                              key={column.id}
                              align={column.align}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </Box>
  );
};

export default memo(OrderTable);
