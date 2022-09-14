import express from "express";
import { signin, signup } from "../controllers/user.js";

const routes = express.Router();

routes.post("/signin", signin);
routes.post("/signup", signup);

export default routes;
