import { useState, useRef } from "react";

function Profile() {
  const [name, setName] = useState("ShopEase User");
  const [email, setEmail] = useState("user@gmail.com");

  const nameRef = useRef(null);

  const handleEdit = () => {
    nameRef.current.focus();
  };

  return (
    <div className="profile">
      <h1>My Profile</h1>

      <p>View and update your profile details.</p>

      <div className="profile-card">
        <h2>User Details</h2>

        <label>Name</label>
        <input
          ref={nameRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleEdit}>Edit Name</button>

        <h3>Preview</h3>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
}

export default Profile;