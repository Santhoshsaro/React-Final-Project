import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to SHOP DESIRE 🛍️</h1>

      <p>
        Discover the best products at affordable prices.
        Shop your favourite items with us!
      </p>

      <Link to="/products" className="shop-btn">
        Shop Now
      </Link>

      <section className="home-info">
        <h2>Why Choose ShopEase?</h2>

        <p>✔ Quality Products</p>
        <p>✔ Affordable Prices</p>
        <p>✔ Easy Shopping Experience</p>
      </section>
    </div>
  );
}

export default Home;