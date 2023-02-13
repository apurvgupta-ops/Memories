import { makeStyles } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    padding: "inherit",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    cursor: "pointer",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    padding: "10px 15px",
    fontWeight: "bold",
    borderRadius: "10px",
    width: "100px",
    cursor: "default",
    "&:hover": {
      backgroundColor: "#EFEDED",
    },
  },

  menu: {
    // border: "2px solid red",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    width: "130px",
    justifyContent: "center",
    alignItems: "center",
    right: "-48px",
    top: "50px",
    backgroundColor: "#F2F6FA",
    borderRadius: "10px",
    paddingBottom: "10px",
    zIndex: 1,
  },

  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
