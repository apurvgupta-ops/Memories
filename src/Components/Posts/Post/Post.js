import React, { useState } from "react";
import {
  Card,
  Typography,
  CardMedia,
  Button,
  CardActions,
  CardContent,
  ButtonBase,
} from "@material-ui/core";
import {
  Delete,
  MoreHoriz,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyle from "./styles";
import { deletePost, likePost } from "../../../Redux/Actions/posts";
import { useHistory, useParams } from "react-router-dom";
const Post = ({ post, currentId, setCurrentId }) => {
  // console.log(post?.name);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyle();
  const [likes, setLikes] = useState(post?.likes);
  const user = JSON.parse(localStorage.getItem("profile"));

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const openPost = (e) => history.push(`/posts/${post._id}`);

  const handleLikes = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post?.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post?.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <Card onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <MoreHoriz fontSize="medium" />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent>
          <Typography className={classes.title} variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="h6" style={{ fontSize: "15px" }}>
            {post.message}
          </Typography>
        </CardContent>
      </Card>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLikes}
        >
          {/* <ThumbUpAlt fontSize="small" /> */}
          {/* {post.likes.length} */}
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <Delete fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
