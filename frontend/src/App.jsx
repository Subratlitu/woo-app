
import React, { useEffect, useState } from "react";
import { fetchProducts } from "./api/productAPI";
import ProductCard from "./components/ProductCard";
import SegmentEditor from "./components/SegmentEditor";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [segmentResult, setSegmentResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSegment, setIsSegment] = useState(false);
  const [segmentRules, setSegmentRules] = useState(""); // store last applied rules
  const limit = 10;

  // Load normal products
  const loadProducts = async (pageNumber = 1) => {
    const data = await fetchProducts(pageNumber, limit);
    setProducts(data?.products || []);
    setTotalPages(data?.totalPages || 1);
    setIsSegment(false);
  };

  // Segment evaluation handler
  const handleSegmentEvaluation = (resultData, rulesText = "") => {
    console.log("Segment evaluation received:", resultData);
    setSegmentResult(resultData.products || []);
    setTotalPages(resultData.totalPages || 1);
    setPage(resultData.page || 1);
    setIsSegment(true);
    setSegmentRules(rulesText); // save last applied rules
  };

  // Pagination handler
  const handlePageChange = async (newPage) => {
    setPage(newPage);

    if (isSegment) {
      // Re-evaluate segment with saved rules for new page
      const { evaluateSegment } = await import("./api/segmentAPI");
      const result = await evaluateSegment(segmentRules, newPage, limit);
      handleSegmentEvaluation(result, segmentRules);
    } else {
      loadProducts(newPage);
    }
  };

  // Initially load first page of products
  useEffect(() => {
    loadProducts(1);
  }, []);

  const productsToDisplay = isSegment ? segmentResult : products;

  return (
    <div className="app-container">
      <header>
        <h1>🛒 WooCommerce Products Dashboard</h1>
        <p>Filter and segment products using simple rules</p>
      </header>

      <SegmentEditor
        setSegmentResult={handleSegmentEvaluation}
        setPage={setPage}
        setTotalPages={setTotalPages}
        setIsSegment={setIsSegment}
        setSegmentRules={setSegmentRules} // pass setter
        limit={limit}
      />

      <section className="products-grid">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((p) => <ProductCard key={p._id} product={p} />)
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No products found for the selected rules.
          </p>
        )}
      </section>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={handlePageChange}
        />
      )}
    </div>
  );
}

export default App;
// import React, { useEffect, useState } from "react";
// import { fetchProducts } from "./api/productAPI";
// import ProductCard from "./components/ProductCard";
// import SegmentEditor from "./components/SegmentEditor";
// import Pagination from "./components/Pagination";
// import "./App.css";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [segmentResult, setSegmentResult] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isSegment, setIsSegment] = useState(false);
//   const [segmentRules, setSegmentRules] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const limit = 10;

//   const loadProducts = async (pageNumber = 1) => {
//     setLoading(true);
//     setError("");
//     try {
//       const data = await fetchProducts(pageNumber, limit);
//       setProducts(data?.products || []);
//       setTotalPages(data?.totalPages || 1);
//       setIsSegment(false);
//     } catch (err) {
//       setError("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSegmentEvaluation = async (resultData, rulesText = "") => {
//     setSegmentResult(resultData.products || []);
//     setTotalPages(resultData.totalPages || 1);
//     setPage(resultData.page || 1);
//     setIsSegment(true);
//     setSegmentRules(rulesText);
//   };

//   const handlePageChange = async (newPage) => {
//     setPage(newPage);
//     setLoading(true);
//     setError("");
//     try {
//       if (isSegment && segmentRules) {
//         const { evaluateSegment } = await import("./api/segmentAPI");
//         const result = await evaluateSegment(segmentRules, newPage, limit);
//         handleSegmentEvaluation(result, segmentRules);
//       } else {
//         await loadProducts(newPage);
//       }
//     } catch (err) {
//       setError("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProducts(1);
//   }, []);

//   const productsToDisplay = isSegment ? segmentResult : products;

//   return (
//     <div className="app-container">
//       <header>
//         <h1>🛒 WooCommerce Products Dashboard</h1>
//         <p>Filter and segment products using simple rules</p>
//       </header>

//       <SegmentEditor
//         setSegmentResult={handleSegmentEvaluation}
//         setPage={setPage}
//         setTotalPages={setTotalPages}
//         setIsSegment={setIsSegment}
//         setSegmentRules={setSegmentRules}
//         limit={limit}
//       />

//       {loading && <div className="loading">Loading...</div>}
//       {error && <div className="error">{error}</div>}

//       {!loading && !error && (
//         <section className="products-grid">
//           {productsToDisplay.length > 0 ? (
//             productsToDisplay.map((p) => <ProductCard key={p._id} product={p} />)
//           ) : (
//             <div className="no-products">No products found for the selected rules.</div>
//           )}
//         </section>
//       )}

//       {totalPages > 1 && (
//         <Pagination
//           page={page}
//           totalPages={totalPages}
//           setPage={handlePageChange}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
