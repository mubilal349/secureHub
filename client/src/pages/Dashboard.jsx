import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
}

.dashboard {
  min-height: 100vh;
  background:
    radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.16), transparent 28%),
    radial-gradient(circle at 90% 20%, rgba(168, 85, 247, 0.13), transparent 28%),
    radial-gradient(circle at 50% 100%, rgba(14, 165, 233, 0.08), transparent 30%),
    #050509;
  color: #fff;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  display: flex;
  overflow-x: hidden;
  min-height: 100vh;
}

.dashboard::before {
  content: "";
  position: fixed;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.08);
  filter: blur(100px);
  top: -150px;
  left: 20%;
  pointer-events: none;
  animation: floatGlow 8s ease-in-out infinite;
}

.dashboard::after {
  content: "";
  position: fixed;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.06);
  filter: blur(100px);
  bottom: -100px;
  right: 5%;
  pointer-events: none;
  animation: floatGlow 10s ease-in-out infinite reverse;
}

@keyframes floatGlow {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(30px, -25px, 0);
  }
}

/* ==========================================
   SIDEBAR
========================================== */

.sidebar {
  width: 250px;
  min-height: 100vh;
  padding: 28px 18px;
  background: rgba(9, 9, 15, 0.78);
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

/* Sidebar header */

.sidebarHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 45px;
  margin-bottom: 28px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 8px;
}

.logoIcon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.35);
  animation: logoPulse 3s ease-in-out infinite;
}

@keyframes logoPulse {
  0%,
  100% {
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.25);
  }

  50% {
    box-shadow: 0 10px 40px rgba(168, 85, 247, 0.45);
  }
}

.logoText {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.logoText span {
  color: #818cf8;
}

/* Close button */

.closeSidebar {
  display: none;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #a1a1aa;
  border-radius: 9px;
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
  transition: all 0.25s ease;
}

.closeSidebar:hover {
  color: #fff;
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.25);
  transform: rotate(90deg);
}

.sidebarLabel {
  color: #52525b;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  padding: 0 12px 10px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.navItem {
  width: 100%;
  border: 0;
  background: transparent;
  color: #8b8b98;
  padding: 12px 13px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.25s ease;
}

.navItem:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(3px);
}

.navItem.active {
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(99, 102, 241, 0.2),
    rgba(168, 85, 247, 0.08)
  );
  border: 1px solid rgba(129, 140, 248, 0.16);
}

.navIcon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.04);
}

.navItem.active .navIcon {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.sidebarBottom {
  margin-top: auto;
}

.logoutSide {
  color: #f87171;
}

.logoutSide:hover {
  background: rgba(239, 68, 68, 0.08);
}

/* ==========================================
   MOBILE OVERLAY
========================================== */

.sidebarOverlay {
  display: none;
}

/* ==========================================
   MAIN
========================================== */

.main {
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
}

/* ==========================================
   TOP BAR
========================================== */

.topbar {
  height: 76px;
  padding: 0 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(5, 5, 9, 0.55);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 15;
}

.breadcrumb {
  color: #71717a;
  font-size: 12px;
}

.breadcrumb strong {
  color: #d4d4d8;
}

.topRight {
  display: flex;
  align-items: center;
  gap: 18px;
}

.notification {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.035);
  color: #a1a1aa;
  cursor: pointer;
  position: relative;
  transition: all 0.25s ease;
}

.notification:hover {
  color: #fff;
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.07);
}

.notificationDot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #818cf8;
  box-shadow: 0 0 10px #818cf8;
}

.profileMini {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
}

.profileName {
  font-size: 12px;
  font-weight: 600;
}

.profileRole {
  color: #71717a;
  font-size: 10px;
  margin-top: 2px;
}

/* Mobile hamburger */

.mobileMenu {
  display: none;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 19px;
  transition: all 0.25s ease;
}

.mobileMenu:hover {
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(129, 140, 248, 0.25);
}

/* ==========================================
   PROFILE IMAGE
========================================== */

.topAvatarWrapper {
  position: relative;
  width: 38px;
  height: 38px;
}

.topProfileImage {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
}

.profileImageWrapper {
  position: relative;
  width: 68px;
  height: 68px;
  flex-shrink: 0;
}

