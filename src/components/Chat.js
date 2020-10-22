import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import "./Chat.css";
import Message from "./Message";
import db from "../firebase";

function Chat() {
  const { channelId } = useParams();
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .onSnapshot((snapshot) => setChannelDetails(snapshot.data()));

      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setChannelMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{channelDetails?.name}</strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>

        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>

      <div className="chat__messages">
        {channelMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>
    </div>
  );
}

export default Chat;
