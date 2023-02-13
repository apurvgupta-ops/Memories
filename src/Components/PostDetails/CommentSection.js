import { Typography, TextField, Button } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import useStyle from "./styles";
import { commentPost } from "../../Redux/Actions/posts";

const CommentSection = ({ post }) => {
  //   console.log(post?.comments);
  const classes = useStyle();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const commentRef = useRef();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleComment = async () => {
    const commentDetails = `${user?.result?.name} : ${comment}`;
    const newComment = await dispatch(commentPost(commentDetails, post._id));
    setComments(newComment);
    setComment("");

    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((com, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{com.split(": ")[0]}:</strong>
              {com.split(":")[1]}
              {/* com {index} */}
            </Typography>
          ))}
          <div ref={commentRef}></div>
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
