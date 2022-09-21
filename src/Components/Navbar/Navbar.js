import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyle from "./styles.js";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../Redux/Constants/actionTypes.js";
import decode from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyle();
  // console.log(user);

  const Logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
  };

  // CHECKING IF THE USER TOKEN IS EXPIRED OR NOT
  useEffect(() => {
    const token = user?.token;
    // console.log(token);
    if (token) {
      const decodeToken = decode(token);
      // console.log(decodeToken.exp * 1000);
      // console.log(new Date().getTime());
      if (decodeToken.exp * 1000 < new Date().getTime()) Logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // console.log(location);
  }, []);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          component={Link}
          to="/"
          src={memoriesText}
          alt="icon"
          height="35px"
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="memories"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result?.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              className={classes.userName}
              variant="contained"
              color="secondary"
            >
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={Logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
