import mongoose from "mongoose";
const { Schema } = mongoose;

// const playerSchema = new Schema({
//     playerId: { type: Schema.Types.ObjectId, ref: 'players' },
//     score: Number,
//     reatedAt: { type: Date, default: Date.now },
// });

export const GameSchema = new Schema({
  //   gameId: { type: Schema.Types.ObjectId },
  // winnerId: { type: Schema.Types.ObjectId },
  gameId: Number,
  winnerId: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  // board: []
});

const Game = mongoose.model("Game", GameSchema);
export default Game;