.profileImage {
  width: 68px;
  height: 68px;
  border-radius: 20px;
  object-fit: cover;
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 15px 35px rgba(99, 102, 241, 0.3);
}

.profileImageEdit {
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 27px;
  height: 27px;
  border-radius: 9px;
  border: 2px solid #050509;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.25s ease;
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.35);
}

.profileImageEdit:hover {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: 0 8px 22px rgba(168, 85, 247, 0.5);
}

.profileImageInput {
  display: none;
}

/* ==========================================
   CONTENT
========================================== */

.content {
  max-width: 1450px;
  margin: 0 auto;
  padding: 40px;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  animation: fadeUp 0.55s ease both;
}

.heroEyebrow {
  color: #818cf8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.heroTitle {
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.05;
  letter-spacing: -0.045em;
  margin: 0;
  font-weight: 800;
}

.heroTitle span {
  background: linear-gradient(90deg, #fff, #a5b4fc, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.heroSubtitle {
  margin: 12px 0 0;
  color: #71717a;
  font-size: 13px;
}

.statusPill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.07);
  border: 1px solid rgba(34, 197, 94, 0.15);
  color: #86efac;
  font-size: 11px;
  font-weight: 600;
}

.statusDot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.9);
  animation: statusPulse 1.8s infinite;
}

@keyframes statusPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(0.7);
    opacity: 0.55;
  }
}

/* ==========================================
   STAT CARDS
========================================== */

.statsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 28px;
}

.statCard {
  position: relative;
  overflow: hidden;
  min-height: 150px;
  padding: 22px;
  border-radius: 18px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.065),
    rgba(255, 255, 255, 0.018)
  );
  border: 1px solid rgba(255, 255, 255, 0.075);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  animation: fadeUp 0.6s ease both;
}

.statCard:nth-child(2) {
  animation-delay: 0.08s;
}

.statCard:nth-child(3) {
  animation-delay: 0.16s;
}

.statCard:nth-child(4) {
  animation-delay: 0.24s;
}

.statCard:hover {
  transform: translateY(-6px);
  border-color: rgba(129, 140, 248, 0.28);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.statCard::after {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  right: -50px;
  bottom: -55px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.13);
  filter: blur(20px);
}

.statTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statIcon {
  width: 39px;
  height: 39px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: rgba(129, 140, 248, 0.11);
  color: #a5b4fc;
  font-size: 17px;
}

.statLabel {
  color: #71717a;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.statValue {
  margin-top: 18px;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.statDescription {
  color: #52525b;
  font-size: 10px;
  margin-top: 5px;
}

/* ==========================================
   PROFILE PANEL
========================================== */

.profilePanel {
  margin-bottom: 25px;
  padding: 25px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 25px;
  border: 1px solid rgba(255, 255, 255, 0.075);
  border-radius: 20px;
  background:
    linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.1),
      rgba(255, 255, 255, 0.025)
    ),
    rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  animation: fadeUp 0.5s ease both;
}

.profileHero {
  display: flex;
  align-items: center;
  gap: 18px;
}

.profileBigAvatar {
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  border-radius: 20px;
  display: grid;
  place-items: center;
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  box-shadow: 0 15px 35px rgba(99, 102, 241, 0.3);
}

.profileHero h2 {
  margin: 0;
  font-size: 20px;
}

.profileHero p {
  margin: 6px 0 0;
  color: #71717a;
  font-size: 12px;
}

