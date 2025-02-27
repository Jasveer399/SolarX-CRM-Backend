import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// ✅ Allow CORS Only in Express
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN || "https://solar-x-crm-front-end.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle Preflight Requests Properly
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(204).end();
});

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import routes from "./src/routes/route.js";
app.use(routes);

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running on PORT", process.env.PORT || 3000)
);
