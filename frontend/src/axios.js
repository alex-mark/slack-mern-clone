import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9000",
  baseURL: "https://slack-mern-clone-alex.herokuapp.com",
});

export default instance;
