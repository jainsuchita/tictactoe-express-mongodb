import express from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import flash from "express-flash";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

const MongoStore = mongo(session);

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as gameController from "./controllers/game";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true
    })
  })
);
app.use(flash());
app.use(cors());

app.use(
  express.static(path.join(__dirname, "../client/build"), {
    maxAge: 31557600000
  })
);

// app.get('/', function (req, res) {
//         res.sendFile(path.join(__dirname, "client", "index.html"));
// });

app.get("/", homeController.index);

// API Endpoints
app.get("/games", gameController.allGames);
app.get("/game/:id", gameController.getGame);
app.post("/game", gameController.addGame);
// app.put("/game/:id", gameController.updategame);
// app.delete("/game/:id", gameController.deletegame);

export default app;
