import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";

// App config
const app = express();
const port = process.env.PORT || 9000;

// Middlewares
app.use(cors());
app.use(express.json());

// db config

// api routes
app.get("/", (req, res) => res.status(200).send("Hello from Slack Clone api"));

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
