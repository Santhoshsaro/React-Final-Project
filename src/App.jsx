import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./React Project/Navbar";
import Home from "./React Project/Home";
import Products, {
  ProductDetails,
} from "./React Project/Products";
import Cart from "./React Project/Cart";
import About from "./React Project/About";
import Contact from "./React Project/Contact";
import Profile from "./React Project/Profile";
import Admin from "./React Project/Admin";
import Wishlist from "./React Project/Wishlist";

import { CartProvider } from "./React Project/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Nested Routing */}
          <Route path="/products" element={<Products />}>
            <Route
              path=":id"
              element={<ProductDetails />}
            />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;