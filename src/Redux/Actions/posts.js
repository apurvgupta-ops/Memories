import * as api from "../../api";
import {
  FETCH_ALL,
  CREATE,
  LIKE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
} from "../Constants/actionTypes";

//Action Creator;
export const getPosts = (page) => async (dispatch) => {
  try {
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);
    // console.log(data);
    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    // console.log(data);
    dispatch({ type: CREATE, payload: data });
    // history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const { data } = await api.likePost(id, user?.token);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
