import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { addCartItems, fetchUserProfile, logoutUser } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
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
import { setSnackBar } from "../../../store/ui/ui.action";
import { setSearchField } from "../../../store/ui/ui.action";
import "./mainNavigation.style.scss";

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
  display: "flex",
  alignItems: "center",
  padding: "0.3rem 0rem",
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
    width: "17rem",
    // [theme.breakpoints.up("sm")]: {
    //   width: "2rem",
    // },
  },
}));

const MainNavigation = () => {
  const matches = useMediaQuery("(max-width:900px)");
  const cartState = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const itemCount = useSelector(selectNewCartCount);
  const [userProfile, setUserProfile] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchUserProfile();
        setUserProfile(res?.userProfile);
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  useEffect(() => {
    let url = window.location.href;

    let urlArray = url.split("/");

    if (
      urlArray[urlArray.length - 1] === "home" ||
      (urlArray.length > 2 && urlArray[urlArray.length - 2] === "product")
    ) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  }, [window.location.href]);

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

  const handleProfilePage = (link) => {
    navigate(link);
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
    dispatch(setClearCart());
    dispatch(
      setSnackBar({
        status: true,
        severity: "success",
        message: "Logged out successfully",
      })
    );
    setUserProfile(null);
    window.history.replaceState({}, document.title, "/login");

    navigate("/login", { replace: true });
  };

  const closeCartHandler = () => dispatch(setIsCartOpen(false));

  const openCartHandler = () => dispatch(setIsCartOpen(true));

  const navigateHandler = () => {
    navigate("/signup");
  };

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
      <MenuItem onClick={handleProfilePage.bind(null, "/myProfile")}>
        My Profile
      </MenuItem>
      <MenuItem onClick={logoutHandler}>logout</MenuItem>
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
      {userProfile ? (
        <div>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            ></IconButton>
            <p onClick={handleProfilePage.bind(null, "/myProfile")}>
              My Profile
            </p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p onClick={logoutHandler}>logout</p>
          </MenuItem>
        </div>
      ) : (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          ></IconButton>
          <p onClick={navigateHandler}>Signup/Signin</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    // <div style={{ display: "flex" }}>
    <Box sx={{ flexGrow: 1, width: "100%", background: "pink" }}>
      <CartDropdown status={cartState} onClose={closeCartHandler} />

      <AppBar
        position="static"
        style={{
          backgroundColor: "black",
          position: "relative",
          zIndex: 2,
          paddingTop: !matches ? "1rem" : "0.5rem",
          paddingBottom: !matches ? "1rem" : "0.5rem",
          paddingLeft: "0rem",
          paddingRight: "0rem",
        }}
      >
        <Toolbar className="mainNavigationContainer">
          {matches && <Drawer />}
          <div className="leftContainer">
            <div className="searchContainer">
              {showSearchBar ? (
                <Search
                  onChange={(event) =>
                    dispatch(setSearchField(event.target.value))
                  }
                >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search Category or Product"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              ) : (
                <div style={{ width: "360px" }} />
              )}
            </div>
            <div className="leftPartContainer">
              {/* <div className="leftMiddlePartContainer"> */}
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
                  className="webLgogContainer"
                  variant="h2"
                  letterSpacing={!matches ? "5px" : "3px"}
                  // textTransform="uppercase"
                  fontFamily="'Times New Roman', Times, serif"
                  // fontWeight="bold"
                  sx={{ fontSize: !matches ? "auto" : "3rem" }}
                >
                  shop<span>Z</span>ee
                </Typography>
              </Box>

              <Tabs />
              {/* </div> */}
            </div>
          </div>
          <Box
            className="rightPartContainer"
            sx={{
              display: {
                md: "flex",
                gap: "3rem",
                overflow: "hidden",
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
                <ShoppingCart
                  fontSize="large"
                  margin-bottom="1rem"
                  sx={{ fontSize: !matches ? "auto" : "2rem" }}
                />
              </div>
            </IconButton>
            <IconButton
              className="profileIconContainer"
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={userProfile ? handleProfileMenuOpen : navigateHandler}
              color="inherit"
              sx={{
                xs: "none",
                md: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: "0.5rem",
              }}
            >
              <AccountCircle
                fontSize="large"
                sx={{ fontSize: !matches ? "auto" : "1.8rem" }}
              />
              <Typography
                align="right"
                sx={{
                  color: "white",
                  textTransform: "capitalize",
                  letterSpacing: !matches ? "1px" : "0.5px",
                  wordBreak: "break-all",
                  fontSize: !matches ? "auto" : "1rem",
                }}
              >
                {userProfile ? `Hello, ${userProfile.name}` : "Signup"}
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    // </div>
  );
};

export default MainNavigation;
