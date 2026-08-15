import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TopToBack from "./TopToBack";

/**
 * SecureHub — Landing Page
 * Palette derived from the SecureHub admin dashboard:
 *   bg: #0a0a10 / #0d0c16
 *   surface: #14131f / #1a1826
 *   violet: #7c3aed / #a78bfa
 *   pink: #e879f9
 *   green (active): #34d399
 *
 * Type:
 *   Space Grotesk — display
 *   Inter — body
 *   JetBrains Mono — labels/data
 */

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

const FEATURES = [
  {
    tag: "ACCESS",
    title: "Role-based permissions",
    body: "Define exactly what Admin, Manager, and User roles can see and touch. Every grant is scoped, reversible, and logged.",
    icon: <path d="M12 2l7 3v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V5l7-3z" />,
  },
  {
    tag: "VISIBILITY",
    title: "Live activity feed",
    body: "Every login, edit, and permission change streams into one timeline — searchable, exportable, tied to a real person.",
    icon: <path d="M3 12h4l2-7 4 14 2-7h6" />,
  },
  {
    tag: "ONBOARDING",
    title: "Instant provisioning",
    body: "Invite a teammate and they're working in under a minute. Deactivate one and access is revoked everywhere, immediately.",
    icon: <path d="M12 4v16m-8-8h16" />,
  },
  {
    tag: "PROOF",
    title: "Audit-ready trail",
    body: "A tamper-evident record of who changed what, and when — formatted for compliance reviews before anyone asks.",
    icon: <path d="M9 12l2 2 4-4M5 6h14M5 18h14" />,
  },
  {
    tag: "CONTROL",
    title: "Session management",
    body: "See every active session by device and location. End any of them from the dashboard the moment something looks off.",
    icon: <path d="M4 6h16v10H4zM8 20h8M12 16v4" />,
  },
  {
    tag: "IDENTITY",
    title: "SSO + 2FA built in",
    body: "SAML, OIDC, and hardware-key two-factor ship on day one, not as a later add-on tier.",
    icon: (
      <path d="M12 2a5 5 0 015 5v3h1a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9a1 1 0 011-1h1V7a5 5 0 015-5z" />
    ),
  },
];

