import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";

import mongoData from "./mongoData.js";

// App config
const app = express();
const port = process.env.PORT || 9000;

// Middlewares
app.use(cors());
app.use(express.json());

// db config
const mongoPass = process.env.MONGO_DB_PASS;
const dbName = "";
const mongoURI = `mongodb+srv://admin:${mongoPass}@cluster0.fjifq.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");
});

// api routes
app.get("/", (req, res) => res.status(200).send("Hello from Slack Clone api"));

app.post("/new/channel", (req, res) => {
  const dbData = req.body;
  // to do
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
