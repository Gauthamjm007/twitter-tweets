const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const path = require("path");
const app = express();
const router = require("./config/routes");
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const Twitter = require("twitter");

io.set("origins", "*:*");
// server setup
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});

let twitter = new Twitter({
  consumer_key: process.env.consumer_key1,
  consumer_secret: process.env.consumer_secret1,
  access_token_key: process.env.access_token_key1,
  access_token_secret: process.env.access_token_secret1,
});

let socketConnection;
let twitterStream;

app.locals.searchTerm = ""; //Default search term for twitter stream.
app.locals.showRetweets = false; //Default

/**
 * Resumes twitter stream.
 */
const stream = () => {
  console.log(`Searching for ${app.locals.searchTerm}`);

  twitter.stream(
    "statuses/filter",
    { track: app.locals.searchTerm },
    (stream) => {
      stream.on("data", (tweet) => {
        sendMessage(tweet);
      });

      stream.on("error", (error) => {
        console.log(error);
      });

      twitterStream = stream;
    }
  );
};

// Establishes socket connection.
io.on("connection", (socket) => {
  socketConnection = socket;
  stream();
  socket.on("connection", () => console.log("Client connected"));
  socket.on("disconnect", () => console.log("Client disconnected"));
});

//
io.on("connection", (socket) => {
  socket.on("searchTerm", (searchTerm) => {
    console.log(`Message received: ${searchTerm}`);
    twitterStream.destroy();
    app.locals.searchTerm = searchTerm;
    stream();
  });
});

/**
 * Emits data from stream.
 * @param {String} msg
 */
const sendMessage = (msg) => {
  if (msg.text.includes("RT")) {
    return;
  }
  socketConnection.emit("tweets", msg);
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/twitter", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
