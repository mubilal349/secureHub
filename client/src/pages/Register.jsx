import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(-45deg, #000000, #1a1a1a, #0d0d0d, #000000)",
    backgroundSize: "400% 400%",
    animation: "gradientAnimation 10s ease infinite",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    backgroundColor: "#000000",
    border: "1px solid #1f1f1f",
    borderRadius: "20px",
    padding: "45px",
    color: "#ffffff",
    boxSizing: "border-box",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.7)",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    margin: "0 0 8px",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  subtitle: {
    margin: 0,
    color: "#999999",
    fontSize: "14px",
  },

  errorMessage: {
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    color: "#ef4444",
    border: "1px solid rgba(220, 38, 38, 0.3)",
    borderRadius: "10px",
    padding: "12px 15px",
    marginBottom: "20px",
    fontSize: "13px",
    textAlign: "center",
  },

  successMessage: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    color: "#22c55e",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    borderRadius: "10px",
    padding: "12px 15px",
    marginBottom: "20px",
    fontSize: "13px",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: "1px solid #252525",
    backgroundColor: "#050505",
    color: "#ffffff",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s ease",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "8px",
    borderRadius: "10px",
    border: "1px solid #333333",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    cursor: "pointer",
    transition: "0.3s ease",
  },

  footer: {
    textAlign: "center",
    marginTop: "25px",
    color: "#888888",
    fontSize: "14px",
  },

  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "600",
    marginLeft: "5px",
  },
};

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Basic password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("REGISTER RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Registration successful! Redirecting to login...");

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Account</h1>

          <p style={styles.subtitle}>Create your SecureHub account</p>
        </div>

        {error && <div style={styles.errorMessage}>{error}</div>}

        {success && <div style={styles.successMessage}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>

            <input
              type="text"
              placeholder="YOUR NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
              className="dark-input"
            />
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>

            <input
              type="email"
              placeholder="YOUR_EMAIL@EXAMPLE.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              className="dark-input"
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              className="dark-input"
            />
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
              className="dark-input"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            className="matte-button"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Login link */}
        <div style={styles.footer}>
          Already have an account?
          <Link to="/login" style={styles.link}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
