import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { filmRoute } from "./routes/FilmRouter.js";
import { actorRoute } from "./routes/ActorRouter.js";
import { userRouter } from "./routes/UserRouter.js";
import { authRoute } from "./routes/AuthRouter.js";
import { commentRoute } from "./routes/CommentRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/film", filmRoute);
app.use("/actor", actorRoute);
app.use("/user", userRouter);
app.use("/auth", authRoute);
app.use("/comment", commentRoute);

app.use("/static", express.static("public"));

mongoose
  .connect(process.env.DB_KEY)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Not Connected!"));
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
