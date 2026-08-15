import React, { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:8000/api";

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const token = localStorage.getItem("token");

  // ==========================================
  // CURRENT USER
  // ==========================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Current user error:", error);
    }
  }, []);

  // ==========================================
  // GET ALL USERS
  // ==========================================

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);

      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("USERS RESPONSE:", data);

      if (data.success) {
        setUsers(data.users || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // ==========================================
  // ADMIN - GET ALL MESSAGES
  // ==========================================

  const fetchAllMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/messages/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("ADMIN MESSAGES:", data);

      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch admin messages:", error);
    }
  };

  // ==========================================
  // GET CONVERSATION
  // ==========================================

  const fetchConversation = async (userId) => {
    try {
      setLoadingMessages(true);

      const response = await fetch(`${API_URL}/messages/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("CONVERSATION:", data);

      if (data.success) {
        setMessages(data.messages || []);
      } else {
        console.error(data.message);
        setMessages([]);
      }
    } catch (error) {
      console.error("Conversation error:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // ==========================================
  // SELECT USER
  // ==========================================

  const selectUser = (user) => {
    setSelectedUser(user);

    // For both admin and normal users,
    // load the selected user's conversation.
    fetchConversation(user._id);
  };

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedUser) {
      return;
    }

    try {
      setSending(true);

      const response = await fetch(`${API_URL}/messages`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          receiver: selectedUser._id,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
        setMessage("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Send message error:", error);
    } finally {
      setSending(false);
    }
  };

  // ==========================================
  // LOAD USERS AFTER LOGIN USER IS AVAILABLE
  // ==========================================

  useEffect(() => {
    if (!currentUser || !token) return;

    fetchUsers();

    if (currentUser.role === "admin") {
      fetchAllMessages();
    }
  }, [currentUser]);

  // ==========================================
  // REMOVE CURRENT USER FROM USER LIST
  // ==========================================

  const otherUsers = useMemo(() => {
    if (!currentUser) return [];

    return users.filter(
      (user) => user._id?.toString() !== currentUser._id?.toString(),
    );
  }, [users, currentUser]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      className="messages-container"
      style={{
        width: "100%",
        height: "calc(100vh - 120px)",
        minHeight: "500px",
        display: "flex",
        background: "#0b0a12",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "18px",
        overflow: "hidden",
      }}
    >
      {/* ======================================
          USER SIDEBAR
      ====================================== */}

      <div
        className="messages-sidebar"
        style={{
          width: "300px",
          minWidth: "260px",
          background: "#11101a",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#f5f3ff",
              fontSize: "18px",
            }}
          >
            Messages
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#77738a",
              fontSize: "12px",
            }}
          >
            {currentUser?.role === "admin"
              ? "Admin communication history"
              : "Communicate with users"}
          </p>
        </div>

        {/* USERS */}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
          }}
        >
          {loadingUsers ? (
            <p
              style={{
                color: "#77738a",
                padding: "10px",
              }}
            >
              Loading users...
            </p>
          ) : otherUsers.length === 0 ? (
            <p
              style={{
                color: "#77738a",
                padding: "10px",
              }}
            >
              No other users found.
            </p>
          ) : (
            otherUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => selectUser(user)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  marginBottom: "5px",
                  border: "none",
                  borderRadius: "10px",
                  background:
                    selectedUser?._id === user._id
                      ? "rgba(124,92,255,0.14)"
                      : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {/* AVATAR */}

                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    minWidth: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg,#7655ef,#925ff4)",
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* USER INFO */}

                <div
                  style={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      color: "#eeeaf8",
                      fontSize: "13px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.name}
                  </div>

                  <div
                    style={{
                      color: "#77738a",
                      fontSize: "11px",
                      marginTop: "3px",
                    }}
                  >
                    {user.role}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ======================================
          CHAT AREA
      ====================================== */}

      <div
        className="messages-chat"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {!selectedUser ? (
          /* EMPTY */

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#77738a",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(124,92,255,0.10)",
                color: "#9b7cff",
                fontSize: "26px",
                marginBottom: "15px",
              }}
            >
              ✉
            </div>

            <h3
              style={{
                margin: 0,
                color: "#eeeaf8",
                fontSize: "16px",
              }}
            >
              Select a conversation
            </h3>

            <p
              style={{
                fontSize: "12px",
                marginTop: "7px",
              }}
            >
              Select a user to start communicating.
            </p>
          </div>
        ) : (
          <>
            {/* CHAT HEADER */}

            <div
              style={{
                minHeight: "72px",
                display: "flex",
                alignItems: "center",
                padding: "12px 22px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "#11101a",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg,#7655ef,#925ff4)",
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                {selectedUser.name?.charAt(0).toUpperCase()}
              </div>

              <div
                style={{
                  marginLeft: "12px",
                  minWidth: 0,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#eeeaf8",
                    fontSize: "14px",
                  }}
                >
                  {selectedUser.name}
                </h3>

                <span
                  style={{
                    color: "#77738a",
                    fontSize: "11px",
                  }}
                >
                  {selectedUser.email}
                </span>
              </div>
            </div>

            {/* =================================
                CHAT MESSAGES
            ================================= */}

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {loadingMessages ? (
                <div
                  style={{
                    color: "#77738a",
                    textAlign: "center",
                    marginTop: "30px",
                  }}
                >
                  Loading conversation...
                </div>
              ) : messages.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "#77738a",
                    marginTop: "30px",
                  }}
                >
                  <p>No messages yet.</p>

                  <small>Send the first message.</small>
                </div>
              ) : (
                messages.map((item) => {
                  const isMine =
                    item.sender?._id?.toString() ===
                    currentUser?._id?.toString();

                  return (
                    <div
                      key={item._id}
                      style={{
                        display: "flex",
                        justifyContent: isMine ? "flex-end" : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "65%",
                          padding: "11px 14px",
                          borderRadius: isMine
                            ? "14px 14px 3px 14px"
                            : "14px 14px 14px 3px",
                          background: isMine
                            ? "linear-gradient(135deg,#7655ef,#925ff4)"
                            : "rgba(255,255,255,0.055)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "#f5f3ff",
                          fontSize: "13px",
                          lineHeight: "1.5",
                        }}
                      >
                        {!isMine && (
                          <div
                            style={{
                              fontSize: "10px",
                              color: "#a991ff",
                              marginBottom: "4px",
                              fontWeight: "600",
                            }}
                          >
                            {item.sender?.name}
                          </div>
                        )}

                        <div>{item.message}</div>

                        <div
                          style={{
                            marginTop: "5px",
                            fontSize: "9px",
                            opacity: 0.65,
                            textAlign: "right",
                          }}
                        >
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* =================================
                INPUT
            ================================= */}

            <form
              onSubmit={sendMessage}
              style={{
                padding: "15px 20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "#11101a",
                display: "flex",
                gap: "10px",
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${selectedUser.name}...`}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: "44px",
                  padding: "0 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.035)",
                  color: "#fff",
                  outline: "none",
                  fontSize: "13px",
                }}
              />

              <button
                type="submit"
                disabled={sending || !message.trim()}
                style={{
                  width: "90px",
                  minWidth: "90px",
                  height: "44px",
                  border: "none",
                  borderRadius: "10px",
                  background:
                    sending || !message.trim()
                      ? "#302b40"
                      : "linear-gradient(135deg,#7655ef,#925ff4)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor:
                    sending || !message.trim() ? "not-allowed" : "pointer",
                }}
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* ======================================
          RESPONSIVE CSS
      ====================================== */}

      <style>
        {`
          @media (max-width: 700px) {
            .messages-container {
              height: calc(100vh - 100px) !important;
              min-height: 450px !important;
              border-radius: 12px !important;
            }

            .messages-sidebar {
              width: 90px !important;
              min-width: 90px !important;
            }

            .messages-sidebar h2 {
              font-size: 0 !important;
              text-align: center;
            }

            .messages-sidebar h2::after {
              content: "💬";
              font-size: 20px;
            }

            .messages-sidebar p {
              display: none;
            }

            .messages-sidebar button {
              justify-content: center !important;
              padding: 10px 5px !important;
            }

            .messages-sidebar button > div:last-child {
              display: none;
            }

            .messages-chat {
              min-width: 0 !important;
            }
          }

          @media (max-width: 480px) {
            .messages-container {
              height: calc(100vh - 80px) !important;
            }

            .messages-sidebar {
              width: 70px !important;
              min-width: 70px !important;
            }

            .messages-sidebar button > div:first-child {
              width: 34px !important;
              height: 34px !important;
              min-width: 34px !important;
            }

            .messages-chat form {
              padding: 10px !important;
            }

            .messages-chat form button {
              width: 65px !important;
              min-width: 65px !important;
            }

            .messages-chat > div:nth-child(2) {
              padding: 15px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Messages;
