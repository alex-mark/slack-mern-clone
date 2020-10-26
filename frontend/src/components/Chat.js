import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Pusher from "pusher-js";
import "./Chat.css";
import Message from "./Message";
import ChatInput from "./ChatInput";
import axios from "../axios";

const pusher = new Pusher("4d9cb078b8038c8580b1", {
  cluster: "eu",
});

function Chat() {
  const { channelId } = useParams();
  const [channelName, setChannelName] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);

  const getConversation = (channelId) => {
    axios.get(`/get/conversation?id=${channelId}`).then((res) => {
      setChannelName(res.data.channelName);
      setChannelMessages(res.data.conversation);
    });
  };

  useEffect(() => {
    if (channelId) {
      getConversation(channelId);

      // TO-DO change to pushing only new message
      const channel = pusher.subscribe("conversation");
      channel.bind("newMessage", function (data) {
        getConversation(channelId);
      });
    }
  }, [channelId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{channelName}</strong>
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

      <ChatInput channelName={channelName} channelId={channelId} />
    </div>
  );
}

export default Chat;
