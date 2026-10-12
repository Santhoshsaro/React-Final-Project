import { useCart } from "./CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h1>My Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty! Go to Products and add items.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <h3>{item.title}</h3>

            <p>Price: ₹{item.price}</p>

            <p>Quantity: {item.quantity}</p>

            <p>
              Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
            </p>

            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;