import React, { useEffect, useState, useRef } from "react";
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
  const classes = useStyle();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isMenu, setIsMenu] = useState(false);
  const windowRef = useRef();
  // console.log(user);
  const Logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
    setIsMenu(false);
  };

  // CHECKING IF THE USER TOKEN IS EXPIRED OR NOT
  useEffect(() => {
    const token = user?.token;
    // console.log(token);
    if (token) {
      const decodeToken = decode(token);
      // setIsMenu(!isMenu);
      // console.log(decodeToken.exp * 1000);
      // console.log(new Date().getTime());
      if (decodeToken.exp * 1000 < new Date().getTime()) Logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // console.log(location);
    // handleClickOutside();
  }, [location]);
  const showMenu = () => {
    console.log("clicked", isMenu);
    setIsMenu(!isMenu);
  };

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
          <div
            className={classes.profile}
            // onMouseEnter={() => setIsMenu(true)}
            // onMouseLeave={() => setIsMenu(false)}
            onClick={showMenu}
          >
            <Avatar
              className={classes.purple}
              alt={user.result?.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>

            {isMenu && (
              // <p style={{ fontSize: "30px" }}>jii</p>
              <div className={classes.menu}>
                <Typography
                  className={classes.userName}
                  variant="contained"
                  // color="secondary"
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
            )}
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
