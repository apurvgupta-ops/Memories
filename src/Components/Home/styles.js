import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  appbarSearch: {
    marginBottom: "1rem",
    padding: "16px",
    display: "flex",
    borderRadius: 4,
  },
  pagination: {
    marginTop: "1rem",
    borderRadius: 4,
    padding: " 16px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
}));
