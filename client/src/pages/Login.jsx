import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  },

  /* Background glow */

  glowOne: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "rgba(99,102,241,0.10)",
    filter: "blur(100px)",
    top: "-180px",
    left: "-120px",
    animation: "loginFloatOne 8s ease-in-out infinite",
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
    animation: "loginFloatTwo 10s ease-in-out infinite",
    pointerEvents: "none",
  },

  /* Decorative circles */

  circleOne: {
    position: "absolute",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "1px solid rgba(129,140,248,0.08)",
    top: "15%",
    left: "10%",
    animation: "rotateSlow 15s linear infinite",
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
    animation: "rotateSlow 20s linear infinite reverse",
    pointerEvents: "none",
  },

  /* Main card */

  card: {
    width: "100%",
    maxWidth: "430px",
    position: "relative",
    zIndex: 2,
    padding: "42px",
    borderRadius: "24px",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
    border: "1px solid rgba(255,255,255,0.09)",
    boxShadow: "0 30px 90px rgba(0,0,0,0.55), 0 0 60px rgba(99,102,241,0.06)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    boxSizing: "border-box",
    animation: "loginCardEnter 0.7s ease both",
  },

  /* Logo */

  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "25px",
  },

  logo: {
    width: "58px",
    height: "58px",
    borderRadius: "17px",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
    fontSize: "23px",
    fontWeight: "800",
    boxShadow: "0 15px 40px rgba(99,102,241,0.35)",
    animation: "logoPulse 3s ease-in-out infinite",
  },

  /* Header */

  header: {
    textAlign: "center",
    marginBottom: "32px",
  },

  eyebrow: {
    color: "#818cf8",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "-0.04em",
    background: "linear-gradient(90deg, #ffffff, #c7d2fe, #d8b4fe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    margin: "10px 0 0",
    color: "#71717a",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  /* Error */

  errorMessage: {
    background: "rgba(239,68,68,0.07)",
    border: "1px solid rgba(239,68,68,0.18)",
    color: "#fca5a5",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "11px",
    marginBottom: "22px",
    textAlign: "center",
    animation: "errorEnter 0.3s ease both",
  },

  /* Form */

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "21px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    color: "#a1a1aa",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    paddingLeft: "10px",
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
    fontSize: "14px",
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    height: "50px",
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

  /* Button */

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

  /* Footer */

  footer: {
    marginTop: "27px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    textAlign: "center",
    color: "#52525b",
    fontSize: "10px",
  },

  secureText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    marginTop: "8px",
    color: "#52525b",
  },

  secureDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#4ade80",
    boxShadow: "0 0 10px rgba(74,222,128,0.7)",
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
      console.error("LOGIN ERROR:", err);

      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes loginCardEnter {
            from {
              opacity: 0;
              transform: translateY(25px) scale(0.97);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes loginFloatOne {
            0%, 100% {
              transform: translate(0, 0);
            }

            50% {
              transform: translate(35px, 25px);
            }
          }

          @keyframes loginFloatTwo {
            0%, 100% {
              transform: translate(0, 0);
            }

            50% {
              transform: translate(-30px, -25px);
            }
          }

          @keyframes rotateSlow {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes logoPulse {
            0%, 100% {
              box-shadow:
                0 15px 40px rgba(99,102,241,0.25);
            }

            50% {
              box-shadow:
                0 15px 55px rgba(168,85,247,0.45);
            }
          }

          @keyframes errorEnter {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .login-input::placeholder {
            color: #3f3f46;
          }

          .login-input:focus {
            border-color: rgba(129,140,248,0.55) !important;

            background: rgba(99,102,241,0.035) !important;

            box-shadow:
              0 0 0 3px rgba(99,102,241,0.08),
              0 0 25px rgba(99,102,241,0.08);
          }

          .login-input:focus + .input-focus-line {
            transform: scaleX(1);
          }

          .input-focus-line {
            position: absolute;
            height: 1px;
            left: 15px;
            right: 15px;
            bottom: 0;
            border-radius: 999px;
            background: linear-gradient(
              90deg,
              #6366f1,
              #a855f7
            );
            transform: scaleX(0);
            transform-origin: center;
            transition: transform 0.3s ease;
            pointer-events: none;
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow:
              0 17px 38px rgba(99,102,241,0.32);
          }

          .login-button:active:not(:disabled) {
            transform: translateY(0);
          }

          .login-button:disabled {
            cursor: not-allowed;
          }

          @media (max-width: 520px) {
            .login-page {
              padding: 18px !important;
            }

            .login-card {
              padding: 32px 24px !important;
              border-radius: 20px !important;
            }

            .login-title {
              font-size: 27px !important;
            }
          }
        `}
      </style>

      <div className="login-page" style={styles.page}>
        {/* Background glow */}

        <div style={styles.glowOne} />

        <div style={styles.glowTwo} />

        {/* Decorative circles */}

        <div style={styles.circleOne} />

        <div style={styles.circleTwo} />

        {/* Login Card */}

        <div className="login-card" style={styles.card}>
          {/* Logo */}

          <div style={styles.logoWrapper}>
            <div style={styles.logo}>S</div>
          </div>

          {/* Header */}

          <div style={styles.header}>
            <div style={styles.eyebrow}>SecureHub</div>

            <h1 className="login-title" style={styles.title}>
              Welcome back
            </h1>

            <p style={styles.subtitle}>Sign in to access your dashboard</p>
          </div>

          {/* Error */}

          {error && <div style={styles.errorMessage}>{error}</div>}

          {/* Form */}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>@</span>

                <input
                  className="login-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  style={styles.input}
                />

                <span className="input-focus-line" />
              </div>
            </div>

            {/* Password */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>

              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>•••</span>

                <input
                  className="login-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={styles.input}
                />

                <span className="input-focus-line" />
              </div>
            </div>

            {/* Sign In */}

            <button
              className="login-button"
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.65 : 1,
              }}
            >
              {loading ? (
                <>AUTHENTICATING...</>
              ) : (
                <>
                  SIGN IN
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "14px",
                    }}
                  >
                    →
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}

          <div style={styles.footer}>
            Secure authentication
            <div style={styles.secureText}>
              <span style={styles.secureDot} />
              Your connection is protected
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
