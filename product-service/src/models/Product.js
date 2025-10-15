// src/models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // WooCommerce product ID
  title: { type: String, required: true },
  price: { type: Number },  
  stock_status: { type: String },
  stock_quantity: { type: Number, default: null },
  category: { type: String },
  tags: [{ type: String }],
  on_sale: { type: Boolean },
  created_at: { type: String },
});

export const Product = mongoose.model("Product", ProductSchema);
