import express from "express";
import path from "path";

// Database
import mongoose from "mongoose";
import MongoClient from "mongodb";
import { MONGODB_URI } from "./util/secrets";

// Middlewares
import bodyParser from "body-parser";
import compression, { filter } from "compression"; // compresses requests
import flash from "express-flash";
import cors from "cors";

// Controllers (route handlers)
import Routes from "./routes";
import Counter, { CounterSchema } from "./models/Counter";

class App {
  public app: express.Express = express();
  public controllers: Routes = new Routes();
  public mongoUrl: string = MONGODB_URI;

  constructor() {
    // Configure application
    this.config();

    // Initialize Database
    this.mongoSetup();

    // Initialize Routes
    this.controllers.routes(this.app);
  }

  private config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(flash());
    this.app.use(cors());
    // serving static files
    this.app.use(express.static(path.join(__dirname, "../client/build")));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose
      .connect(this.mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true
      })
      .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log("Successfully connected to Database!");
      })
      .catch(err => {
        console.log(
          " MongoDB connection error. Please make sure MongoDB is running. ",
          err
        );
        // process.exit();
      });

    this.intilizeDatabase();
  }

  private intilizeDatabase() {
    const Counter = mongoose.model("counter", CounterSchema);

    Counter.find()
      .then((data: Array<any>) => {
        if (data.length === 0) {
          const newItem = new Counter({ _id: "gameId", seq: 0 });
          newItem.save();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}

export default new App().app;
