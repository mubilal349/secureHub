import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TopToBack() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        .sh-top-back {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 999;

          width: 46px;
          height: 46px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(167,139,250,0.35);
          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              rgba(124,58,237,0.95),
              rgba(147,51,234,0.95)
            );

          color: white;

          box-shadow:
            0 12px 30px rgba(124,58,237,0.35),
            0 0 0 1px rgba(255,255,255,0.05) inset;

          cursor: pointer;

          opacity: 0;
          visibility: hidden;
          transform: translateY(15px);

          transition:
            opacity 0.25s ease,
            visibility 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.2s ease;
        }

        .sh-top-back.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .sh-top-back:hover {
          box-shadow:
            0 16px 36px rgba(124,58,237,0.5),
            0 0 0 1px rgba(255,255,255,0.1) inset;

          transform: translateY(-3px);
        }

        .sh-top-back:active {
          transform: translateY(0);
        }

        .sh-top-back svg {
          width: 20px;
          height: 20px;
        }

        .sh-back-home {
          position: fixed;
          left: 24px;
          top: 24px;
          z-index: 999;

          display: none;
          align-items: center;
          gap: 8px;

          padding: 10px 15px;

          border-radius: 10px;

          background: rgba(19,18,32,0.88);
          border: 1px solid rgba(255,255,255,0.09);

          color: #b9b7c7;

          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 600;

          text-decoration: none;

          backdrop-filter: blur(12px);

          transition:
            color 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }

        .sh-back-home:hover {
          color: #f4f3f9;

          border-color: rgba(167,139,250,0.4);

          background: rgba(25,23,40,0.95);

          transform: translateX(-2px);
        }

        .sh-back-home svg {
          width: 16px;
          height: 16px;
          color: #a78bfa;
        }

        @media (max-width: 600px) {
          .sh-top-back {
            right: 16px;
            bottom: 16px;
            width: 42px;
            height: 42px;
          }

          .sh-back-home {
            left: 16px;
            top: 16px;
            padding: 9px 12px;
            font-size: 12px;
          }
        }
      `}</style>

      {/* Back to Landing Page */}
      <Link to="/" className="sh-back-home">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to SecureHub
      </Link>

      {/* Back to Top */}
      <button
        type="button"
        className={`sh-top-back ${show ? "show" : ""}`}
        onClick={goTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
