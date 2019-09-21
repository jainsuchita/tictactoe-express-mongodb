import mongoose from "mongoose";
const { Schema } = mongoose;

export interface ICounterDocument extends mongoose.Document {
  _id: number;
  seq: number;
}

export const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model<ICounterDocument>("counter", CounterSchema);

// let newItem1 = new Counter({ _id: "gameId", seq: 0 });
// newItem1.save();

export default Counter;
