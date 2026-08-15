import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopToBack from "../components/TopToBack";

const API_BASE_URL = "http://localhost:8000";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
}

.dashboard {
  min-height: 100vh;
  background:
    radial-gradient(circle at 10% 10%, rgba(99,102,241,.16), transparent 28%),
    radial-gradient(circle at 90% 20%, rgba(168,85,247,.13), transparent 28%),
    radial-gradient(circle at 50% 100%, rgba(14,165,233,.08), transparent 30%),
    #050509;
  color: #fff;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  display: flex;
  overflow-x: hidden;
}

.dashboard::before,
.dashboard::after {
  content: "";
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  animation: floatGlow 8s ease-in-out infinite;
}

.dashboard::before {
  width: 450px;
  height: 450px;
  background: rgba(99,102,241,.08);
  top: -150px;
  left: 20%;
}

.dashboard::after {
  width: 350px;
  height: 350px;
  background: rgba(168,85,247,.06);
  bottom: -100px;
  right: 5%;
  animation-duration: 10s;
  animation-direction: reverse;
}

@keyframes floatGlow {
  0%,100% {
    transform: translate3d(0,0,0);
  }

  50% {
    transform: translate3d(30px,-25px,0);
  }
}

@keyframes logoPulse {
  0%,100% {
    box-shadow: 0 10px 30px rgba(99,102,241,.25);
  }

  50% {
    box-shadow: 0 10px 40px rgba(168,85,247,.45);
  }
}

@keyframes statusPulse {
  0%,100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(.7);
    opacity: .55;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

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

@keyframes overlayIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.sidebar {
  width: 250px;
  min-height: 100vh;
  padding: 28px 18px;
  background: rgba(9,9,15,.78);
  border-right: 1px solid rgba(255,255,255,.07);
  backdrop-filter: blur(25px);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  transition: transform .3s ease;
}

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
  background: linear-gradient(135deg,#6366f1,#a855f7);
  box-shadow: 0 10px 30px rgba(99,102,241,.35);
  animation: logoPulse 3s ease-in-out infinite;
}

.logoText {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: .04em;
}

.logoText span {
  color: #818cf8;
}

.closeSidebar {
  display: none;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.04);
  color: #a1a1aa;
  border-radius: 9px;
  cursor: pointer;
  font-size: 22px;
}

.closeSidebar:hover {
  color: #fff;
  background: rgba(239,68,68,.12);
}

.sidebarLabel {
  color: #52525b;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .13em;
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
  transition: .25s;
}

.navItem:hover {
  color: #fff;
  background: rgba(255,255,255,.05);
  transform: translateX(3px);
}

.navItem.active {
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(99,102,241,.2),
    rgba(168,85,247,.08)
  );
  border: 1px solid rgba(129,140,248,.16);
}

.navIcon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 14px;
  background: rgba(255,255,255,.04);
}

.navItem.active .navIcon {
  background: linear-gradient(135deg,#6366f1,#8b5cf6);
}

.sidebarBottom {
  margin-top: auto;
}

.logoutSide {
  color: #f87171;
}

.logoutSide:hover {
  background: rgba(239,68,68,.08);
}

.main {
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
}

.topbar {
  height: 76px;
  padding: 0 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,.07);
  background: rgba(5,5,9,.55);
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
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.035);
  color: #a1a1aa;
  cursor: pointer;
  position: relative;
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

.avatar,
.profileBigAvatar {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg,#6366f1,#a855f7);
  font-weight: 800;
  box-shadow: 0 6px 20px rgba(99,102,241,.25);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  font-size: 13px;
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

.mobileMenu {
  display: none;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.04);
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 19px;
}

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
  border: 1px solid rgba(255,255,255,.1);
}

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
  animation: fadeUp .55s ease both;
}

.heroEyebrow {
  color: #818cf8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.heroTitle {
  font-size: clamp(28px,4vw,42px);
  line-height: 1.05;
  letter-spacing: -.045em;
  margin: 0;
  font-weight: 800;
}

.heroTitle span {
  background: linear-gradient(90deg,#fff,#a5b4fc,#c084fc);
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
  background: rgba(34,197,94,.07);
  border: 1px solid rgba(34,197,94,.15);
  color: #86efac;
  font-size: 11px;
  font-weight: 600;
}

.statusDot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 12px rgba(74,222,128,.9);
  animation: statusPulse 1.8s infinite;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
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
    rgba(255,255,255,.065),
    rgba(255,255,255,.018)
  );
  border: 1px solid rgba(255,255,255,.075);
  backdrop-filter: blur(20px);
  transition: .3s;
  animation: fadeUp .6s ease both;
}

