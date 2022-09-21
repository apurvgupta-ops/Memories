import React, { useState } from "react";
import {
  Container,
  Paper,
  Button,
  Typography,
  Avatar,
  Grid,
  TextField,
} from "@material-ui/core";
import useStyle from "./styles";
import { LockOutlined } from "@material-ui/icons";
import Input from "./Input";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { AUTH } from "../../Redux/Constants/actionTypes";
import { useHistory } from "react-router-dom";
import { SignIn, SignUp } from "../../Redux/Actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  //   const isSignedUp = false;

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignedUp((prevIsSignedup) => !prevIsSignedup);
    // handleShowPassword(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignedUp) {
      dispatch(SignUp(formData, history));
    } else {
      dispatch(SignIn(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const googleSuccess = (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, payload: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
    // console.log(res);
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("google login failure");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignedUp ? "SignUp" : "SignIn"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              autoFocus
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignedUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignedUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="534339965712-hhieu8gb08kbqtoqlkiesq9cbufj1jdv.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                variant="contained"
                color="primary"
                className={classes.googleButton}
                fullWidth
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignedUp
                  ? "You already have account! SignIn"
                  : "You don't have account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
