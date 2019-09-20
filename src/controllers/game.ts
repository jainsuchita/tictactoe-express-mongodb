import { Request, Response } from "express";
import Game from "../models/Game";

export const allGames = (req: Request, res: Response) => {
  Game.find()
    // Newest games first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then(games => res.json(games))
    // Throw a 500 error if something goes wrong
    .catch(error => res.send(error));
};

export const getGame = (req: Request, res: Response) => {
  const id = req.params.id;

  Game.find({ gameId: id })
    .then(game => {
      if (!game) {
        res.send("Error!");
      }
      res.json(game);
    })
    .catch(error => res.send(error));
};

// export const updateGame = (req: Request, res: Response) => {
//     res.send("Returns one Game");
// };

export const addGame = (req: Request, res: Response) => {
  // res.send("Returns one game");
  const game = new Game(req.body);

  game.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(game);
    }
  });
};
