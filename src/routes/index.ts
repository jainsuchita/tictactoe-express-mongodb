import * as express from "express";
import { GameController } from "../controllers/GameController";
import { HomeController } from "../controllers/HomeController";

class Routes {
  public gameController: GameController = new GameController();
  public homeController: HomeController = new HomeController();

  public routes(app: express.Express): void {
    app.route("/").get(this.homeController.getHomePage);

    // Game
    app
      .route("/game")

      // GET endpoint
      .get(this.gameController.getAllGames)

      // POST endpoint
      .post(this.gameController.saveNewGame);

    // Game detail
    app
      .route("/game/:gameId")
      // get specific game
      .get(this.gameController.getGameWithId)
      .put(this.gameController.updateGameWithId)
      .delete(this.gameController.deleteGameWithId);
  }
}

export default Routes;
