import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import MoreIcon from "@material-ui/icons/MoreVert";
import HdIcon from "@material-ui/icons/Hd";
import blue from "@material-ui/core/colors/blue";
import Grid from "@material-ui/core/Grid";
import { Container, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getMovieByKeyword } from "../../actions/libraryAction";
import { FlagIcon } from "react-flag-kit";
import { setLocale } from "../../i18n";
import i18n from "i18n-js";
import { logout } from "../../actions/userAction";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    display: "none",
    color: blue[500],
    [theme.breakpoints.up("sm")]: {
      display: "block",
      overflow: "visible"
    }
  },
  search: {
    position: "relative",
    color: "#6c757d",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(blue[500], 0.15),
    "&:hover": {
      backgroundColor: fade(blue[500], 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: blue[500]
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      color: blue[500]
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
      color: blue[500]
    }
  }
}));

function NavBar({ setDarkMode, Langage }) {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { library, user } = useSelector(state => state);
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = event => {
    setKeyword(event.target.value);
  };

  const keyPress = event => {
    if (event.keyCode === 13 && !library.loading && keyword.length > 0) {
      dispatch(getMovieByKeyword(keyword));
    }
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} style={{ color: blue[500] }}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ color: blue[500] }}>
        My account
      </MenuItem>
      <MenuItem onClick={handleLogout} style={{ color: blue[500] }}>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          aria-label="show 11 new notifications"
          style={{ color: blue[500] }}
          onClick={setDarkMode}
        >
          <Badge color="secondary">
            <Brightness2Icon />
          </Badge>
        </IconButton>
        <p>Dark Mode</p>
      </MenuItem>
      {
        user.isAuthenticated ? (
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              style={{ color: blue[500] }}
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        ) : (
          <Link to="/login">
            <MenuItem onClick={handleProfileMenuOpen}>
              <p style={{ verticalAlign: "middle", textAlign: 'center' }} >Login</p>
            </MenuItem>
          </Link>
        )
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: "transparent" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              HyperTube <HdIcon />
            </Typography>
            <Grid container justify={"center"}>
              {["/library", "/library/"].includes(window.location.pathname) && (
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    value={keyword}
                    onChange={handleSearch}
                    onKeyDown={keyPress}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              )}
            </Grid>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={setDarkMode}
              >
                <Badge color="secondary">
                  <Brightness2Icon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" onClick={Langage}>
                {localStorage.getItem("LANGUAGE") === "en" ? (
                  <FlagIcon code="FR" size={25} />
                ) : (
                  <FlagIcon code="US" size={25} />
                )}
              </IconButton>
              {
                user.isAuthenticated ? (
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                ) : (
                  <Link to="/login">
                    <IconButton
                      edge="end"
                      aria-label="Login"
                      color="inherit"
                      style={{ fontSize: "18px" }}
                    >
                      Login
                    </IconButton>
                  </Link>
                )
              }
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                style={{ color: blue[500] }}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
export default NavBar;
