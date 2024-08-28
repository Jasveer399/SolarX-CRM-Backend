import "dotenv/config";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json())

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
)

app.use(express.static("public"))

app.use(cookieParser())

import routes from "./routes/index.js";
app.use(routes);

app.listen(process.env.PORT || 3000, () => console.log("Server is running on PORT", process.env.PORT || 3000));
