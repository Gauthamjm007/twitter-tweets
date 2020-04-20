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

//set you twitter key here
let twitter = new Twitter({
  consumer_key: process.env.consumer_key2,
  consumer_secret:  process.env.consumer_secret2,
  access_token_key: process.env.access_token_key2,
  access_token_secret: process.env.access_token_secret2,
});

let socketConnection;
let twitterStream;

app.locals.searchTerm = ""; //default search term for twitter stream.
app.locals.showRetweets = false; //Default

/**
 * resumes twitter stream.
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

// establishes socket connection
io.on("connection", (socket) => {
  socketConnection = socket;
  stream();
  socket.on("connection", () => console.log("Client connected"));
  socket.on("disconnect", () => console.log("Client disconnected"));
});

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
 *
 */
const sendMessage = (msg) => {
  if (msg.text.includes("RT")) {
    return;
  }
  socketConnection.emit("tweets", msg);
};

//Parse incoming request bodies in a middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//fetch data with this route
app.use("/api/twitter", router);

//path for the client side build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
