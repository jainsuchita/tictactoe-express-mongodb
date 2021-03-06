import mongoose from "mongoose";
const { Schema } = mongoose;

// const playerSchema = new Schema({
//     playerId: { type: Schema.Types.ObjectId, ref: 'players' },
//     score: Number,
//     reatedAt: { type: Date, default: Date.now },
// });

export interface IGame extends mongoose.Document {
  gameId: number;
  winner: number;
}

export const GameSchema = new Schema({
  gameId: { type: Number, required: true },
  winner: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  // board: []
});

// GameSchema.pre("save", next => {
// console.log("fs");
// let doc: any = this;

//   Counter.findByIdAndUpdate(
//     { _id: "gameId" },
//     { $inc: { seq: 1 } },
//     (error, Counter) => {
//       if (error) return next(error);
//       doc.gameId = Counter.seq;
//       console.log(doc.gameId);
//       next();
//     }
//   );
// });

const Game = mongoose.model<IGame>("Game", GameSchema);
export default Game;
