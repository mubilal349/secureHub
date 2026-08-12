import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Standard CSS-in-JS style object, now with the all-black, animated theme
const styles = {
  // 1. Dark, Centered Background (Animated Gradient)
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Animated dark gradient background
    background: "linear-gradient(-45deg, #000000, #1a1a1a, #0d0d0d, #000000)",
    backgroundSize: "400% 400%",
    // Crucial: The 'animation' property uses the 'gradientAnimation' keyframes defined in index.css
    animation: "gradientAnimation 10s ease infinite",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "20px",
    overflow: "hidden", // Prevent scrollbars if elements float
  },
  // 2. All-Black Form Card
  card: {
    backgroundColor: "#000000", // Full black
    borderRadius: "20px",
    padding: "50px",
    width: "100%",
    maxWidth: "400px",
    color: "#ffffff",
    boxSizing: "border-box",
    // Subtler, dark-on-dark shadow
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
    border: "1px solid #1a1a1a", // Defines the edge clearly
  },
  header: {
    marginBottom: "35px",
    textAlign: "center",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "26px",
    fontWeight: "700",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#a0a0a0", // Dim gray subtitle
  },
  errorMessage: {
    // Retain classic red error coloring but integrate slightly
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    color: "#ef4444",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "25px",
    border: "1px solid rgba(220, 38, 38, 0.3)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#ffffff", // Pure white for labels
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  // 3. Black Input Fields
  input: {
    padding: "14px 18px",
    fontSize: "14px",
    borderRadius: "10px",
    // All-black input with subtle border
    backgroundColor: "#000000",
    border: "1px solid #1a1a1a",
    color: "#ffffff", // White text input
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
    // Subtle glow on focus (handled in index.css)
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  // 4. Matte Black Button (with potential effects)
  button: {
    // Dark matte black button
    backgroundColor: "#000000",
    color: "#ffffff", // Pure white button text
    border: "1px solid #333333", // Distinct button edge
    borderRadius: "10px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginTop: "10px",
    transition:
      "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease",
  },
};

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome back</h1>
          <p style={styles.subtitle}>Enter your credentials to continue</p>
        </div>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="YOUR_EMAIL@EXAMPLE.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              // Required for focus state highlighting
              className="dark-input"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              // Required for focus state highlighting
              className="dark-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            // Standard CSS hover/active effects in index.css
            className="matte-button"
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
