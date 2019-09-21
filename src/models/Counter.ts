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

// let newItem1 = new Counter({ _id: "gameId", seq: 0 });
// newItem1.save();

const Counter = mongoose.model<ICounterDocument>("counter", CounterSchema);
export default Counter;
