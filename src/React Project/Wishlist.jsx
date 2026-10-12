import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "./wishlistSlice";
import { Link } from "react-router-dom";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="products">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div>
          <p>Your wishlist is empty!</p>
          <Link to="/products">Explore Products</Link>
        </div>
      ) : (
        <div className="product-list">
          {wishlist.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />

              <h3>{product.title}</h3>

              <p>${product.price}</p>

              <button
                onClick={() =>
                  dispatch(removeFromWishlist(product.id))
                }
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;