.statCard:hover {
  transform: translateY(-6px);
  border-color: rgba(129,140,248,.28);
  box-shadow: 0 20px 50px rgba(0,0,0,.25);
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
  background: rgba(129,140,248,.11);
  color: #a5b4fc;
  font-size: 17px;
}

.statLabel {
  color: #71717a;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.statValue {
  margin-top: 18px;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -.03em;
}

.statDescription {
  color: #52525b;
  font-size: 10px;
  margin-top: 5px;
}

.profilePanel {
  margin-bottom: 25px;
  padding: 25px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 25px;
  border: 1px solid rgba(255,255,255,.075);
  border-radius: 20px;
  background:
    linear-gradient(
      135deg,
      rgba(99,102,241,.1),
      rgba(255,255,255,.025)
    ),
    rgba(255,255,255,.02);
  backdrop-filter: blur(20px);
  animation: fadeUp .5s ease both;
}

.profileHero {
  display: flex;
  align-items: center;
  gap: 18px;
}

.profileImageWrapper {
  position: relative;
  width: 68px;
  height: 68px;
  flex-shrink: 0;
}

.profileImage,
.profileBigAvatar {
  width: 68px;
  height: 68px;
  border-radius: 20px;
}

.profileImage {
  object-fit: cover;
  display: block;
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 15px 35px rgba(99,102,241,.3);
}

.profileBigAvatar {
  font-size: 22px;
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
  background: rgba(0,0,0,.18);
  border: 1px solid rgba(255,255,255,.05);
}

.detailLabel {
  display: block;
  color: #52525b;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: .08em;
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
  background: rgba(129,140,248,.12);
  color: #a5b4fc;
  font-size: 9px;
  text-transform: uppercase;
  font-weight: 700;
}

.profileImageEdit {
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 27px;
  height: 27px;
  border-radius: 9px;
  border: 2px solid #050509;
  background: linear-gradient(135deg,#6366f1,#a855f7);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.profileImageInput {
  display: none;
}

.panel {
  border: 1px solid rgba(255,255,255,.075);
  background: rgba(255,255,255,.025);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  overflow: hidden;
  animation: fadeUp .65s ease both;
}

.panelHeader {
  padding: 23px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,.06);
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
  border: 1px solid rgba(129,140,248,.2);
  background: rgba(99,102,241,.09);
  color: #a5b4fc;
  padding: 9px 13px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
}

.refreshButton:hover {
  background: rgba(99,102,241,.16);
}

.refreshButton:disabled {
  opacity: .5;
  cursor: not-allowed;
}

.refreshIcon.spinning {
  display: inline-block;
  animation: spin .8s linear infinite;
}

.backButton {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.035);
  color: #a1a1aa;
  padding: 9px 13px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
}

.backButton:hover {
  color: #fff;
  background: rgba(255,255,255,.07);
}

.profileToolbar {
  padding: 18px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid rgba(255,255,255,.06);
}

.searchWrapper {
  position: relative;
  flex: 1;
  max-width: 420px;
}

.searchIcon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #52525b;
  font-size: 13px;
  pointer-events: none;
}

.searchInput {
  width: 100%;
  border: 1px solid rgba(255,255,255,.08);
  outline: none;
  background: rgba(0,0,0,.2);
  color: #e4e4e7;
  padding: 11px 13px 11px 36px;
  border-radius: 10px;
  font-size: 11px;
  transition: .2s;
}

.searchInput::placeholder {
  color: #52525b;
}

.searchInput:focus {
  border-color: rgba(129,140,248,.35);
  box-shadow: 0 0 0 3px rgba(99,102,241,.07);
}

.profileCount {
  color: #71717a;
  font-size: 11px;
  white-space: nowrap;
}

.tableWrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 850px;
}

.table th {
  padding: 13px 20px;
  text-align: left;
  color: #52525b;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: .1em;
  font-weight: 700;
  background: rgba(0,0,0,.12);
}

.table td {
  padding: 16px 20px;
  border-top: 1px solid rgba(255,255,255,.045);
  color: #a1a1aa;
  font-size: 11px;
}

.table tbody tr {
  transition: .25s;
  animation: rowEnter .45s ease both;
}

.table tbody tr:hover {
  background: rgba(129,140,248,.045);
}

