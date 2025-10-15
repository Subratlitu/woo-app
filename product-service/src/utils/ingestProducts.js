// src/utils/ingestProducts.js
import { fetchWooProducts } from "./wooClient.js";
import { Product } from "../models/Product.js";

/**
 * Fetch WooCommerce products and store them locally in MongoDB
 */
export const ingestProducts = async () => {
  try {
    const products = await fetchWooProducts();

    for (const p of products) {
      // Convert price safely
      const parsedPrice =
        p.price && !isNaN(p.price) ? parseFloat(p.price) : null;

      // Convert stock_quantity safely
      const parsedStock =
        p.stock_quantity && !isNaN(p.stock_quantity)
          ? parseInt(p.stock_quantity)
          : null;

      const data = {
        id: p.id,
        title: p.name,
        price: parsedPrice, //  always a number or null
        stock_status: p.stock_status,
        stock_quantity: parsedStock, //  safe conversion
        category: p.categories?.[0]?.name || null,
        tags: p.tags?.map((t) => t.name) || [],
        on_sale: p.on_sale,
        created_at: p.date_created,
      };

      //  Upsert product (update if exists, else insert)
      await Product.findOneAndUpdate({ id: p.id }, data, {
        upsert: true,
        new: true,
      });
    }

    console.log(` Ingested ${products.length} products`);
    return { count: products.length };
  } catch (error) {
    console.error(" Error in product ingestion:", error.message);
    throw error;
  }
};

