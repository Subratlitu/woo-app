import { Product } from "../models/Product.js";

export const evaluateSegment = async (rules, page = 1, limit = 10) => {
  const query = {};
  const allowedFields = ["category","created_at","on_sale","price","stock_quantity","stock_status","title"];

  rules.forEach(line => {
    line = line.trim();
    if (!line) return;

    const match = line.match(/^(\w+)\s*(>=|<=|!=|=|>|<)\s*(.+)$/);
    if (!match) throw new Error(`Invalid rule format: "${line}"`);

    let [, field, operator, rawValue] = match;
    if (!allowedFields.includes(field)) throw new Error(`Filtering by field "${field}" is not allowed`);

    let value = rawValue.trim();

    // Convert numeric fields
    if (["price","stock_quantity"].includes(field)) value = parseFloat(value);

    // Convert boolean fields
    if (field === "on_sale") value = value.toLowerCase() === "true";

    switch(operator){
      case ">": query[field] = {$gt: value}; break;
      case "<": query[field] = {$lt: value}; break;
      case ">=": query[field] = {$gte: value}; break;
      case "<=": query[field] = {$lte: value}; break;
      case "=": query[field] = value; break;
      case "!=": query[field] = {$ne: value}; break;
      default: throw new Error(`Unsupported operator: ${operator}`);
    }
  });
   
  
  const skip = (page-1)*limit;
  const filtered = await Product.find(query).skip(skip).limit(limit);
  const totalCount = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);
  console.log(query , "??????????/",totalCount,limit,page);
  return { filtered, totalPages };
};