.userCell {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e4e4e7;
  font-weight: 600;
}

.tableAvatar {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg,#6366f1,#a855f7);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  flex-shrink: 0;
}

.profileUserInfo {
  min-width: 0;
}

.profileUserName {
  color: #e4e4e7;
  font-size: 11px;
  font-weight: 700;
}

.profileUserId {
  margin-top: 3px;
  color: #52525b;
  font-size: 8px;
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
  background: rgba(34,197,94,.08);
  color: #86efac;
}

.status.inactive {
  background: rgba(239,68,68,.08);
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
  border: 1px solid rgba(255,255,255,.07);
  background: rgba(255,255,255,.035);
  color: #a1a1aa;
  padding: 7px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
}

.editButton:hover {
  color: #a5b4fc;
  border-color: rgba(129,140,248,.3);
  background: rgba(99,102,241,.08);
}

.deleteButton:hover {
  color: #fca5a5;
  border-color: rgba(239,68,68,.3);
  background: rgba(239,68,68,.08);
}

.alert {
  margin: 18px 20px 0;
  padding: 12px 14px;
  border-radius: 11px;
  font-size: 11px;
}

.error {
  color: #fca5a5;
  background: rgba(239,68,68,.07);
  border: 1px solid rgba(239,68,68,.15);
}

.success {
  color: #86efac;
  background: rgba(34,197,94,.07);
  border: 1px solid rgba(34,197,94,.15);
}

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
  border: 2px solid rgba(255,255,255,.08);
  border-top-color: #818cf8;
  border-radius: 50%;
  margin-right: 10px;
  animation: spin .8s linear infinite;
}

.empty,
.activityEmpty {
  padding: 55px 20px;
  text-align: center;
  color: #52525b;
  font-size: 12px;
}

/* Activity */

.activityList {
  display: flex;
  flex-direction: column;
}

.activityItem {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 22px;
  border-top: 1px solid rgba(255,255,255,.045);
  transition: .25s;
}

.activityItem:hover {
  background: rgba(129,140,248,.045);
}

.activityIcon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: rgba(99,102,241,.1);
  color: #a5b4fc;
  font-size: 14px;
  font-weight: 800;
}

.activityIcon.success {
  background: rgba(34,197,94,.1);
  color: #86efac;
}

.activityIcon.failed {
  background: rgba(239,68,68,.1);
  color: #fca5a5;
}

.activityInfo {
  flex: 1;
  min-width: 0;
}

.activityAction {
  color: #e4e4e7;
  font-size: 12px;
  font-weight: 600;
}

.activityUser {
  margin-top: 4px;
  color: #71717a;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activityDetails {
  margin-top: 4px;
  color: #52525b;
  font-size: 9px;
}

.activityTime {
  color: #52525b;
  font-size: 10px;
  white-space: nowrap;
}

.sidebarOverlay {
  display: none;
}

@media (max-width:1100px) {
  .statsGrid {
    grid-template-columns: repeat(2,1fr);
  }

  .profilePanel {
    grid-template-columns: 1fr;
  }
}