.profileDetails {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.detail {
  padding: 13px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.detailLabel {
  display: block;
  color: #52525b;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

.detailValue {
  color: #d4d4d8;
  font-size: 11px;
  font-weight: 600;
  word-break: break-word;
}

.roleBadge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(129, 140, 248, 0.12);
  color: #a5b4fc;
  font-size: 9px;
  text-transform: uppercase;
  font-weight: 700;
}

/* ==========================================
   GLASS PANEL
========================================== */

.panel {
  border: 1px solid rgba(255, 255, 255, 0.075);
  background: rgba(255, 255, 255, 0.025);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  overflow: hidden;
  animation: fadeUp 0.65s ease both;
}

.panelHeader {
  padding: 23px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.panelTitle {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.panelSubtitle {
  margin: 5px 0 0;
  color: #66666f;
  font-size: 11px;
}

.refreshButton {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  background: rgba(99, 102, 241, 0.09);
  color: #a5b4fc;
  padding: 9px 13px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  transition: all 0.25s ease;
}

.refreshButton:hover {
  background: rgba(99, 102, 241, 0.18);
  transform: translateY(-2px);
}

.refreshButton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refreshIcon {
  display: inline-block;
}

.refreshIcon.spinning {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ==========================================
   TABLE
========================================== */

.tableWrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.table th {
  padding: 13px 20px;
  text-align: left;
  color: #52525b;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.12);
}

.table td {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.045);
  color: #a1a1aa;
  font-size: 11px;
}

.table tbody tr {
  transition: all 0.25s ease;
  animation: rowEnter 0.45s ease both;
}

.table tbody tr:hover {
  background: rgba(129, 140, 248, 0.045);
}

@keyframes rowEnter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.userCell {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e4e4e7;
  font-weight: 600;
}

.tableAvatar {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  background: rgba(129, 140, 248, 0.12);
  color: #a5b4fc;
  font-size: 10px;
  font-weight: 700;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 600;
}

.status.active {
  background: rgba(34, 197, 94, 0.08);
  color: #86efac;
}

.status.inactive {
  background: rgba(239, 68, 68, 0.08);
  color: #fca5a5;
}

.statusIndicator {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.actions {
  display: flex;
  gap: 7px;
}

.actionButton {
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.035);
  color: #a1a1aa;
  padding: 7px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  transition: all 0.2s ease;
}

.actionButton:hover {
  transform: translateY(-2px);
}

.editButton:hover {
  color: #a5b4fc;
  border-color: rgba(129, 140, 248, 0.3);
  background: rgba(99, 102, 241, 0.08);
}

.deleteButton:hover {
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.08);
}

/* ==========================================
   ALERTS
========================================== */

.alert {
  margin: 18px 20px 0;
  padding: 12px 14px;
  border-radius: 11px;
  font-size: 11px;
  animation: alertIn 0.3s ease both;
}

@keyframes alertIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.07);
  border: 1px solid rgba(239, 68, 68, 0.15);
}

.success {
  color: #86efac;
  background: rgba(34, 197, 94, 0.07);
  border: 1px solid rgba(34, 197, 94, 0.15);
}

/* ==========================================
   LOADING
========================================== */

.loading {
  min-height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #52525b;
  font-size: 11px;
}

.loadingSpinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-top-color: #818cf8;
  border-radius: 50%;
  margin-right: 10px;
  animation: spin 0.8s linear infinite;
}

.empty {
  padding: 55px 20px;
  text-align: center;
  color: #52525b;
  font-size: 12px;
}

/* ==========================================
   FADE
========================================== */

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==========================================
   TABLET
========================================== */

@media (max-width: 1100px) {
  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .profilePanel {
    grid-template-columns: 1fr;
  }
}

/* ==========================================
   MOBILE
========================================== */

@media (max-width: 800px) {

  .sidebar {
    transform: translateX(-105%);
    box-shadow: 20px 0 60px rgba(0, 0, 0, 0.45);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .closeSidebar {
    display: grid;
    place-items: center;
  }

  .sidebarOverlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.62);
    backdrop-filter: blur(4px);
    z-index: 40;
    animation: overlayIn 0.25s ease both;
  }

  @keyframes overlayIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .main {
    margin-left: 0;
    width: 100%;
  }

  .mobileMenu {
    display: grid;
  }

  .topbar {
    padding: 0 18px;
  }

  .breadcrumb {
    display: none;
  }

  .content {
    padding: 25px 18px;
  }

  .hero {
    align-items: flex-start;
    gap: 15px;
    flex-direction: column;
  }
}

/* ==========================================
   SMALL MOBILE
========================================== */

