import {
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useOutletContext,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "./wishlistSlice";

import { useCart } from "./CartContext";
import useFetchData from "./useFetchData";

function Products() {
  const {
    data: products,
    loading,
    error,
  } = useFetchData("https://fakestoreapi.com/products");

  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const productsPerPage = 5;
  const totalPages = Math.max(
    1,
    Math.ceil(products.length / productsPerPage)
  );

  const pageProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const isWishlisted = (productId) =>
    wishlist.some((item) => item.id === productId);

  if (loading) return <h2>Loading Products...</h2>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products">
      <h1>Our Products</h1>

      <div className="product-list">
        {pageProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>

            <Link to={`/products/${product.id}`}>
              View Details
            </Link>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>

            <button
              onClick={() =>
                dispatch(
                  isWishlisted(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                )
              }
            >
              {isWishlisted(product.id)
                ? "❤️ Remove from Wishlist"
                : "🤍 Add to Wishlist"}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage <= 1}
          onClick={() =>
            setSearchParams({ page: String(currentPage - 1) })
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() =>
            setSearchParams({ page: String(currentPage + 1) })
          }
        >
          Next
        </button>
      </div>

      <Outlet context={{ products }} />
    </div>
  );
}

export function ProductDetails() {
  const { id } = useParams();
  const { products } = useOutletContext();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="150" />
      <p>{product.description}</p>
      <h3>${product.price}</h3>
      <Link to="/products">Back to Products</Link>
    </div>
  );
}

export default Products;