@media (max-width:800px) {
  .sidebar {
    transform: translateX(-105%);
    box-shadow: 20px 0 60px rgba(0,0,0,.45);
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
    background: rgba(0,0,0,.62);
    backdrop-filter: blur(4px);
    z-index: 40;
    animation: overlayIn .25s ease both;
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

  .profileToolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .searchWrapper {
    max-width: none;
  }

  .profileCount {
    text-align: center;
  }
}

@media (max-width:550px) {
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

  .activityItem {
    align-items: flex-start;
    padding: 14px 16px;
  }

  .activityTime {
    display: none;
  }

  .activityIcon {
    width: 34px;
    height: 34px;
  }

  .panelHeader {
    gap: 12px;
    align-items: flex-start;
  }

  .panelHeader > div:last-child {
    flex-shrink: 0;
  }
}
`;

const activityLabels = {
  LOGIN_SUCCESS: "Login successful",
  LOGIN_FAILED: "Failed login attempt",
  REGISTER: "New user registered",
  LOGOUT: "User logged out",
  PASSWORD_CHANGED: "Password changed",
  PROFILE_UPDATED: "Profile updated",
  ACCOUNT_LOCKED: "Account locked",
};

const activityIcons = {
  LOGIN_SUCCESS: "✓",
  LOGIN_FAILED: "!",
  REGISTER: "+",
  LOGOUT: "↪",
  PASSWORD_CHANGED: "🔒",
  PROFILE_UPDATED: "✎",
  ACCOUNT_LOCKED: "🔒",
};

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingActivities, setLoadingActivities] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  // NEW: Profile view
  const [showProfiles, setShowProfiles] = useState(false);
  const [profileSearch, setProfileSearch] = useState("");

  const [systemSettings, setSystemSettings] = useState({
    sessionTimeout: 30,
    language: "English",
  });

  const [settingsSaved, setSettingsSaved] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const savedSettings = localStorage.getItem("secureHubSystemSettings");

    if (savedSettings) {
      try {
        setSystemSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Failed to load system settings:", error);
      }
    }
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem(
      "secureHubSystemSettings",
      JSON.stringify(systemSettings),
    );

    setSettingsSaved(true);

    setTimeout(() => {
      setSettingsSaved(false);
    }, 3000);
  };

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

      if (!parsedUser || typeof parsedUser !== "object") {
        throw new Error("Invalid stored user");
      }

      setUser(parsedUser);

      const savedProfileImage = localStorage.getItem("profileImage");

      if (savedProfileImage) {
        setProfileImage(savedProfileImage);
      }
    } catch (err) {
      console.error("INVALID USER DATA:", err);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("profileImage");

      navigate("/login");
    }
  }, [navigate]);

  // ==========================================
  // FETCH ADMIN DATA
  // ==========================================

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    fetchUsers();
    fetchActivities();
  }, [user]);

  // ==========================================
  // FETCH USERS
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

      const response = await fetch(`${API_BASE_URL}/api/users`, {
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

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      console.error("FETCH USERS ERROR:", err);

      setError(err.message || "Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

  // ==========================================
  // FETCH ACTIVITY
  // ==========================================

  const fetchActivities = async () => {
    try {
      setLoadingActivities(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/activity`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.warn("Activity API unavailable:", response.status);

        setActivities([]);
        return;
      }

      const data = await response.json();

      const rawActivities = Array.isArray(data)
        ? data
        : Array.isArray(data.activities)
          ? data.activities
          : [];

      const normalizedActivities = rawActivities
        .map((item) => {
          if (!item) return null;

          const action = item.action || item.type || "";

          const details = item.details || item.description || "";

          const userName =
            item.user?.name ||
            item.user?.email ||
            item.email ||
            (item.userRole === "admin" ? "Admin" : "User");

          return {
            ...item,
            action: String(action).toUpperCase(),
            details,
            userName,
          };
        })
        .filter(Boolean);

      normalizedActivities.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;

        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return dateB - dateA;
      });

      setActivities(normalizedActivities);
    } catch (err) {
      console.error("FETCH ACTIVITIES ERROR:", err);

      setActivities([]);
    } finally {
      setLoadingActivities(false);
    }
  };

  // ==========================================
  // PROFILE IMAGE
  // ==========================================

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile image must be smaller than 5MB.");

      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;

      setProfileImage(imageData);

      localStorage.setItem("profileImage", imageData);

      setSuccess("Profile image updated successfully.");

      setTimeout(() => setSuccess(""), 3000);
    };

    reader.onerror = () => {
      setError("Failed to read the selected image.");
    };

    reader.readAsDataURL(file);

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

    setTimeout(() => setSuccess(""), 3000);
  };

  // ==========================================
  // OPEN ALL PROFILES
  // ==========================================

  const handleProfiles = async () => {
    setError("");
    setSuccess("");

    setShowProfiles(true);
    setProfileSearch("");

    closeSidebar();

    if (users.length === 0) {
      await fetchUsers();
    }
  };

  // ==========================================
  // BACK TO OVERVIEW
  // ==========================================

  const handleBackToOverview = () => {
    setShowProfiles(false);
    setProfileSearch("");
    setError("");
    setSuccess("");
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

      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setSuccess("User deleted successfully.");

      setUsers((previousUsers) =>
        previousUsers.filter((item) => item._id !== userId),
      );

      fetchActivities();
    } catch (err) {
      console.error("DELETE USER ERROR:", err);

      setError(err.message || "Failed to delete user");
    }
  };

  // ==========================================
  // EDIT USER
  // ==========================================

  const handleEditUser = async (userId) => {
    const selectedUser = users.find((item) => item._id === userId);

    if (!selectedUser) return;

    const newName = window.prompt("Enter new name:", selectedUser.name || "");

    if (newName === null) return;

    const newEmail = window.prompt(
      "Enter new email:",
      selectedUser.email || "",
    );

    if (newEmail === null) return;

    if (!newName.trim() || !newEmail.trim()) {
      setError("Name and email are required.");

      return;
    }

    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim(),
        }),
      });

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
                name: newName.trim(),
                email: newEmail.trim(),
              }
            : item,
        ),
      );

      fetchActivities();
    } catch (err) {
      console.error("UPDATE USER ERROR:", err);

      setError(err.message || "Failed to update user");
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");

    navigate("/login");
  };

  // ==========================================
  // SIDEBAR
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

  const activeUsers = useMemo(
    () => users.filter((item) => item.isActive).length,
    [users],
  );

  const inactiveUsers = useMemo(
    () => users.filter((item) => !item.isActive).length,
    [users],
  );

  const adminUsers = useMemo(
    () => users.filter((item) => item.role === "admin").length,
    [users],
  );

  // ==========================================
  // FILTERED PROFILES
  // ==========================================

  const filteredProfiles = useMemo(() => {
    const search = profileSearch.trim().toLowerCase();

    if (!search) return users;

    return users.filter((item) => {
      const name = item.name?.toLowerCase() || "";

      const email = item.email?.toLowerCase() || "";

      const role = item.role?.toLowerCase() || "";

      return (
        name.includes(search) || email.includes(search) || role.includes(search)
      );
    });
  }, [users, profileSearch]);

  // ==========================================
  // ACTIVITY LABEL
  // ==========================================

  const getActivityLabel = (activity) => {
    if (activityLabels[activity.action]) {
      return activityLabels[activity.action];
    }

    if (activity.activity) {
      return activity.activity;
    }

    if (activity.action) {
      return activity.action
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return "Account activity";
  };

  // ==========================================
  // ACTIVITY ICON
  // ==========================================

  const getActivityIcon = (activity) => {
    if (activityIcons[activity.action]) {
      return activityIcons[activity.action];
    }

    const action = activity.action?.toUpperCase() || "";

    if (action.includes("FAILED") || action.includes("ERROR")) {
      return "!";
    }

    if (action.includes("LOGIN") || action.includes("SUCCESS")) {
      return "✓";
    }

    if (action.includes("REGISTER") || action.includes("CREATE")) {
      return "+";
    }

    if (action.includes("LOGOUT")) {
      return "↪";
    }

    if (action.includes("PASSWORD")) {
      return "🔒";
    }

    if (action.includes("PROFILE") || action.includes("UPDATE")) {
      return "✎";
    }

    return "•";
  };

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

  return (
    <>
      <style>{styles}</style>

      <div className="dashboard">
        {sidebarOpen && (
          <div className="sidebarOverlay" onClick={closeSidebar} />
        )}

        {/* ==========================================
            SIDEBAR
        ========================================== */}

        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebarHeader">
            <div className="logo">
              <div className="logoIcon">S</div>

              <div className="logoText">
                SECURE<span>HUB</span>
              </div>
            </div>

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
            <button
              className={`navItem ${
                activeTab === "overview" && !showProfiles ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("overview");
                setShowProfiles(false);
                closeSidebar();
              }}
            >
              <span className="navIcon">⌂</span>
              Overview
            </button>

            {/* PROFILE BUTTON */}

            <button
              className={`navItem ${showProfiles ? "active" : ""}`}
              onClick={() => {
                setActiveTab("overview");
                setShowProfiles(true);
                closeSidebar();
              }}
            >
              <span className="navIcon">♙</span>
              All Profiles
            </button>

            {isAdmin && (
              <button
                className="navItem"
                onClick={() => {
                  setShowProfiles(false);

                  closeSidebar();

                  setTimeout(() => {
                    document.getElementById("user-management")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 50);
                }}
              >
                <span className="navIcon">♙</span>
                Users
              </button>
            )}

            <button
              className="navItem"
              onClick={() => {
                setShowProfiles(false);

                closeSidebar();

                setTimeout(() => {
                  document.getElementById("security-activity")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 50);
              }}
            >
              <span className="navIcon">◷</span>
              Activity
            </button>

            <button
              className={`navItem ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("settings");
                setShowProfiles(false);
                closeSidebar();
              }}
            >
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
          {/* TOPBAR */}

          <header className="topbar">
            <button
              className="mobileMenu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="breadcrumb">
              Dashboard /{" "}
              <strong>{showProfiles ? "Profiles" : "Overview"}</strong>
            </div>

            <div className="topRight">
              <button className="notification" aria-label="Notifications">
                ♢
                <span className="notificationDot" />
              </button>

              <div className="profileMini">
                <div className="topAvatarWrapper">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user.name || "User"}
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

          <main className="content">
            {/* ======================================
                ALL PROFILES VIEW
            ====================================== */}

            {activeTab === "settings" && (
              <div
                style={{
                  width: "100%",
                  animation: "settingsFadeIn 0.3s ease",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    marginBottom: "25px",
                  }}
                >
                  <h1
                    style={{
                      margin: 0,
                      color: "#f4f4f5",
                      fontSize: "28px",
                      fontWeight: "700",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    ⚙ System Settings
                  </h1>

                  <p
                    style={{
                      margin: "8px 0 0",
                      color: "#71717a",
                      fontSize: "13px",
                    }}
                  >
                    Configure your SecureHub system preferences.
                  </p>
                </div>

                {/* Settings Card */}
                <div
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* ================================
          SESSION TIMEOUT
      ================================= */}

                  <div
                    style={{
                      minHeight: "95px",
                      padding: "24px 26px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "30px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <h3
                        style={{
                          margin: "0 0 7px",
                          color: "#f4f4f5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Session Timeout
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          color: "#71717a",
                          fontSize: "12px",
                          lineHeight: "1.6",
                        }}
                      >
                        Automatically log out after a period of inactivity.
                      </p>
                    </div>

                    <select
                      value={systemSettings.sessionTimeout}
                      onChange={(e) =>
                        setSystemSettings({
                          ...systemSettings,
                          sessionTimeout: Number(e.target.value),
                        })
                      }
                      style={{
                        width: "180px",
                        padding: "11px 13px",
                        borderRadius: "9px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "#111118",
                        color: "#e4e4e7",
                        fontSize: "12px",
                        fontWeight: "500",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value={5}>5 minutes</option>
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>60 minutes</option>
                      <option value={120}>2 hours</option>
                    </select>
                  </div>

                  {/* ================================
          LANGUAGE
      ================================= */}

                  <div
                    style={{
                      minHeight: "95px",
                      padding: "24px 26px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "30px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <h3
                        style={{
                          margin: "0 0 7px",
                          color: "#f4f4f5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Language
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          color: "#71717a",
                          fontSize: "12px",
                          lineHeight: "1.6",
                        }}
                      >
                        Select your dashboard language.
                      </p>
                    </div>

                    <select
                      value={systemSettings.language}
                      onChange={(e) =>
                        setSystemSettings({
                          ...systemSettings,
                          language: e.target.value,
                        })
                      }
                      style={{
                        width: "180px",
                        padding: "11px 13px",
                        borderRadius: "9px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "#111118",
                        color: "#e4e4e7",
                        fontSize: "12px",
                        fontWeight: "500",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="English">English</option>
                      <option value="Urdu">Urdu</option>
                    </select>
                  </div>

                  {/* ================================
          SAVE SETTINGS
      ================================= */}

                  <div
                    style={{
                      minHeight: "80px",
                      padding: "20px 26px",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      background: "rgba(0,0,0,0.08)",
                    }}
                  >
                    <button
                      onClick={handleSaveSettings}
                      style={{
                        padding: "11px 18px",
                        border: "none",
                        borderRadius: "9px",
                        background: "#6366f1",
                        color: "#ffffff",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      ✓ Save Settings
                    </button>

                    {settingsSaved && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "rgba(34,197,94,0.08)",
                          border: "1px solid rgba(34,197,94,0.15)",
                          color: "#86efac",
                          fontSize: "11px",
                          fontWeight: "600",
                        }}
                      >
                        ✓ Settings saved successfully
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {showProfiles ? (
              <>
                <section className="hero">
                  <div>
                    <div className="heroEyebrow">User Directory</div>

                    <h1 className="heroTitle">
                      All <span>Profiles</span>
                    </h1>

                    <p className="heroSubtitle">
                      View and manage all registered SecureHub profiles.
                    </p>
                  </div>

                  <div className="statusPill">
                    <span className="statusDot" />
                    {users.length} Profiles
                  </div>
                </section>

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

                <section className="panel">
                  <div className="panelHeader">
                    <div>
                      <h2 className="panelTitle">All User Profiles</h2>

                      <p className="panelSubtitle">
                        Search, view, edit, or delete registered profiles.
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <button
                        className="backButton"
                        onClick={handleBackToOverview}
                      >
                        ← Back
                      </button>

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
                  </div>

                  {/* SEARCH */}

                  <div className="profileToolbar">
                    <div className="searchWrapper">
                      <span className="searchIcon">⌕</span>

                      <input
                        type="text"
                        className="searchInput"
                        placeholder="Search by name, email or role..."
                        value={profileSearch}
                        onChange={(e) => setProfileSearch(e.target.value)}
                      />
                    </div>

                    <div className="profileCount">
                      Showing{" "}
                      <strong
                        style={{
                          color: "#d4d4d8",
                        }}
                      >
                        {filteredProfiles.length}
                      </strong>{" "}
                      of{" "}
                      <strong
                        style={{
                          color: "#d4d4d8",
                        }}
                      >
                        {users.length}
                      </strong>{" "}
                      profiles
                    </div>
                  </div>

                  {/* PROFILE TABLE */}

                  <div className="tableWrapper">
                    {loadingUsers ? (
                      <div className="loading">
                        <div className="loadingSpinner" />
                        Loading profiles...
                      </div>
                    ) : filteredProfiles.length === 0 ? (
                      <div className="empty">
                        {profileSearch
                          ? "No profiles match your search."
                          : "No registered profiles found."}
                      </div>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Profile</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Status</th>

                            <th>Joined</th>

                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredProfiles.map((item, index) => (
                            <tr
                              key={item._id}
                              style={{
                                animationDelay: `${index * 0.04}s`,
                              }}
                            >
                              {/* PROFILE */}

                              <td>
                                <div className="userCell">
                                  <div className="tableAvatar">
                                    {getInitials(item.name || "")}
                                  </div>

                                  <div className="profileUserInfo">
                                    <div className="profileUserName">
                                      {item.name || "User"}
                                    </div>

                                    <div className="profileUserId">
                                      ID: {item._id || "—"}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* EMAIL */}

                              <td>{item.email || "—"}</td>

                              {/* ROLE */}

                              <td>
                                <span className="roleBadge">
                                  {item.role || "user"}
                                </span>
                              </td>

                              {/* STATUS */}

                              <td>
                                {item.lockUntil &&
                                new Date(item.lockUntil) > new Date() ? (
                                  <span
                                    className="status inactive"
                                    style={{
                                      background: "rgba(239,68,68,.12)",
                                      color: "#fca5a5",
                                    }}
                                  >
                                    <span className="statusIndicator" />
                                    🔒 Locked
                                  </span>
                                ) : (
                                  <span
                                    className={`status ${
                                      item.isActive ? "active" : "inactive"
                                    }`}
                                  >
                                    <span className="statusIndicator" />
                                    {item.isActive ? "Active" : "Inactive"}
                                  </span>
                                )}
                              </td>

                              {/* JOINED */}

                              <td>
                                {item.createdAt
                                  ? new Date(
                                      item.createdAt,
                                    ).toLocaleDateString()
                                  : "—"}
                              </td>

                              {/* ACTIONS */}

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
              </>
            ) : (
              /* ======================================
                 NORMAL OVERVIEW
              ====================================== */

              <>
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

                {/* PROFILE */}

                <section className="profilePanel">
                  <div className="profileHero">
                    <div className="profileImageWrapper">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={user.name || "User"}
                          className="profileImage"
                        />
                      ) : (
                        <div className="profileBigAvatar">
                          {getInitials(user.name)}
                        </div>
                      )}

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

                        {profileImage && (
                          <button
                            type="button"
                            onClick={handleRemoveProfileImage}
                            style={{
                              border: "1px solid rgba(239,68,68,.2)",
                              background: "rgba(239,68,68,.07)",
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

                {/* STATISTICS */}

                <section className="statsGrid">
                  <div className="statCard">
                    <div className="statTop">
                      <span className="statLabel">Total Users</span>

                      <div className="statIcon">♙</div>
                    </div>

                    <div className="statValue">
                      {isAdmin ? users.length : "—"}
                    </div>

                    <div className="statDescription">Registered accounts</div>
                  </div>

                  <div className="statCard">
                    <div className="statTop">
                      <span className="statLabel">Active Users</span>

                      <div className="statIcon">●</div>
                    </div>

                    <div className="statValue">
                      {isAdmin ? activeUsers : "—"}
                    </div>

                    <div className="statDescription">Currently active</div>
                  </div>

                  <div className="statCard">
                    <div className="statTop">
                      <span className="statLabel">Administrators</span>

                      <div className="statIcon">◈</div>
                    </div>

                    <div className="statValue">
                      {isAdmin ? adminUsers : "—"}
                    </div>

                    <div className="statDescription">
                      Users with admin access
                    </div>
                  </div>

                  <div className="statCard">
                    <div className="statTop">
                      <span className="statLabel">Inactive</span>

                      <div className="statIcon">◌</div>
                    </div>

                    <div className="statValue">
                      {isAdmin ? inactiveUsers : "—"}
                    </div>

                    <div className="statDescription">Inactive accounts</div>
                  </div>
                </section>

                {/* USER MANAGEMENT */}

                {isAdmin && (
                  <section id="user-management" className="panel">
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
                            {users.map((item, index) => {
                              // Debug locked account information
                              console.log("USER STATUS:", {
                                name: item.name,
                                isActive: item.isActive,
                                failedLoginAttempts: item.failedLoginAttempts,
                                lockUntil: item.lockUntil,
                                isLocked:
                                  item.lockUntil &&
                                  new Date(item.lockUntil) > new Date(),
                              });

                              return (
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
                                    <span className="roleBadge">
                                      {item.role}
                                    </span>
                                  </td>

                                  {/* USER STATUS */}
                                  <td>
                                    {item.lockUntil &&
                                    new Date(item.lockUntil) > new Date() ? (
                                      <span
                                        className="status inactive"
                                        style={{
                                          background: "rgba(239,68,68,.12)",
                                          color: "#fca5a5",
                                        }}
                                      >
                                        <span className="statusIndicator" />
                                        🔒 Locked
                                      </span>
                                    ) : (
                                      <span
                                        className={`status ${
                                          item.isActive ? "active" : "inactive"
                                        }`}
                                      >
                                        <span className="statusIndicator" />

                                        {item.isActive ? "Active" : "Inactive"}
                                      </span>
                                    )}
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
                                        onClick={() =>
                                          handleDeleteUser(item._id)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </section>
                )}

                {/* SECURITY ACTIVITY */}

                {isAdmin && (
                  <section
                    id="security-activity"
                    className="panel"
                    style={{
                      marginTop: "25px",
                    }}
                  >
                    <div className="panelHeader">
                      <div>
                        <h2 className="panelTitle">Recent Security Activity</h2>

                        <p className="panelSubtitle">
                          Monitor authentication and account activity
                        </p>
                      </div>

                      <button
                        className="refreshButton"
                        onClick={fetchActivities}
                        disabled={loadingActivities}
                      >
                        <span
                          className={`refreshIcon ${
                            loadingActivities ? "spinning" : ""
                          }`}
                        >
                          ↻
                        </span>

                        {loadingActivities ? "Refreshing" : "Refresh"}
                      </button>
                    </div>

                    {loadingActivities ? (
                      <div className="loading">
                        <div className="loadingSpinner" />
                        Loading activity...
                      </div>
                    ) : activities.length === 0 ? (
                      <div className="activityEmpty">
                        No security activity found.
                      </div>
                    ) : (
                      <div className="activityList">
                        {activities.map((activity, index) => {
                          const action = activity?.action;

                          const isFailed = action === "LOGIN_FAILED";

                          const isSuccess = action === "LOGIN_SUCCESS";

                          const label = getActivityLabel(activity);

                          const icon = getActivityIcon(activity);

                          const userName =
                            activity?.userName ||
                            activity?.user?.name ||
                            activity?.user?.email ||
                            activity?.email ||
                            (activity?.userRole === "admin" ? "Admin" : "User");

                          return (
                            <div
                              className="activityItem"
                              key={
                                activity?._id ||
                                `${action || "activity"}-${
                                  activity?.createdAt || index
                                }-${index}`
                              }
                            >
                              <div
                                className={`activityIcon ${
                                  isFailed
                                    ? "failed"
                                    : isSuccess
                                      ? "success"
                                      : ""
                                }`}
                              >
                                {icon}
                              </div>

                              <div className="activityInfo">
                                <div className="activityAction">{label}</div>

                                <div className="activityUser">{userName}</div>

                                {activity?.details && (
                                  <div className="activityDetails">
                                    {activity.details}
                                  </div>
                                )}
                              </div>

                              {activity?.createdAt && (
                                <div className="activityTime">
                                  {new Date(
                                    activity.createdAt,
                                  ).toLocaleString()}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                )}
              </>
            )}
          </main>
          <TopToBack />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
