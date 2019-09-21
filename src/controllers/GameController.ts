import * as express from "express";
import Game from "../models/Game";
import Counter from "../models/Counter";

export class GameController {
  constructor() {
    this.getNextSequence = this.getNextSequence.bind(this);
  }

  /**
   * Get games from the database
   *  @returns array of games
   */

  public async getAllGames(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);

    try {
      // Newest games first
      const games = await Game.find().sort({ createdAt: -1 });

      // Send the data in JSON format
      res.json(games);
    } catch (error) {
      next(error);
    }
  }

  private async getNextSequence(name: string) {
    const ret = await Counter.findByIdAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } }
    );

    return ret.seq;
  }

  /**
   * Get games from the database
   *  @returns array of games
   */

  public async saveNewGame(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);

    try {
      const newGame = new Game(req.body);

      // Auto Increment the gameId
      newGame.gameId = await new GameController().getNextSequence("gameId");

      // save new game
      await newGame.save();

      res.json(newGame);
    } catch (error) {
      res.status(400).send(`unable to save to database ${error}`);
      next(error);
    }
  }

  /**
   * Get one game using the game id
   * @returns game is this exists
   */
  public async getGameWithId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);

    try {
      const gameId = req.params.gameId;

      const game = await Game.find({ gameId: gameId });

      if (!game) {
        res.status(400).send({ message: "The game id is required" });
      }
      res.json(game);
    } catch (error) {
      res.status(400).send(`unable to find game ${error}`);
      next(error);
    }
  }

  public async deleteGameWithId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);

    try {
      await Game.remove({ gameId: req.params.gameId });
      res.status(200).json({ message: "Successfully deleted game!" });
    } catch (error) {
      res.status(400).send(`unable to find game ${error}`);
      next(error);
    }
  }

  public async deleteAllGames(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);

    try {
      await Game.remove({});
      res.status(200).json({ message: "Successfully deleted all the game!" });
    } catch (error) {
      res.status(400).send(`unable to find game ${error}`);
      next(error);
    }
  }

  public async updateGameWithId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);

    try {
      const game = await Game.findOneAndUpdate(
        { gameId: req.params.gameId },
        req.body,
        {
          new: true
        }
      );

      if (!game) {
        res.status(400).send({ message: "unable to find game" });
      }

      res.status(200).json({ message: "Successfully updated the game!" });
    } catch (error) {
      res.status(400).send(`unable to find game ${error}`);
      next(error);
    }
  }
}
