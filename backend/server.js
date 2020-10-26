import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";

import mongoData from "./mongoData.js";

// App config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1097225",
  key: "4d9cb078b8038c8580b1",
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

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

  const changeStream = mongoose.connection.collection("conversations").watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("channels", "newChannel", {
        change: change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("conversation", "newMessage", {
        change: change,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// api routes
app.get("/", (req, res) => res.status(200).send("Hello from Slack Clone api"));

app.post("/new/channel", (req, res) => {
  const dbData = req.body;

  mongoData.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/new/message", (req, res) => {
  const id = req.query.id;
  const newMessage = req.body;

  mongoData.update(
    { _id: id },
    { $push: { conversation: newMessage } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

app.get("/get/channelList", (req, res) => {
  mongoData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // const channels = data.reduce((acc, channel) => {
      //   acc.push({ id: channel._id, name: channel.channelName });
      // }, []);

      let channels = [];
      data.map((channelData) => {
        channels.push({ id: channelData._id, name: channelData.channelName });
      });

      console.log(data);
      console.log(channels);
      res.status(200).send(channels);
    }
  });
});

app.get("/get/conversation", (req, res) => {
  const id = req.query.id;

  mongoData.findById(id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
