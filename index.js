
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.options("*", cors());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // ✅ Allow frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allow these HTTP methods
    credentials: true, // ✅ Allow cookies & authorization headers
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow these headers
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

import routes from "./src/routes/route.js";
app.use(routes);

// Start HTTP server (No SSL here, handled by Nginx)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on HTTP PORT ${PORT}`);
});

