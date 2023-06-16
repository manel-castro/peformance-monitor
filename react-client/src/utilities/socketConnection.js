const io = require("socket.io-client");
const options = {
  auth: {
    token: "asdfasdggas14",
  },
};

const socket = io.connect("http://localhost:3000", options);

export default socket;
