import React from "react";
import { Link } from "react-router-dom";
import TopToBack from "../components/TopToBack";

export default function Privacy() {
  return (
    <div className="privacy-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

        * {
          box-sizing: border-box;
        }

        .privacy-page {
          --bg: #0a0a10;
          --bg-alt: #0d0c16;
          --surface: #131220;
          --surface-2: #191728;
          --border: rgba(255,255,255,0.09);
          --border-soft: rgba(255,255,255,0.06);
          --violet: #7c3aed;
          --violet-light: #a78bfa;
          --violet-soft: rgba(124,58,237,0.16);
          --pink: #e879f9;
          --green: #34d399;
          --text: #f4f3f9;
          --text-dim: #b9b7c7;
          --text-mute: #83808f;

          min-height: 100vh;
          background:
            radial-gradient(
              circle at 80% 10%,
              rgba(124,58,237,0.12),
              transparent 32%
            ),
            var(--bg);
          color: var(--text);
          font-family: "Inter", sans-serif;
        }

        .privacy-page h1,
        .privacy-page h2,
        .privacy-page h3 {
          font-family: "Space Grotesk", sans-serif;
          letter-spacing: -0.02em;
        }

        .privacy-page a {
          color: inherit;
          text-decoration: none;
        }

        .privacy-container {
          width: min(100% - 40px, 1000px);
          margin: 0 auto;
        }

        /* Navbar */

        .privacy-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          height: 72px;
          border-bottom: 1px solid var(--border-soft);
          background: rgba(10,10,16,0.78);
          backdrop-filter: blur(14px);
        }

        .privacy-nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .privacy-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 17px;
          font-weight: 700;
        }

        .privacy-logo-mark {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            var(--violet),
            var(--pink)
          );
          box-shadow:
            0 6px 18px -4px rgba(124,58,237,0.75);
        }

        .privacy-logo b {
          color: var(--violet-light);
        }

        .privacy-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 15px;
          border: 1px solid var(--border);
          border-radius: 9px;
          color: var(--text-dim);
          font-size: 13px;
          transition: 0.2s ease;
        }

        .privacy-back:hover {
          color: var(--text);
          border-color: rgba(167,139,250,0.4);
          background: rgba(255,255,255,0.03);
        }

        /* Header */

        .privacy-header {
          padding: 90px 0 55px;
          text-align: center;
          border-bottom: 1px solid var(--border-soft);
        }

        .privacy-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 13px;
          margin-bottom: 20px;
          border-radius: 999px;
          border: 1px solid rgba(167,139,250,0.25);
          background: var(--violet-soft);
          color: var(--violet-light);
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .privacy-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
        }

        .privacy-header h1 {
          margin: 0 0 15px;
          font-size: 48px;
          line-height: 1.1;
        }

        .privacy-gradient {
          background: linear-gradient(
            100deg,
            var(--violet-light),
            var(--pink)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .privacy-header p {
          max-width: 650px;
          margin: 0 auto;
          color: var(--text-dim);
          font-size: 15px;
          line-height: 1.7;
        }

        .privacy-updated {
          margin-top: 16px !important;
          color: var(--text-mute) !important;
          font-size: 12px !important;
          font-family: "JetBrains Mono", monospace;
        }

        /* Content */

        .privacy-content {
          padding: 65px 0 90px;
        }

        .privacy-card {
          background:
            linear-gradient(
              180deg,
              rgba(19,18,32,0.95),
              rgba(25,23,40,0.8)
            );
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 42px;
          box-shadow:
            0 30px 70px -45px rgba(0,0,0,0.8);
        }

        .privacy-section {
          padding: 0 0 34px;
          margin-bottom: 34px;
          border-bottom: 1px solid var(--border-soft);
        }

        .privacy-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .privacy-section h2 {
          margin: 0 0 14px;
          font-size: 22px;
        }

        .privacy-section h2 span {
          color: var(--violet-light);
          margin-right: 8px;
          font-family: "JetBrains Mono", monospace;
          font-size: 13px;
        }

        .privacy-section p {
          margin: 0 0 13px;
          color: var(--text-dim);
          font-size: 14px;
          line-height: 1.8;
        }

        .privacy-section p:last-child {
          margin-bottom: 0;
        }

        .privacy-section ul {
          margin: 12px 0 0;
          padding-left: 22px;
          color: var(--text-dim);
        }

        .privacy-section li {
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 1.7;
        }

        .privacy-section li::marker {
          color: var(--violet-light);
        }

        .privacy-highlight {
          margin-top: 18px;
          padding: 18px;
          border-radius: 12px;
          border: 1px solid rgba(124,58,237,0.22);
          background: rgba(124,58,237,0.08);
        }

        .privacy-highlight p {
          margin: 0;
        }

        .privacy-email {
          color: var(--violet-light);
          font-weight: 600;
        }

        /* Footer */

        .privacy-footer {
          border-top: 1px solid var(--border-soft);
          padding: 30px 0;
        }

        .privacy-footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .privacy-footer p {
          margin: 0;
          color: var(--text-mute);
          font-size: 12px;
        }

        .privacy-footer-links {
          display: flex;
          gap: 20px;
        }

        .privacy-footer-links a {
          color: var(--text-mute);
          font-size: 12px;
        }

        .privacy-footer-links a:hover {
          color: var(--violet-light);
        }

        @media (max-width: 700px) {
          .privacy-container {
            width: min(100% - 28px, 1000px);
          }

          .privacy-header {
            padding: 65px 0 45px;
          }

          .privacy-header h1 {
            font-size: 36px;
          }

          .privacy-card {
            padding: 27px 22px;
          }

          .privacy-content {
            padding: 40px 0 60px;
          }

          .privacy-section h2 {
            font-size: 19px;
          }

          .privacy-footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <header className="privacy-nav">
        <div className="privacy-container privacy-nav-inner">
          <Link to="/" className="privacy-logo">
            <span className="privacy-logo-mark">S</span>
            SECURE<b>HUB</b>
          </Link>

          <Link to="/" className="privacy-back">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* HEADER */}
      <header className="privacy-header">
        <div className="privacy-container">
          <div className="privacy-badge">
            <span className="privacy-badge-dot" />
            Privacy & Security
          </div>

          <h1>
            Privacy <span className="privacy-gradient">Policy</span>
          </h1>

          <p>
            At SecureHub, we respect your privacy and are committed to
            protecting the information you trust us with. This Privacy Policy
            explains what information we collect, how we use it, and how we
            protect it.
          </p>

          <p className="privacy-updated">Last updated: August 14, 2026</p>
        </div>
      </header>

      {/* CONTENT */}
      <main className="privacy-content">
        <div className="privacy-container">
          <div className="privacy-card">
            {/* 01 */}
            <section className="privacy-section">
              <h2>
                <span>01</span>
                Information We Collect
              </h2>

              <p>
                When you use SecureHub, we may collect information necessary to
                provide and improve our services.
              </p>

              <ul>
                <li>
                  Account information such as your name and email address.
                </li>
                <li>
                  Authentication information required to secure your account.
                </li>
                <li>Organization, role, and access-control information.</li>
                <li>
                  Activity and security events generated while using SecureHub.
                </li>
                <li>
                  Device, browser, IP address, and technical information used to
                  maintain security and reliability.
                </li>
              </ul>
            </section>

            {/* 02 */}
            <section className="privacy-section">
              <h2>
                <span>02</span>
                How We Use Your Information
              </h2>

              <p>
                We use collected information only for legitimate business and
                service purposes, including:
              </p>

              <ul>
                <li>Creating and managing your SecureHub account.</li>
                <li>Authenticating users and protecting accounts.</li>
                <li>Managing roles and permissions.</li>
                <li>Maintaining activity and audit logs.</li>
                <li>Detecting suspicious or unauthorized activity.</li>
                <li>Improving SecureHub features and performance.</li>
                <li>
                  Providing customer support and important service updates.
                </li>
              </ul>
            </section>

            {/* 03 */}
            <section className="privacy-section">
              <h2>
                <span>03</span>
                Information Security
              </h2>

              <p>
                SecureHub is designed with security in mind. We use reasonable
                technical and organizational safeguards to protect information
                against unauthorized access, alteration, disclosure, or
                destruction.
              </p>

              <p>
                Security measures may include authentication controls, encrypted
                connections, access restrictions, monitoring, and activity
                logging.
              </p>
            </section>

            {/* 04 */}
            <section className="privacy-section">
              <h2>
                <span>04</span>
                Cookies and Similar Technologies
              </h2>

              <p>
                SecureHub may use cookies or similar technologies to maintain
                sessions, remember preferences, improve functionality, and
                understand how the service is used.
              </p>

              <p>
                You can control cookies through your browser settings. Disabling
                certain cookies may affect some functionality of the service.
              </p>
            </section>

            {/* 05 */}
            <section className="privacy-section">
              <h2>
                <span>05</span>
                Data Sharing
              </h2>

              <p>
                We do not sell your personal information. We may share
                information only when reasonably necessary to operate SecureHub,
                comply with legal obligations, or protect the security and
                rights of our users and organization.
              </p>

              <ul>
                <li>Service providers that help operate our infrastructure.</li>
                <li>
                  Authorities when disclosure is required by applicable law.
                </li>
                <li>
                  Relevant parties when necessary to prevent fraud, abuse, or
                  security threats.
                </li>
              </ul>
            </section>

            {/* 06 */}
            <section className="privacy-section">
              <h2>
                <span>06</span>
                Data Retention
              </h2>

              <p>
                We retain information for as long as reasonably necessary to
                provide SecureHub, maintain security records, meet contractual
                obligations, resolve disputes, and comply with applicable legal
                requirements.
              </p>

              <p>
                When information is no longer required, we may securely delete
                or anonymize it.
              </p>
            </section>

            {/* 07 */}
            <section className="privacy-section">
              <h2>
                <span>07</span>
                Your Rights
              </h2>

              <p>
                Depending on applicable laws, you may have rights regarding your
                personal information, including the ability to:
              </p>

              <ul>
                <li>Request access to personal information we hold.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of certain information.</li>
                <li>Object to or restrict certain processing.</li>
                <li>Request a copy of certain information.</li>
              </ul>
            </section>

            {/* 08 */}
            <section className="privacy-section">
              <h2>
                <span>08</span>
                Account Responsibilities
              </h2>

              <p>
                You are responsible for keeping your account credentials
                confidential and for notifying SecureHub if you believe your
                account has been compromised.
              </p>

              <p>
                Do not share passwords or authentication credentials with
                unauthorized individuals.
              </p>
            </section>

            {/* 09 */}
            <section className="privacy-section">
              <h2>
                <span>09</span>
                Third-Party Services
              </h2>

              <p>
                SecureHub may integrate with third-party services such as
                identity providers, authentication platforms, analytics
                services, or infrastructure providers.
              </p>

              <p>
                Information shared with third-party services is subject to their
                respective privacy policies and terms.
              </p>
            </section>

            {/* 10 */}
            <section className="privacy-section">
              <h2>
                <span>10</span>
                Children's Privacy
              </h2>

              <p>
                SecureHub is intended for business and professional use. We do
                not knowingly collect personal information from children where
                such collection is prohibited by applicable law.
              </p>
            </section>

            {/* 11 */}
            <section className="privacy-section">
              <h2>
                <span>11</span>
                Changes to This Policy
              </h2>

              <p>
                We may update this Privacy Policy from time to time as our
                services, security practices, or legal requirements change.
              </p>

              <p>
                When significant changes are made, we may provide an appropriate
                notice through SecureHub or other available communication
                channels.
              </p>
            </section>

            {/* 12 */}
            <section className="privacy-section">
              <h2>
                <span>12</span>
                Contact Us
              </h2>

              <p>
                If you have questions, concerns, or requests regarding this
                Privacy Policy or your personal information, please contact the
                SecureHub team.
              </p>

              <div className="privacy-highlight">
                <p>
                  Privacy inquiries:{" "}
                  <span className="privacy-email">privacy@securehub.com</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="privacy-footer">
        <div className="privacy-container privacy-footer-inner">
          <p>© {new Date().getFullYear()} SecureHub. All rights reserved.</p>

          <div className="privacy-footer-links">
            <Link to="/">Home</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </footer>
      <TopToBack />
    </div>
  );
}
