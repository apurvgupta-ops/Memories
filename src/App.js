import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import { Container, Grow, Grid } from "@material-ui/core";
import { Routes, Route } from "react-router-dom";
import Auth from "./Components/Auth/Auth";

const App = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    </Container>
  );
};

export default App;
