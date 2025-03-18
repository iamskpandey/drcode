import React, { useState } from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const mobiles = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    company: "Apple",
    price: 999,
    img: "https://www.pngarts.com/files/3/Smartphone-Mobile-PNG-Image-Background.png",
  },
  {
    id: 3,
    name: "Google Pixel 7",
    company: "Google",
    price: 799,
    img: "https://www.pngarts.com/files/3/Smartphone-Mobile-PNG-Image-Background.png",
  },
  {
    id: 4,
    name: "OnePlus 11",
    company: "OnePlus",
    price: 749,
    img: "https://www.pngarts.com/files/3/Smartphone-Mobile-PNG-Image-Background.png",
  },
  {
    id: 5,
    name: "Xiaomi 13 Pro",
    company: "Xiaomi",
    price: 699,
    img: "https://www.pngarts.com/files/3/Smartphone-Mobile-PNG-Image-Background.png",
  },
];

const handleBuy = (event) => {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const address = form.address.value;
  const phoneNumber = form.phoneNumber.value;

  const data = {
    name,
    email,
    phoneNumber,
    address,
    purchaseTime: new Date(),
  };
  fetch("http://localhost:5000/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Order placed successfully!");
        form.reset();
      } else {
        alert("Error placing order");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error placing order");
    });
};

const Navbar = ({ cartCount }) => (
  <nav
    style={{
      backgroundColor: "#1a202c",
      color: "white",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Mobile Store</div>
    <div style={{ display: "flex", gap: "20px" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
        About
      </Link>
      <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>
        Contact
      </Link>
      <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
        Cart ({cartCount})
      </Link>
      <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
        Dashboard
      </Link>
    </div>
  </nav>
);

const Home = () => (
  <div
    style={{
      padding: "20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    }}
  >
    {mobiles.map((mobile) => (
      <div
        key={mobile.id}
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Link
          to={`/product/${mobile.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img
            src={mobile.img}
            alt={mobile.name}
            style={{ width: "100%", height: "250px", objectFit: "contain" }}
          />
          <h2>
            {mobile.company} - {mobile.name}
          </h2>
          <p>${mobile.price}</p>
        </Link>
      </div>
    ))}
  </div>
);

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mobile = mobiles.find((m) => m.id === parseInt(id));

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <img src={mobile.img} alt={mobile.name} style={{ width: "300px" }} />
      <h2>
        {mobile.company} - {mobile.name}
      </h2>
      <p>Price: ${mobile.price}</p>
      <button
        onClick={() => addToCart(mobile)}
        style={{
          marginRight: "10px",
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Add to Cart
      </button>
      <button
        onClick={() => navigate("/checkout")}
        style={{ padding: "10px", backgroundColor: "green", color: "white" }}
      >
        Buy Now
      </button>
    </div>
  );
};

const Cart = ({ cart }) => {
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img src={item.img} alt={item.name} style={{ width: "80px" }} />
            <div>
              <h3>
                {item.company} - {item.name}
              </h3>
              <p>${item.price}</p>
            </div>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <div>
          <h3>Total: ${totalPrice}</h3>
          <Link to="/checkout">
            <button
              style={{
                padding: "10px",
                backgroundColor: "green",
                color: "white",
                marginTop: "10px",
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const Checkout = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h2>Checkout</h2>
      <form
        onSubmit={handleBuy}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          style={{ padding: "10px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          style={{ padding: "10px" }}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          required
          style={{ padding: "10px" }}
        />
        <textarea
          name="address"
          placeholder="Address"
          required
          style={{ padding: "10px" }}
        ></textarea>
        <button
          type="submit"
          style={{ padding: "10px", backgroundColor: "blue", color: "white" }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

const Contact = () => (
  <div
    style={{
      padding: "20px",
      maxWidth: "400px",
      margin: "auto",
      textAlign: "center",
    }}
  >
    <h2>Contact Us</h2>
    <form
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      method="POST"
      action="/api/contact"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        style={{ padding: "10px" }}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        style={{ padding: "10px" }}
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        style={{ padding: "10px" }}
      ></textarea>
      <button
        type="submit"
        style={{ padding: "10px", backgroundColor: "blue", color: "white" }}
      >
        Send Message
      </button>
    </form>
  </div>
);

const About = () => (
  <div
    style={{
      padding: "20px",
      maxWidth: "600px",
      margin: "auto",
      textAlign: "center",
    }}
  >
    <h2>About Our Store</h2>
    <p>
      Welcome to Mobile Store, your number one source for the latest and
      greatest mobile devices. We offer high-quality smartphones at competitive
      prices, ensuring customer satisfaction.
    </p>
  </div>
);

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/leads")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleRowClick = (lead) => {
    fetch("http://localhost:5000/api/generate-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ leadId: lead._id }),
    })
      .then((response) => {
        if (response.ok) {
          alert("API call successful!");
        } else {
          alert("Error calling API");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error calling API");
      });
  };

  return (
    <div>
      <h2>Lead Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Purchase Time</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} onClick={() => handleRowClick(lead)}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.address}</td>
              <td>{lead.phoneNumber}</td>
              <td>{new Date(lead.purchaseTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (mobile) => {
    setCart([...cart, mobile]);
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<LeadList />} />
      </Routes>
    </Router>
  );
};

export default App;
