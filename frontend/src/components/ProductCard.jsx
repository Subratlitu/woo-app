import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.title || "No title"}</h3>
      <p>
        Price: <span>₹{product.price != null ? product.price : "N/A"}</span>
      </p>
      <p>
        Stock: <span>{product.stock_status || "N/A"}</span>
      </p>
      <p>
        Category: <span>{product.category || "N/A"}</span>
      </p>
      <p>
        On Sale: <span>{product.on_sale ? "Yes" : "No"}</span>
      </p>

      {product.tags && product.tags.length > 0 && (
        <div className="tags">
          {product.tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;

// import React from "react";
// import "./ProductCard.css";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="product-card">
//       <h3>{product.title || "No title"}</h3>
//       <p>
//         <b>Price:</b> ₹{product.price != null ? product.price : "N/A"}
//       </p>
//       <p>
//         <b>Stock:</b> {product.stock_status || "N/A"}
//       </p>
//       <p>
//         <b>Category:</b> {product.category || "N/A"}
//       </p>
//       <p>
//         <b>On Sale:</b> {product.on_sale ? "Yes" : "No"}
//       </p>
//       {product.tags && product.tags.length > 0 && (
//         <p>
//           <b>Tags:</b> {product.tags.join(", ")}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProductCard;
// import React from "react";
// import "./ProductCard.css";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="product-card">
//       {product.on_sale && <div className="badge">On Sale</div>}

//       <h3 className="product-title">{product.title || "No title"}</h3>

//       <p className="product-price">
//         ₹{product.price != null ? product.price : "N/A"}
//       </p>

//       <p className={`stock-status ${product.stock_status}`}>
//         {product.stock_status || "N/A"}
//       </p>

//       <p className="category">{product.category || "Uncategorized"}</p>

//       {product.tags && product.tags.length > 0 && (
//         <div className="tags">
//           {product.tags.map((tag, index) => (
//             <span key={index} className="tag">
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;
