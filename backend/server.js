import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

/* connection to database */
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    mongoose.set("useFindAndModify", false);

    console.log("Database connections established successfully");

    app.listen(port, () => {
      console.log("Cooking backend on PORT:", port);
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error.message);
  });
