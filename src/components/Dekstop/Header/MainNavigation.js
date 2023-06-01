import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { addCartItems, fetchUserProfile, logoutUser } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../mystore/ui-slice";
import { authActions } from "../../../mystore/auth-slice";
import { ShoppingCart } from "@mui/icons-material";
import Drawer from "../Category/Drawer/Drawer";
import Tabs from "./Tabs";
import CartDropdown from "../../Cart/CartSlider/CartSlider";
import {
  selectIsCartOpen,
  selectNewCartCount,
} from "../../../store/cart/cart.selector";
import { setIsCartOpen, setClearCart } from "../../../store/cart/cart.action";
import { selectCartItems } from "../../../store/cart/cart.selector";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../../store/ui/ui.selector";
import { setLogoutUser } from "../../../store/ui/ui.action";
import { setSearchField } from "../../../store/ui/ui.action";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MainNavigation = () => {
  const matches = useMediaQuery("(max-width:900px)");
  const cartState = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const itemCount = useSelector(selectNewCartCount);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchUserProfile();
        setUserProfile(res.userProfile);
      } catch (err) {
        throw err;
      }
    })();
  }, []);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const logoutHandler = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    try {
      await addCartItems(cartItems);
      await logoutUser();
    } catch (err) {
      throw err;
    }
    dispatch(setLogoutUser());
    dispatch(setClearCart());
    navigate("/login");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const closeCartHandler = () => dispatch(setIsCartOpen(false));

  const openCartHandler = () => dispatch(setIsCartOpen(true));

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      {isLoggedIn && <MenuItem onClick={logoutHandler}>logout</MenuItem>}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CartDropdown status={cartState} onClose={closeCartHandler} />

      <AppBar
        position="static"
        style={{
          backgroundColor: "black",
          position: "relative",
          zIndex: 2,
          padding: "1rem",
        }}
      >
        <Toolbar>
          {matches && <Drawer />}
          <Search
            onChange={(event) => dispatch(setSearchField(event.target.value))}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Typography
              variant="h3"
              letterSpacing="3px"
              textTransform="uppercase"
              fontFamily="'Times New Roman', Times, serif"
              fontWeight="bold"
            >
              One Center
            </Typography>
            <Tabs />
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                gap: "2rem",
              },
            }}
          >
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={openCartHandler}
              color="inherit"
            >
              <div>
                <h6 style={{ margin: "0px", height: "22px", color: "#cf8282" }}>
                  {" "}
                  {itemCount}
                </h6>
                <ShoppingCart fontSize="large" margin-bottom="1rem" />
              </div>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: "0.5rem",
              }}
            >
              <AccountCircle fontSize="large" />
              <Typography
                align="right"
                sx={{
                  color: "white",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                }}
              >
                {userProfile ? `Hello ${userProfile.name}` : "Signup"}
              </Typography>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default MainNavigation;
