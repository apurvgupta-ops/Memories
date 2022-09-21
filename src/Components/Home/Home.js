import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../Redux/Actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyle from "./styles";
import Paginate from "../Pagination/Pagination";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [currentId, setCurrentId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    console.log("adjh");

    if (searchTerm.trim() || tags) {
      dispatch(getPostsBySearch({ searchTerm, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${searchTerm || "none"}&tags=${tags.join(
          ","
        )}`
      );
    } else {
      history.push("/");
    }
  };
  const handleKeyPress = (e) => {
    // console.log(e.key);
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  // useEffect(() => {
  //   dispatch(getPosts(page));
  // }, [currentId, dispatch, page]);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={4}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appbarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={searchTerm}
                onKeyPress={handleKeyPress}
                // onKeyUp={handleKeyPress}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                // className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
