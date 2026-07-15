import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ProductSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expense: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    transactions: [
      {
        type: String,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } },
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
