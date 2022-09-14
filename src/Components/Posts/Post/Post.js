import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  Button,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { Delete, MoreHoriz, ThumbUpAlt } from "@material-ui/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyle from "./styles";
import { deletePost, likePost } from "../../../Redux/Actions/posts";
const Post = ({ post, currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHoriz fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAlt fontSize="small" />
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        >
          <Delete fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
