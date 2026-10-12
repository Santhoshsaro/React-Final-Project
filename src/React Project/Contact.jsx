import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("Please fill all the fields!");
      setSuccess(false);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email!");
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>

      <p>Have questions? Send us a message.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Send Message</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {success && (
        <p style={{ color: "green" }}>
          Message submitted successfully!
        </p>
      )}
    </div>
  );
}

export default Contact;
