import React, { useState, useEffect } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import useStyle from "./styles";
import FileBase from "react-file-base64";
import { createPost } from "../../Redux/Actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../Redux/Actions/posts";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

const Form = ({ currentId, setCurrentId }) => {
  const history = useHistory();

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  // console.log("11", post);

  const user = JSON.parse(localStorage.getItem("profile"));

  // console.log(user);
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    tags: [],
    message: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const classes = useStyle();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      if (
        postData.title === "" ||
        postData.tags === "" ||
        postData.message === "" ||
        postData.selectedFile === ""
      ) {
        return null;
      } else {
        dispatch(
          createPost({ ...postData, name: user?.result?.name }, history)
        );
        clear();
      }
    }
    console.log("Post request done");
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      // creator: "",
      title: "",
      tags: [],
      message: "",
      selectedFile: "",
    });
  };
  // console.log(user?.result?.name);
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h4">
          Please Sign in to create post and like the posts.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        {/* <TextField
          name="creator"
          varient="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
        <TextField
          name="title"
          varient="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          varient="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div style={{ padding: "5px 0", width: "96%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        {/* <TextField
          name=""
          type="file"
          varient="outlined"
          label="Creator"
          fullWidth
          value={postData.selectedFile}
          onChange={(e) =>
            setPostData({ ...postData, selectedFile: e.target.value })
          }
        /> */}
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {" "}
          Submit
        </Button>
      </form>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        type="submit"
        fullWidth
        onClick={clear}
      >
        {" "}
        Clear
      </Button>
    </Paper>
  );
};

export default Form;
