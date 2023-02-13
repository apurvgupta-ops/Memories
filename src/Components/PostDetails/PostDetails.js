import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  CircularProgress,
  CardMedia,
} from "@material-ui/core";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { getPost, getPostsBySearch } from "../../Redux/Actions/posts";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  // console.log(post);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  // useEffect(() => {
  //   if (post) {
  //     dispatch(
  //       getPostsBySearch({ searchTerm: "none", tags: post?.tags.join(",") })
  //     );
  //   }
  // }, [post]);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (!post) return null;
  if (isLoading) {
    return (
      <Paper className={classes.loadingPaper}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            color="textSecondary"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1" component="h2">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>RealTime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>

      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like these posts:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts?.map(
              ({ title, message, likes, name, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
