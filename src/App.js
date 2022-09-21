import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import { Container, Grow, Grid } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import PostDetails from "./Components/PostDetails/PostDetails";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/posts" />} />
        <Route exact path="/posts" component={Home} />
        <Route exact path="/posts/search" component={Home} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <Route
          exact
          path="/auth"
          component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
        />
      </Switch>
    </Container>
  );
};

export default App;
