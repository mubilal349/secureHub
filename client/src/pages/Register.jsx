import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    background:
      "radial-gradient(circle at 15% 20%, rgba(99,102,241,0.16), transparent 30%), radial-gradient(circle at 85% 80%, rgba(168,85,247,0.14), transparent 30%), #050509",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: "24px",
    color: "#fff",
    boxSizing: "border-box",
  },

  /* ================================
     BACKGROUND GLOWS
  ================================= */

  glowOne: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "rgba(99,102,241,0.10)",
    filter: "blur(100px)",
    top: "-180px",
    left: "-120px",
    animation: "registerFloatOne 8s ease-in-out infinite",
    pointerEvents: "none",
  },

  glowTwo: {
    position: "absolute",
    width: "380px",
    height: "380px",
    borderRadius: "50%",
    background: "rgba(168,85,247,0.09)",
    filter: "blur(100px)",
    right: "-150px",
    bottom: "-150px",
    animation: "registerFloatTwo 10s ease-in-out infinite",
    pointerEvents: "none",
  },

  /* ================================
     DECORATIVE CIRCLES
  ================================= */

  circleOne: {
    position: "absolute",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "1px solid rgba(129,140,248,0.08)",
    top: "12%",
    left: "10%",
    animation: "registerRotate 15s linear infinite",
    pointerEvents: "none",
  },

  circleTwo: {
    position: "absolute",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    border: "1px solid rgba(168,85,247,0.07)",
    bottom: "10%",
    right: "10%",
    animation: "registerRotate 20s linear infinite reverse",
    pointerEvents: "none",
  },

  /* ================================
     CARD
  ================================= */

  card: {
    width: "100%",
    maxWidth: "450px",
    position: "relative",
    zIndex: 2,
    padding: "40px",
    borderRadius: "24px",

    background:
      "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",

    border: "1px solid rgba(255,255,255,0.09)",

    boxShadow: "0 30px 90px rgba(0,0,0,0.55), 0 0 60px rgba(99,102,241,0.06)",

    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",

    boxSizing: "border-box",

    animation: "registerCardEnter 0.7s ease both",
  },

  /* ================================
     LOGO
  ================================= */

  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "22px",
  },

  logo: {
    width: "56px",
    height: "56px",
    borderRadius: "17px",
    display: "grid",
    placeItems: "center",

    background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",

    fontSize: "22px",
    fontWeight: "800",

    boxShadow: "0 15px 40px rgba(99,102,241,0.35)",

    animation: "registerLogoPulse 3s ease-in-out infinite",
  },

  /* ================================
     HEADER
  ================================= */

  header: {
    textAlign: "center",
    marginBottom: "28px",
  },

  eyebrow: {
    color: "#818cf8",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "9px",
  },

  title: {
    margin: 0,
    fontSize: "29px",
    fontWeight: "800",
    letterSpacing: "-0.04em",

    background: "linear-gradient(90deg, #ffffff, #c7d2fe, #d8b4fe)",

    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    margin: "9px 0 0",
    color: "#71717a",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  /* ================================
     MESSAGES
  ================================= */

  errorMessage: {
    background: "rgba(239,68,68,0.07)",
    border: "1px solid rgba(239,68,68,0.18)",
    color: "#fca5a5",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "11px",
    marginBottom: "20px",
    textAlign: "center",
    animation: "registerMessageEnter 0.3s ease both",
  },

  successMessage: {
    background: "rgba(34,197,94,0.07)",
    border: "1px solid rgba(34,197,94,0.18)",
    color: "#86efac",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "11px",
    marginBottom: "20px",
    textAlign: "center",
    animation: "registerMessageEnter 0.3s ease both",
  },

  /* ================================
     FORM
  ================================= */

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "17px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  label: {
    color: "#a1a1aa",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },

  inputWrapper: {
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#52525b",
    fontSize: "13px",
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    height: "48px",

    padding: "0 15px 0 43px",

    borderRadius: "12px",

    border: "1px solid rgba(255,255,255,0.08)",

    background: "rgba(0,0,0,0.25)",

    color: "#fff",

    outline: "none",

    fontSize: "13px",

    boxSizing: "border-box",

    transition:
      "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
  },

  /* ================================
     BUTTON
  ================================= */

  button: {
    width: "100%",
    height: "50px",

    marginTop: "5px",

    borderRadius: "12px",

    border: "1px solid rgba(129,140,248,0.3)",

    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",

    color: "#fff",

    fontSize: "12px",
    fontWeight: "700",

    letterSpacing: "0.09em",
    textTransform: "uppercase",

    cursor: "pointer",

    boxShadow: "0 12px 30px rgba(99,102,241,0.22)",

    transition:
      "transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease",
  },

  /* ================================
     FOOTER
  ================================= */

  footer: {
    marginTop: "24px",
    paddingTop: "20px",

    borderTop: "1px solid rgba(255,255,255,0.06)",

    textAlign: "center",

    color: "#52525b",

    fontSize: "11px",
  },

  link: {
    color: "#a5b4fc",
    textDecoration: "none",
    fontWeight: "700",
    marginLeft: "5px",

    transition: "color 0.2s ease",
  },

  secureText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    marginTop: "9px",
    color: "#52525b",
    fontSize: "9px",
  },

  secureDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#4ade80",
    boxShadow: "0 0 10px rgba(74,222,128,0.7)",
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

    /* ================================
       PASSWORD CHECK
    ================================= */

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
    <>
      <style>
        {`
          /* =====================================
             ANIMATIONS
          ===================================== */

          @keyframes registerCardEnter {
            from {
              opacity: 0;
              transform:
                translateY(25px)
                scale(0.97);
            }

            to {
              opacity: 1;
              transform:
                translateY(0)
                scale(1);
            }
          }

          @keyframes registerFloatOne {
            0%, 100% {
              transform:
                translate(0, 0);
            }

            50% {
              transform:
                translate(35px, 25px);
            }
          }

          @keyframes registerFloatTwo {
            0%, 100% {
              transform:
                translate(0, 0);
            }

            50% {
              transform:
                translate(-30px, -25px);
            }
          }

          @keyframes registerRotate {
            from {
              transform:
                rotate(0deg);
            }

            to {
              transform:
                rotate(360deg);
            }
          }

          @keyframes registerLogoPulse {
            0%, 100% {
              box-shadow:
                0 15px 40px
                rgba(99,102,241,0.25);
            }

            50% {
              box-shadow:
                0 15px 55px
                rgba(168,85,247,0.45);
            }
          }

          @keyframes registerMessageEnter {
            from {
              opacity: 0;
              transform:
                translateY(-6px);
            }

            to {
              opacity: 1;
              transform:
                translateY(0);
            }
          }

          /* =====================================
             INPUT
          ===================================== */

          .register-input::placeholder {
            color: #3f3f46;
          }

          .register-input:focus {
            border-color:
              rgba(129,140,248,0.55) !important;

            background:
              rgba(99,102,241,0.035) !important;

            box-shadow:
              0 0 0 3px
              rgba(99,102,241,0.08),

              0 0 25px
              rgba(99,102,241,0.08);
          }

          .register-input:focus
          + .register-focus-line {
            transform:
              scaleX(1);
          }

          .register-focus-line {
            position: absolute;

            height: 1px;

            left: 15px;
            right: 15px;
            bottom: 0;

            border-radius: 999px;

            background:
              linear-gradient(
                90deg,
                #6366f1,
                #a855f7
              );

            transform:
              scaleX(0);

            transform-origin:
              center;

            transition:
              transform 0.3s ease;

            pointer-events: none;
          }

          /* =====================================
             BUTTON
          ===================================== */

          .register-button:hover:not(:disabled) {
            transform:
              translateY(-2px);

            box-shadow:
              0 17px 38px
              rgba(99,102,241,0.32);
          }

          .register-button:active:not(:disabled) {
            transform:
              translateY(0);
          }

          .register-button:disabled {
            cursor:
              not-allowed;
          }

          /* =====================================
             LOGIN LINK
          ===================================== */

          .register-link:hover {
            color:
              #c4b5fd !important;
          }

          /* =====================================
             MOBILE
          ===================================== */

          @media (max-width: 520px) {

            .register-page {
              padding:
                18px !important;
            }

            .register-card {
              padding:
                30px 22px !important;

              border-radius:
                20px !important;
            }

            .register-title {
              font-size:
                27px !important;
            }

          }
        `}
      </style>

      {/* ==========================================
          PAGE
      ========================================== */}

      <div className="register-page" style={styles.page}>
        {/* Background */}

        <div style={styles.glowOne} />

        <div style={styles.glowTwo} />

        <div style={styles.circleOne} />

        <div style={styles.circleTwo} />

        {/* ==========================================
            REGISTER CARD
        ========================================== */}

        <div className="register-card" style={styles.card}>
          {/* Logo */}

          <div style={styles.logoWrapper}>
            <div style={styles.logo}>S</div>
          </div>

          {/* Header */}

          <div style={styles.header}>
            <div style={styles.eyebrow}>SecureHub</div>

            <h1 className="register-title" style={styles.title}>
              Create account
            </h1>

            <p style={styles.subtitle}>Join SecureHub and get started</p>
          </div>

          {/* Error */}

          {error && <div style={styles.errorMessage}>{error}</div>}

          {/* Success */}

          {success && <div style={styles.successMessage}>{success}</div>}

          {/* ==========================================
              FORM
          ========================================== */}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Full Name */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>◉</span>

                <input
                  className="register-input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  style={styles.input}
                />

                <span className="register-focus-line" />
              </div>
            </div>

            {/* Email */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>@</span>

                <input
                  className="register-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  style={styles.input}
                />

                <span className="register-focus-line" />
              </div>
            </div>

            {/* Password */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>•••</span>

                <input
                  className="register-input"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={styles.input}
                />

                <span className="register-focus-line" />
              </div>
            </div>

            {/* Confirm Password */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm Password</label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>•••</span>

                <input
                  className="register-input"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={styles.input}
                />

                <span className="register-focus-line" />
              </div>
            </div>

            {/* Submit */}

            <button
              className="register-button"
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.65 : 1,
              }}
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}

              {!loading && (
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "14px",
                  }}
                >
                  →
                </span>
              )}
            </button>
          </form>

          {/* ==========================================
              LOGIN LINK
          ========================================== */}

          <div style={styles.footer}>
            Already have an account?
            <Link to="/login" className="register-link" style={styles.link}>
              Sign In
            </Link>
            <div style={styles.secureText}>
              <span style={styles.secureDot} />
              Secure authentication
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