@media (max-width: 550px) {

  .statsGrid {
    grid-template-columns: 1fr;
  }

  .profileDetails {
    grid-template-columns: 1fr;
  }

  .profileHero {
    align-items: flex-start;
  }

  .profileName {
    display: none;
  }

  .topRight {
    gap: 8px;
  }

  .panelHeader {
    padding: 18px;
  }

  .heroTitle {
    font-size: 30px;
  }

  .statusPill {
    align-self: flex-start;
  }

  .profilePanel {
    padding: 18px;
  }

  .profileBigAvatar,
  .profileImageWrapper {
    width: 58px;
    height: 58px;
  }

  .profileImage {
    width: 58px;
    height: 58px;
    border-radius: 17px;
  }

  .profileImageEdit {
    width: 24px;
    height: 24px;
    border-radius: 8px;
  }
}
`;

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==========================================
  // PROFILE IMAGE
  // ==========================================

  const [profileImage, setProfileImage] = useState("");

  // ==========================================
  // GET LOGGED-IN USER
  // ==========================================

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);

      // Load saved profile image
      const savedProfileImage = localStorage.getItem("profileImage");

      if (savedProfileImage) {
        setProfileImage(savedProfileImage);
      }
    } catch (error) {
      console.error("Invalid user data:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("profileImage");

      navigate("/login");
    }
  }, [navigate]);

  // ==========================================
  // FETCH USERS WHEN ADMIN LOGS IN
  // ==========================================

  useEffect(() => {
    if (!user) return;

    if (user.role !== "admin") return;

    fetchUsers();
  }, [user]);

  // ==========================================
  // FETCH ALL USERS
  // ==========================================

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error("FETCH USERS ERROR:", error);

      setError(error.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  // ==========================================
  // PROFILE IMAGE UPLOAD
  // ==========================================

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    // Only allow images
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Profile image must be smaller than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;

      setProfileImage(imageData);

      localStorage.setItem("profileImage", imageData);

      setSuccess("Profile image updated successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    };

    reader.onerror = () => {
      setError("Failed to read the selected image.");
    };

    reader.readAsDataURL(file);

    // Allow selecting the same file again
    e.target.value = "";
  };

  // ==========================================
  // REMOVE PROFILE IMAGE
  // ==========================================

  const handleRemoveProfileImage = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove your profile image?",
    );

    if (!confirmed) return;

    localStorage.removeItem("profileImage");
    setProfileImage("");

    setSuccess("Profile image removed successfully.");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  // ==========================================
  // DELETE USER
  // ==========================================

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/api/users/${userId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setSuccess("User deleted successfully.");

      setUsers((previousUsers) =>
        previousUsers.filter((item) => item._id !== userId),
      );
    } catch (error) {
      console.error("DELETE USER ERROR:", error);

      setError(error.message);
    }
  };

  // ==========================================
  // EDIT USER
  // ==========================================

  const handleEditUser = async (userId) => {
    const selectedUser = users.find((item) => item._id === userId);

    if (!selectedUser) return;

    const newName = window.prompt("Enter new name:", selectedUser.name);

    if (newName === null) return;

    const newEmail = window.prompt("Enter new email:", selectedUser.email);

    if (newEmail === null) return;

    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/api/users/${userId}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: newName,
            email: newEmail,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      setSuccess("User updated successfully.");

      setUsers((previousUsers) =>
        previousUsers.map((item) =>
          item._id === userId
            ? {
                ...item,
                name: newName,
                email: newEmail,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("UPDATE USER ERROR:", error);

      setError(error.message);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Remove this if you want image to remain
    // after logging out.
    localStorage.removeItem("profileImage");

    navigate("/login");
  };

  // ==========================================
  // CLOSE MOBILE SIDEBAR
  // ==========================================

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // ==========================================
  // USER INITIALS
  // ==========================================

  const getInitials = (name = "") => {
    return (
      name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "U"
    );
  };

  // ==========================================
  // STATISTICS
  // ==========================================

  const activeUsers = useMemo(() => {
    return users.filter((item) => item.isActive).length;
  }, [users]);

  const inactiveUsers = useMemo(() => {
    return users.filter((item) => !item.isActive).length;
  }, [users]);

  const adminUsers = useMemo(() => {
    return users.filter((item) => item.role === "admin").length;
  }, [users]);

  // ==========================================
  // LOADING
  // ==========================================

  if (!user) {
    return (
      <>
        <style>{styles}</style>

        <div
          style={{
            minHeight: "100vh",
            background: "#050509",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <div className="loadingSpinner" />
          Loading dashboard...
        </div>
      </>
    );
  }

  const isAdmin = user.role === "admin";

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <>
      <style>{styles}</style>

      <div className="dashboard">
        {/* ==========================================
            SIDEBAR OVERLAY
        ========================================== */}

        {sidebarOpen && (
          <div className="sidebarOverlay" onClick={closeSidebar} />
        )}

        {/* ==========================================
            SIDEBAR
        ========================================== */}

        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          {/* SIDEBAR HEADER */}

          <div className="sidebarHeader">
            <div className="logo">
              <div className="logoIcon">S</div>

              <div className="logoText">
                SECURE<span>HUB</span>
              </div>
            </div>

            {/* MOBILE CLOSE BUTTON */}

            <button
              className="closeSidebar"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              ×
            </button>
          </div>

          <div className="sidebarLabel">Workspace</div>

          <nav className="nav">
            <button className="navItem active" onClick={closeSidebar}>
              <span className="navIcon">⌂</span>
              Overview
            </button>

            <button className="navItem" onClick={closeSidebar}>
              <span className="navIcon">♙</span>
              Profile
            </button>

            {isAdmin && (
              <button className="navItem" onClick={closeSidebar}>
                <span className="navIcon">♙</span>
                Users
              </button>
            )}

            <button className="navItem" onClick={closeSidebar}>
              <span className="navIcon">◷</span>
              Activity
            </button>

            <button className="navItem" onClick={closeSidebar}>
              <span className="navIcon">⚙</span>
              Settings
            </button>
          </nav>

          <div className="sidebarBottom">
            <div className="sidebarLabel">Account</div>

            <button className="navItem logoutSide" onClick={handleLogout}>
              <span className="navIcon">↪</span>
              Logout
            </button>
          </div>
        </aside>

        {/* ==========================================
            MAIN
        ========================================== */}

        <div className="main">
          {/* TOP BAR */}

          <header className="topbar">
            {/* HAMBURGER */}

            <button
              className="mobileMenu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="breadcrumb">
              Dashboard / <strong>Overview</strong>
            </div>

            <div className="topRight">
              <button className="notification" aria-label="Notifications">
                ♢
                <span className="notificationDot" />
              </button>

              <div className="profileMini">
                {/* TOP PROFILE IMAGE */}

                <div className="topAvatarWrapper">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user.name}
                      className="topProfileImage"
                    />
                  ) : (
                    <div className="avatar">{getInitials(user.name)}</div>
                  )}
                </div>

                <div className="profileName">
                  <div>{user.name}</div>

                  <div className="profileRole">{user.role}</div>
                </div>
              </div>
            </div>
          </header>

          {/* ==========================================
              CONTENT
          ========================================== */}

          <main className="content">
            {/* HERO */}

            <section className="hero">
              <div>
                <div className="heroEyebrow">Personal Dashboard</div>

                <h1 className="heroTitle">
                  Welcome back, <span>{user.name}</span>
                </h1>

                <p className="heroSubtitle">
                  Here's what's happening with your SecureHub account.
                </p>
              </div>

              <div className="statusPill">
                <span className="statusDot" />
                System operational
              </div>
            </section>

            {/* ==========================================
                PROFILE CARD
            ========================================== */}

            <section className="profilePanel">
              <div className="profileHero">
                {/* PROFILE IMAGE */}

                <div className="profileImageWrapper">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user.name}
                      className="profileImage"
                    />
                  ) : (
                    <div className="profileBigAvatar">
                      {getInitials(user.name)}
                    </div>
                  )}

                  {/* EDIT IMAGE */}

                  <label
                    htmlFor="profileImageUpload"
                    className="profileImageEdit"
                    title="Change profile image"
                  >
                    ✎
                  </label>

                  <input
                    id="profileImageUpload"
                    type="file"
                    accept="image/*"
                    className="profileImageInput"
                    onChange={handleProfileImageChange}
                  />
                </div>

                <div>
                  <h2>{user.name}</h2>

                  <p>{user.email}</p>

                  <div
                    style={{
                      marginTop: "9px",
                      display: "flex",
                      gap: "7px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span className="roleBadge">{user.role}</span>

                    <span
                      className={`status ${
                        user.isActive ? "active" : "inactive"
                      }`}
                    >
                      <span className="statusIndicator" />

                      {user.isActive ? "Active" : "Inactive"}
                    </span>

                    {/* REMOVE IMAGE BUTTON */}

                    {profileImage && (
                      <button
                        type="button"
                        onClick={handleRemoveProfileImage}
                        style={{
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          background: "rgba(239, 68, 68, 0.07)",
                          color: "#fca5a5",
                          padding: "4px 8px",
                          borderRadius: "999px",
                          fontSize: "9px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="profileDetails">
                <div className="detail">
                  <span className="detailLabel">Account</span>

                  <span className="detailValue">Secure</span>
                </div>

                <div className="detail">
                  <span className="detailLabel">Access</span>

                  <span className="detailValue">
                    {isAdmin ? "Administrator" : "Standard"}
                  </span>
                </div>
              </div>
            </section>

            {/* PROFILE SUCCESS / ERROR */}

            {(error || success) && (
              <div
                style={{
                  marginBottom: "25px",
                }}
              >
                {error && <div className="alert error">{error}</div>}

                {success && <div className="alert success">{success}</div>}
              </div>
            )}

            {/* ==========================================
                STATISTICS
            ========================================== */}

            <section className="statsGrid">
              <div className="statCard">
                <div className="statTop">
                  <span className="statLabel">Total Users</span>

                  <div className="statIcon">♙</div>
                </div>

                <div className="statValue">{isAdmin ? users.length : "—"}</div>

                <div className="statDescription">Registered accounts</div>
              </div>

              <div className="statCard">
                <div className="statTop">
                  <span className="statLabel">Active Users</span>

                  <div className="statIcon">●</div>
                </div>

                <div className="statValue">{isAdmin ? activeUsers : "—"}</div>

                <div className="statDescription">Currently active</div>
              </div>

              <div className="statCard">
                <div className="statTop">
                  <span className="statLabel">Administrators</span>

                  <div className="statIcon">◈</div>
                </div>

                <div className="statValue">{isAdmin ? adminUsers : "—"}</div>

                <div className="statDescription">Users with admin access</div>
              </div>

              <div className="statCard">
                <div className="statTop">
                  <span className="statLabel">Inactive</span>

                  <div className="statIcon">◌</div>
                </div>

                <div className="statValue">{isAdmin ? inactiveUsers : "—"}</div>

                <div className="statDescription">Inactive accounts</div>
              </div>
            </section>

            {/* ==========================================
                ADMIN USER MANAGEMENT
            ========================================== */}

            {isAdmin && (
              <section className="panel">
                <div className="panelHeader">
                  <div>
                    <h2 className="panelTitle">User Management</h2>

                    <p className="panelSubtitle">
                      Manage registered SecureHub users
                    </p>
                  </div>

                  <button
                    className="refreshButton"
                    onClick={fetchUsers}
                    disabled={loadingUsers}
                  >
                    <span
                      className={`refreshIcon ${
                        loadingUsers ? "spinning" : ""
                      }`}
                    >
                      ↻
                    </span>

                    {loadingUsers ? "Refreshing" : "Refresh"}
                  </button>
                </div>

                {/* TABLE */}

                <div className="tableWrapper">
                  {loadingUsers ? (
                    <div className="loading">
                      <div className="loadingSpinner" />
                      Loading users...
                    </div>
                  ) : users.length === 0 ? (
                    <div className="empty">No registered users found.</div>
                  ) : (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>User</th>

                          <th>Email</th>

                          <th>Role</th>

                          <th>Status</th>

                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.map((item, index) => (
                          <tr
                            key={item._id}
                            style={{
                              animationDelay: `${index * 0.04}s`,
                            }}
                          >
                            <td>
                              <div className="userCell">
                                <div className="tableAvatar">
                                  {getInitials(item.name)}
                                </div>

                                {item.name}
                              </div>
                            </td>

                            <td>{item.email}</td>

                            <td>
                              <span className="roleBadge">{item.role}</span>
                            </td>

                            <td>
                              <span
                                className={`status ${
                                  item.isActive ? "active" : "inactive"
                                }`}
                              >
                                <span className="statusIndicator" />

                                {item.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>

                            <td>
                              <div className="actions">
                                <button
                                  className="actionButton editButton"
                                  onClick={() => handleEditUser(item._id)}
                                >
                                  Edit
                                </button>

                                <button
                                  className="actionButton deleteButton"
                                  onClick={() => handleDeleteUser(item._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
