// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Helper from "./components/Helper"; // Correct import

// const Register = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/register", formData);
//       if (res.data.success) {
//         navigate("/login"); // Redirect after successful registration
//       } else {
//         setError(res.data.message);
//       }
//     } catch {
//       setError("Registration failed! Try again.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Register</h2>
//       {error && <p style={styles.error}>{error}</p>}
//       <form onSubmit={handleRegister} style={styles.form}>
//         <input style={styles.input} type="text" placeholder="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//         <input style={styles.input} type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//         <input style={styles.input} type="password" placeholder="Password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//         <button style={styles.button} type="submit">Register</button>
//       </form>
//       <p style={styles.text}>
//         Already have an account? <a href="/login" style={styles.link}>Login</a>
//       </p>
//     </div>
//   );
// };

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/login", formData);
//       if (res.data.success) {
//         navigate("/helper"); // Redirect to Helper component on success
//       } else {
//         setError(res.data.message);
//       }
//     } catch {
//       setError("Login failed! Check credentials.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Login</h2>
//       {error && <p style={styles.error}>{error}</p>}
//       <form onSubmit={handleLogin} style={styles.form}>
//         <input style={styles.input} type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//         <input style={styles.input} type="password" placeholder="Password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//         <button style={styles.button} type="submit">Login</button>
//       </form>
//       <p style={styles.text}>
//         Don't have an account? <a href="/register" style={styles.link}>Register</a>
//       </p>
//     </div>
//   );
// };

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Register />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/helper" element={<Helper />} />
//     </Routes>
//   </Router>
// );

// // Internal CSS
// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "50px auto",
//     padding: "20px",
//     textAlign: "center",
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "10px",
//     color: "#333",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     fontSize: "14px",
//     marginBottom: "10px",
//   },
//   text: {
//     fontSize: "14px",
//     marginTop: "10px",
//   },
//   link: {
//     color: "#007bff",
//     textDecoration: "none",
//   },
// };

// export default App;