const STEPS = [
  {
    n: "01",
    title: "Connect your team",
    body: "Import users from your identity provider or invite them by email. No agents, no scripts.",
  },
  {
    n: "02",
    title: "Configure the roles",
    body: "Set who's an Admin and who's a User in a couple of clicks — SecureHub applies it everywhere at once.",
  },
  {
    n: "03",
    title: "Watch the dashboard",
    body: "Status, access level, and activity update live. Anything unusual surfaces before it becomes a problem.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "/ up to 5 users",
    blurb: "For small teams getting access control right from the start.",
    features: [
      "5 team members",
      "Role-based access",
      "7-day activity log",
      "Email support",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Team",
    price: "$19",
    period: "/ user / month",
    blurb: "For growing teams that need real visibility and control.",
    features: [
      "Unlimited team members",
      "Full audit trail",
      "SSO + 2FA",
      "Session management",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    blurb: "For organizations with dedicated compliance and security needs.",
    features: [
      "Everything in Team",
      "SCIM provisioning",
      "Custom retention policy",
      "Dedicated success manager",
    ],
    cta: "Talk to sales",
    featured: false,
  },
];

function Icon({ children, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/**
 * Ambient access grid
 */
function AccessGrid() {
  const cols = 14;
  const rows = 8;
  const cells = Array.from({ length: cols * rows });

  return (
    <div className="sh-grid" aria-hidden="true">
      {cells.map((_, i) => {
        const delay = ((i * 37) % 600) / 100;
        const dur = 3 + ((i * 13) % 400) / 100;

        return (
          <span
            key={i}
            className="sh-cell"
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function DashboardPreview() {
  const rows = [
    {
      i: "MB",
      name: "Muhammad Bilal",
      role: "USER",
      active: true,
    },
    {
      i: "BK",
      name: "Bilal Khan",
      role: "USER",
      active: true,
    },
    {
      i: "A",
      name: "Admin",
      role: "ADMIN",
      active: true,
    },
    {
      i: "H",
      name: "Hamza",
      role: "USER",
      active: true,
    },
  ];

  return (
    <div className="sh-preview">
      <div className="sh-preview-head">
        <div className="sh-preview-dots">
          <span />
          <span />
          <span />
        </div>

        <span className="sh-mono sh-preview-path">
          securehub.app / overview
        </span>
      </div>

      <div className="sh-preview-stats">
        {[
          ["TOTAL USERS", "128"],
          ["ACTIVE", "121"],
          ["ADMINS", "4"],
          ["INACTIVE", "7"],
        ].map(([label, val]) => (
          <div className="sh-stat" key={label}>
            <span className="sh-mono sh-stat-label">{label}</span>
            <span className="sh-stat-val">{val}</span>
          </div>
        ))}
      </div>

      <div className="sh-preview-table">
        {rows.map((r) => (
          <div className="sh-preview-row" key={r.name}>
            <span className="sh-avatar">{r.i}</span>

            <span className="sh-row-name">{r.name}</span>

            <span
              className={`sh-pill ${r.role === "ADMIN" ? "sh-pill-admin" : ""}`}
            >
              {r.role}
            </span>

            <span className="sh-status">
              <span className="sh-dot" />
              Active
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const goToLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const goToRegister = () => {
    setMenuOpen(false);
    navigate("/register");
  };

  return (
    <div className="sh-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

        .sh-root,
        .sh-root * {
          box-sizing: border-box;
        }

        .sh-root {
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

          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .sh-root h1,
        .sh-root h2,
        .sh-root h3,
        .sh-root .sh-display {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.02em;
        }

        .sh-mono {
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .sh-grad-text {
          background: linear-gradient(
            100deg,
            var(--violet-light),
            var(--pink) 70%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .sh-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .sh-root a {
          color: inherit;
          text-decoration: none;
        }

        .sh-root button {
          font-family: inherit;
          cursor: pointer;
        }

        /* ---------- Buttons ---------- */

        .sh-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 10px;
          border: 1px solid transparent;
          transition:
            transform 0.15s ease,
            background 0.15s ease,
            border-color 0.15s ease,
            box-shadow 0.15s ease;
          white-space: nowrap;
        }

        .sh-btn:active {
          transform: translateY(1px);
        }

        .sh-btn-primary {
          background: linear-gradient(
            135deg,
            var(--violet),
            #9333ea
          );
          color: #fff;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06) inset,
            0 8px 24px -8px rgba(124,58,237,0.7);
        }

        .sh-btn-primary:hover {
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.1) inset,
            0 10px 28px -6px rgba(124,58,237,0.85);
        }

        .sh-btn-ghost {
          background: transparent;
          color: var(--text-dim);
          border-color: var(--border);
        }

        .sh-btn-ghost:hover {
          color: var(--text);
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.03);
        }

        .sh-btn-lg {
          padding: 13px 26px;
          font-size: 15px;
          border-radius: 12px;
        }

        .sh-btn-block {
          width: 100%;
        }

        /* ---------- Nav ---------- */

        .sh-nav {
          position: sticky;
          top: 0;
          z-index: 40;
          backdrop-filter: blur(14px);
          background: rgba(10,10,16,0.72);
          border-bottom: 1px solid var(--border-soft);
        }

        .sh-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .sh-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 17px;
        }

        .sh-logo-mark {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(
            135deg,
            var(--violet),
            var(--pink)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          color: #fff;
          font-size: 16px;
          box-shadow:
            0 6px 18px -4px rgba(124,58,237,0.75);
        }

        .sh-logo b {
          color: var(--violet-light);
          font-weight: 700;
        }

        .sh-nav-links {
          display: flex;
          gap: 34px;
          align-items: center;
        }

        .sh-nav-links a {
          font-size: 14px;
          color: var(--text-dim);
          transition: color 0.15s ease;
        }

        .sh-nav-links a:hover {
          color: var(--text);
        }

        .sh-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sh-burger {
          display: none;
          background: none;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px;
          color: var(--text);
        }

        .sh-mobile-panel {
          display: none;
          flex-direction: column;
          gap: 14px;
          padding: 18px 24px 24px;
          border-bottom: 1px solid var(--border-soft);
          background: var(--bg-alt);
        }

        .sh-mobile-panel a {
          padding: 8px 0;
          color: var(--text-dim);
          font-size: 15px;
          border-bottom: 1px solid var(--border-soft);
        }

        .sh-mobile-panel .sh-nav-actions {
          flex-direction: column;
          align-items: stretch;
          margin-top: 4px;
        }

        /* ---------- Hero ---------- */

        .sh-hero {
          position: relative;
          padding: 96px 0 70px;
          overflow: hidden;
        }

        .sh-hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
        }

        .sh-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          color: var(--violet-light);
          border: 1px solid var(--border);
          background: var(--violet-soft);
          padding: 6px 12px;
          border-radius: 999px;
          margin-bottom: 22px;
        }

        .sh-eyebrow .sh-dot {
          background: var(--green);
        }

        .sh-hero h1 {
          font-size: 52px;
          line-height: 1.05;
          font-weight: 700;
          margin: 0 0 22px;
        }

        .sh-hero p.sh-sub {
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-dim);
          max-width: 480px;
          margin: 0 0 32px;
        }

        .sh-hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 38px;
        }

        .sh-hero-meta {
          display: flex;
          gap: 26px;
          flex-wrap: wrap;
        }

        .sh-hero-meta div {
          font-family: 'JetBrains Mono', monospace;
        }

        .sh-hero-meta .num {
          font-size: 20px;
          font-weight: 600;
          color: var(--text);
          display: block;
        }

        .sh-hero-meta .lbl {
          font-size: 11px;
          color: var(--text-mute);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ---------- Access Grid ---------- */

        .sh-grid {
          position: absolute;
          inset: -40px -10% auto auto;
          top: -60px;
          right: -6%;
          width: 640px;
          height: 520px;
          display: grid;
          grid-template-columns: repeat(14, 1fr);
          grid-template-rows: repeat(8, 1fr);
          gap: 10px;
          opacity: 0.55;
          pointer-events: none;
          z-index: 1;

          mask-image: radial-gradient(
            circle at 65% 35%,
            black 0%,
            transparent 72%
          );

          -webkit-mask-image: radial-gradient(
            circle at 65% 35%,
            black 0%,
            transparent 72%
          );
        }

        .sh-cell {
          border-radius: 3px;
          background: var(--violet);
          opacity: 0.08;
          animation: sh-pulse 4s ease-in-out infinite;
        }

        @keyframes sh-pulse {
          0%,
          100% {
            opacity: 0.06;
          }

          50% {
            opacity: 0.5;
            background: var(--violet-light);
          }
        }

        /* ---------- Dashboard Preview ---------- */

        .sh-preview {
          position: relative;
          z-index: 2;
          background: linear-gradient(
            180deg,
            var(--surface),
            var(--surface-2)
          );
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 18px;
          box-shadow:
            0 30px 60px -30px rgba(0,0,0,0.7),
            0 0 0 1px rgba(255,255,255,0.02) inset;
        }

        .sh-preview-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 2px 4px 14px;
          border-bottom: 1px solid var(--border-soft);
          margin-bottom: 14px;
        }

        .sh-preview-dots {
          display: flex;
          gap: 6px;
        }

        .sh-preview-dots span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--border);
        }

        .sh-preview-path {
          font-size: 10.5px;
          color: var(--text-mute);
        }

        .sh-preview-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }

        .sh-stat {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-soft);
          border-radius: 10px;
          padding: 10px 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sh-stat-label {
          font-size: 8.5px;
          color: var(--text-mute);
        }

        .sh-stat-val {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 19px;
          font-weight: 700;
        }

        .sh-preview-table {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sh-preview-row {
          display: grid;
          grid-template-columns: 26px 1fr auto auto;
          align-items: center;
          gap: 10px;
          padding: 8px 8px;
          border-radius: 10px;
          background: rgba(255,255,255,0.015);
        }

        .sh-avatar {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: linear-gradient(
            135deg,
            var(--violet),
            var(--pink)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
        }

        .sh-row-name {
          font-size: 12.5px;
          color: var(--text-dim);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sh-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.06em;
          background: rgba(255,255,255,0.05);
          color: var(--text-dim);
          padding: 4px 8px;
          border-radius: 999px;
          border: 1px solid var(--border-soft);
        }

        .sh-pill-admin {
          background: var(--violet-soft);
          color: var(--violet-light);
          border-color: rgba(167,139,250,0.35);
        }

        .sh-status {
          font-size: 11px;
          color: var(--text-dim);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sh-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          display: inline-block;
        }

        /* ---------- Section shells ---------- */

        section {
          position: relative;
          padding: 88px 0;
        }

        .sh-section-head {
          max-width: 620px;
          margin: 0 0 52px;
        }

        .sh-section-head .sh-eyebrow {
          margin-bottom: 16px;
        }

        .sh-section-head h2 {
          font-size: 34px;
          margin: 0 0 14px;
        }

        .sh-section-head p {
          color: var(--text-dim);
          font-size: 15.5px;
          line-height: 1.6;
          margin: 0;
        }

        .sh-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--border),
            transparent
          );
          border: none;
        }

        /* ---------- Trust bar ---------- */

        .sh-trust {
          padding: 44px 0;
          border-top: 1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
        }

        .sh-trust-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 22px;
        }

        .sh-trust-label {
          font-size: 11px;
          color: var(--text-mute);
          white-space: nowrap;
        }

        .sh-trust-logos {
          display: flex;
          gap: 38px;
          flex-wrap: wrap;
        }

        .sh-trust-logos span {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: var(--text-mute);
          opacity: 0.75;
        }

        /* ---------- Features ---------- */

        .sh-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .sh-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 26px 24px;
          transition:
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        .sh-card:hover {
          border-color: rgba(167,139,250,0.4);
          transform: translateY(-3px);
        }

        .sh-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--violet-soft);
          color: var(--violet-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .sh-card .sh-mono {
          font-size: 10px;
          color: var(--text-mute);
          margin-bottom: 10px;
          display: block;
        }

        .sh-card h3 {
          font-size: 17px;
          margin: 0 0 10px;
        }

        .sh-card p {
          font-size: 14px;
          color: var(--text-dim);
          line-height: 1.6;
          margin: 0;
        }

        /* ---------- How it works ---------- */

        .sh-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
        }

        .sh-step {
          position: relative;
          padding: 0 22px;
        }

        .sh-step:first-child {
          padding-left: 0;
        }

        .sh-step:last-child {
          padding-right: 0;
        }

        .sh-step-n {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--violet-light);
          border: 1px solid var(--border);
          background: var(--surface);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .sh-step h3 {
          font-size: 18px;
          margin: 0 0 10px;
        }

        .sh-step p {
          color: var(--text-dim);
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        .sh-step-line {
          position: absolute;
          top: 20px;
          left: -18px;
          width: 36px;
          height: 1px;
          background: var(--border);
          display: none;
        }

        /* ---------- Testimonial ---------- */

        .sh-quote {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .sh-quote blockquote {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 27px;
          line-height: 1.45;
          font-weight: 500;
          margin: 0 0 26px;
        }

        .sh-quote cite {
          font-style: normal;
          color: var(--text-dim);
          font-size: 14px;
        }

        .sh-quote cite b {
          color: var(--text);
        }

        /* ---------- Pricing ---------- */

        .sh-plans {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .sh-plan {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
        }

        .sh-plan-featured {
          border-color: rgba(167,139,250,0.5);
          background: linear-gradient(
            180deg,
            rgba(124,58,237,0.12),
            var(--surface) 55%
          );
          position: relative;
        }

        .sh-plan-badge {
          position: absolute;
          top: -12px;
          right: 24px;
          background: linear-gradient(
            135deg,
            var(--violet),
            var(--pink)
          );
          font-size: 11px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 999px;
        }

        .sh-plan h3 {
          font-size: 18px;
          margin: 0 0 6px;
        }

        .sh-plan-price {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin: 6px 0 8px;
        }

        .sh-plan-price .amt {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 34px;
          font-weight: 700;
        }

        .sh-plan-price .per {
          font-size: 12.5px;
          color: var(--text-mute);
        }

        .sh-plan-blurb {
          font-size: 13.5px;
          color: var(--text-dim);
          margin: 0 0 22px;
          line-height: 1.5;
        }

        .sh-plan-list {
          list-style: none;
          margin: 0 0 26px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
          flex: 1;
        }

        .sh-plan-list li {
          font-size: 13.5px;
          color: var(--text-dim);
          display: flex;
          gap: 9px;
          align-items: flex-start;
        }

        .sh-plan-list li svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--green);
        }

        /* ---------- Final CTA ---------- */

        .sh-cta-band {
          background: linear-gradient(
            135deg,
            rgba(124,58,237,0.18),
            rgba(232,121,249,0.1)
          );
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 62px 48px;
          text-align: center;
        }

        .sh-cta-band h2 {
          font-size: 30px;
          margin: 0 0 12px;
        }

        .sh-cta-band p {
          color: var(--text-dim);
          font-size: 15px;
          margin: 0 0 28px;
        }

        .sh-cta-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ---------- Footer ---------- */

        .sh-footer {
          padding: 60px 0 32px;
          border-top: 1px solid var(--border-soft);
        }

        .sh-footer-top {
          display: grid;
          grid-template-columns: 1.4fr repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 46px;
        }

        .sh-footer-brand p {
          color: var(--text-mute);
          font-size: 13.5px;
          line-height: 1.6;
          max-width: 260px;
          margin-top: 14px;
        }

        .sh-footer-col h4 {
          font-size: 12px;
          color: var(--text-mute);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 16px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
        }

        .sh-footer-col a {
          display: block;
          font-size: 13.5px;
          color: var(--text-dim);
          margin-bottom: 12px;
        }

        .sh-footer-col a:hover {
          color: var(--text);
        }

        .sh-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 28px;
          border-top: 1px solid var(--border-soft);
          font-size: 12.5px;
          color: var(--text-mute);
        }

        .sh-footer-bottom .sh-social {
          display: flex;
          gap: 14px;
        }

        .sh-footer-bottom .sh-social a {
          color: var(--text-mute);
        }

        .sh-footer-bottom .sh-social a:hover {
          color: var(--violet-light);
        }

        /* ---------- Focus visibility ---------- */

        .sh-root a:focus-visible,
        .sh-root button:focus-visible {
          outline: 2px solid var(--violet-light);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-cell {
            animation: none;
            opacity: 0.15;
          }
        }

        /* ---------- Responsive ---------- */

        @media (max-width: 980px) {
          .sh-hero-inner {
            grid-template-columns: 1fr;
          }

          .sh-grid {
            display: none;
          }

          .sh-feat-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sh-steps {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .sh-step {
            padding: 0;
          }

          .sh-plans {
            grid-template-columns: 1fr;
          }

          .sh-footer-top {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 720px) {
          .sh-nav-links {
            display: none;
          }

          .sh-nav-actions.sh-desktop-only {
            display: none;
          }

          .sh-burger {
            display: inline-flex;
          }

          .sh-mobile-panel.open {
            display: flex;
          }

          .sh-hero {
            padding: 56px 0 48px;
          }

          .sh-hero h1 {
            font-size: 36px;
          }

          .sh-hero p.sh-sub {
            font-size: 15.5px;
          }

          .sh-feat-grid {
            grid-template-columns: 1fr;
          }

          .sh-trust-row {
            justify-content: flex-start;
          }

          section {
            padding: 60px 0;
          }

          .sh-section-head h2 {
            font-size: 26px;
          }

          .sh-quote blockquote {
            font-size: 21px;
          }

          .sh-cta-band {
            padding: 42px 24px;
          }

          .sh-footer-top {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .sh-preview-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .sh-preview-row {
            grid-template-columns: 26px 1fr auto;
          }

          .sh-status {
            display: none;
          }
        }
      `}</style>

      {/* ---------------- NAV ---------------- */}

      <header className="sh-nav">
        <div className="sh-wrap sh-nav-inner">
          <div className="sh-logo">
            <span className="sh-logo-mark">S</span>
            SECURE<b>HUB</b>
          </div>

          <nav className="sh-nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="sh-nav-actions sh-desktop-only">
            <button className="sh-btn sh-btn-ghost" onClick={goToLogin}>
              Log in
            </button>

            <button className="sh-btn sh-btn-primary" onClick={goToRegister}>
              Get started
            </button>
          </div>

          <button
            className="sh-burger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon>
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </Icon>
          </button>
        </div>

        <div className={`sh-mobile-panel ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}

          <div className="sh-nav-actions">
            <button
              className="sh-btn sh-btn-ghost sh-btn-block"
              onClick={goToLogin}
            >
              Log in
            </button>

            <button
              className="sh-btn sh-btn-primary sh-btn-block"
              onClick={goToRegister}
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}

      <section className="sh-hero" id="product">
        <AccessGrid />

        <div className="sh-wrap sh-hero-inner">
          <div>
            <span className="sh-eyebrow">
              <span
                className="sh-dot"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
              Identity &amp; access platform
            </span>

            <h1>
              Access control that thinks
              <br />
              like your <span className="sh-grad-text">security team</span>.
            </h1>

            <p className="sh-sub">
              SecureHub gives you one dashboard for every user, role, and login
              across your organization — so you always know who has access, and
              why.
            </p>

            <div className="sh-hero-actions">
              <button
                className="sh-btn sh-btn-primary sh-btn-lg"
                onClick={goToRegister}
              >
                Create free account
              </button>

              <button
                className="sh-btn sh-btn-ghost sh-btn-lg"
                onClick={goToLogin}
              >
                Log in
              </button>
            </div>

            <div className="sh-hero-meta">
              <div>
                <span className="num">128+</span>
                <span className="lbl">Users managed</span>
              </div>

              <div>
                <span className="num">99.98%</span>
                <span className="lbl">Uptime</span>
              </div>

              <div>
                <span className="num">&lt;1min</span>
                <span className="lbl">To provision</span>
              </div>
            </div>
          </div>

          <DashboardPreview />
        </div>
      </section>

      {/* ---------------- TRUST BAR ---------------- */}

      <div className="sh-trust">
        <div className="sh-wrap sh-trust-row">
          <span className="sh-trust-label sh-mono">
            Trusted by security-minded teams at
          </span>

          <div className="sh-trust-logos">
            <span>Northwind</span>
            <span>Fintra</span>
            <span>Loopwave</span>
            <span>Kestrel</span>
            <span>Verano</span>
          </div>
        </div>
      </div>

      {/* ---------------- FEATURES ---------------- */}

      <section id="features">
        <div className="sh-wrap">
          <div className="sh-section-head">
            <span className="sh-eyebrow">Platform</span>

            <h2>Everything access control needs, nothing it doesn't.</h2>

            <p>
              Six systems working together so you can answer "who can see this?"
              in seconds, not tickets.
            </p>
          </div>

          <div className="sh-feat-grid">
            {FEATURES.map((f) => (
              <div className="sh-card" key={f.title}>
                <div className="sh-card-icon">
                  <Icon>{f.icon}</Icon>
                </div>

                <span className="sh-mono">{f.tag}</span>

                <h3>{f.title}</h3>

                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="sh-divider" />

      {/* ---------------- HOW IT WORKS ---------------- */}

      <section id="how">
        <div className="sh-wrap">
          <div className="sh-section-head">
            <span className="sh-eyebrow">Set up</span>

            <h2>Live in three steps.</h2>

            <p>
              No infrastructure to stand up — SecureHub sits on top of the team
              you already have.
            </p>
          </div>

          <div className="sh-steps">
            {STEPS.map((s) => (
              <div className="sh-step" key={s.n}>
                <div className="sh-step-n">{s.n}</div>

                <h3>{s.title}</h3>

                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIAL ---------------- */}

      <section>
        <div className="sh-wrap sh-quote">
          <blockquote>
            "We replaced four spreadsheets and a Slack channel with SecureHub's
            dashboard. Offboarding someone now takes one click instead of an
            afternoon."
          </blockquote>

          <cite>
            <b>Aisha Raza</b> — Head of IT, Northwind Logistics
          </cite>
        </div>
      </section>

      <hr className="sh-divider" />

      {/* ---------------- PRICING ---------------- */}

      <section id="pricing">
        <div className="sh-wrap">
          <div className="sh-section-head">
            <span className="sh-eyebrow">Pricing</span>

            <h2>Plans that scale with your team.</h2>

            <p>
              Start free. Upgrade when you need audit trails, SSO, or dedicated
              support.
            </p>
          </div>

          <div className="sh-plans">
            {PLANS.map((p) => (
              <div
                className={`sh-plan ${p.featured ? "sh-plan-featured" : ""}`}
                key={p.name}
              >
                {p.featured && (
                  <span className="sh-plan-badge">Most popular</span>
                )}

                <h3>{p.name}</h3>

                <div className="sh-plan-price">
                  <span className="amt">{p.price}</span>

                  <span className="per">{p.period}</span>
                </div>

                <p className="sh-plan-blurb">{p.blurb}</p>

                <ul className="sh-plan-list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Icon size={16}>
                        <path d="M5 12l4 4 10-10" />
                      </Icon>

                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`sh-btn sh-btn-block ${
                    p.featured ? "sh-btn-primary" : "sh-btn-ghost"
                  }`}
                  onClick={goToRegister}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}

      <section>
        <div className="sh-wrap">
          <div className="sh-cta-band">
            <h2>Know who has access. Always.</h2>

            <p>
              Set up your first workspace in under five minutes — no credit card
              required.
            </p>

            <div className="sh-cta-actions">
              <button
                className="sh-btn sh-btn-primary sh-btn-lg"
                onClick={goToRegister}
              >
                Create free account
              </button>

              <button
                className="sh-btn sh-btn-ghost sh-btn-lg"
                onClick={goToLogin}
              >
                Log in to SecureHub
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}

      <footer className="sh-footer">
        <div className="sh-wrap">
          <div className="sh-footer-top">
            <div className="sh-footer-brand">
              <div className="sh-logo">
                <span className="sh-logo-mark">S</span>
                SECURE<b>HUB</b>
              </div>

              <p>
                One dashboard for identity, access, and activity — built for
                teams who take security seriously.
              </p>
            </div>

            <div className="sh-footer-col">
              <h4>Product</h4>

              <a href="#product">Overview</a>

              <a href="#features">Features</a>

              <a href="#pricing">Pricing</a>
            </div>

            <div className="sh-footer-col">
              <h4>Company</h4>

              <a href="#">About</a>

              <a href="#">Careers</a>

              <a href="#">Contact</a>
            </div>

            <div className="sh-footer-col">
              <h4>Legal</h4>

              <Link to="/privacy">Privacy</Link>

              <Link to="/Terms">Terms</Link>

              <a href="#">Security</a>
            </div>
          </div>

          <div className="sh-footer-bottom">
            <span>
              © {new Date().getFullYear()} SecureHub. All rights reserved.
            </span>

            <div className="sh-social">
              <a href="#" aria-label="Twitter">
                Twitter
              </a>

              <a href="#" aria-label="GitHub">
                GitHub
              </a>

              <a href="#" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
      <TopToBack />
    </div>
  );
}
