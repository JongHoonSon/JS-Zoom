import express from "express";
import http from "http";
import { parse } from "path";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3001`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from the Browser"));
  socket.on("message", (message) => {
    const parsed = JSON.parse(message.toString());
    switch (parse.type) {
      case "new_message":
        sockets.forEach((aSocket) => aSocket.send(parsed.payload));
      case "nickname":
        console.log(parsed.payload);
    }
  });
  socket.send("Hello! I'm WebSocket");
});

server.listen(3001, handleListen);
