import { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    city: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = "https://jsonplaceholder.typicode.com/users";

  // READ: Fetch users from API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load users");
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Users load aagala. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // CREATE and UPDATE
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (
      !form.name.trim() ||
      !form.username.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.website.trim() ||
      !form.city.trim()
    ) {
      setMessage("All fields are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage("Enter a valid email address.");
      return;
    }

    const userData = {
      name: form.name,
      username: form.username,
      email: form.email,
      phone: form.phone,
      website: form.website,
      address: { city: form.city },
    };

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) throw new Error("Request failed");

      const savedUser = await response.json();

      if (editingId) {
        setUsers((previousUsers) =>
          previousUsers.map((user) =>
            user.id === editingId
              ? { ...user, ...userData }
              : user
          )
        );
        setMessage("User updated successfully!");
      } else {
        setUsers((previousUsers) => [
          ...previousUsers,
          { ...userData, id: savedUser.id || Date.now() },
        ]);
        setMessage("User added successfully!");
      }

      resetForm();
    } catch {
      setMessage("Operation failed. Please try again.");
    }
  };

  // EDIT: Load selected user into the form
  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      website: user.website || "",
      city: user.address?.city || "",
    });
    setMessage("");
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== id)
      );

      if (editingId === id) resetForm();

      setMessage("User deleted successfully!");
    } catch {
      setMessage("Delete failed. Please try again.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      city: "",
    });
  };

  if (loading) return <h2>Loading users...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin">
      <h1>Admin - User Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update User" : "Add User"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      {message && <p>{message}</p>}

      <h2>Users List</h2>

      <div className="product-list">
        {users.map((user) => (
          <div className="product-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <p>City: {user.address?.city}</p>

            <button onClick={() => handleEdit(user)}>
              Edit
            </button>

            <button onClick={() => handleDelete(user.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;