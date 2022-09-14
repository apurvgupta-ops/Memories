import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import PostRoutes from "./routes/posts.js";
import UserRoutes from "./routes/user.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", PostRoutes);
app.use("/users", UserRoutes);

const connection_url =
  "mongodb+srv://apurvgupta:12appugupta$@cluster0.b7zokfb.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

mongoose
  .connect(connection_url, { useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`connection successfull at port ${port}`)
    )
  )
  .catch((error) => console.log(error.message));
