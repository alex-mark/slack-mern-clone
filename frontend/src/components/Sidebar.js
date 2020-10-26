import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import { useStateValue } from "../StateProvider";
import axios from "../axios";

const pusher = new Pusher("4d9cb078b8038c8580b1", {
  cluster: "eu",
});

function Sidebar() {
  const [channels, setChannels] = useState([]);

  const [{ user }] = useStateValue();

  const getChannelList = () => {
    axios.get("/get/channelList").then((res) => {
      setChannels(res.data);
    });
  };

  useEffect(() => {
    getChannelList();

    // TO-DO change to pushing only new channel
    const channel = pusher.subscribe("channels");
    channel.bind("newChannel", function (data) {
      getChannelList();
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Alex's Slack</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>

      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption />

      {/* List all channels from db */}
      {channels.map((channel) => (
        <SidebarOption key={channel.id} title={channel.name} id={channel.id} />
      ))}
    </div>
  );
}

export default Sidebar;
