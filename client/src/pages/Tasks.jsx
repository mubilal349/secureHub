import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const token = localStorage.getItem("token");

  // ==========================================
  // FETCH TASKS
  // ==========================================

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ==========================================
  // HANDLE FORM
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // CREATE TASK
  // ==========================================

  const createTask = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prev) => [data.task, ...prev]);

        setFormData({
          title: "",
          description: "",
          priority: "Medium",
          dueDate: "",
        });

        setShowModal(false);
      } else {
        alert(data.message || "Failed to create task");
      }
    } catch (error) {
      console.error("Create task error:", error);
      alert("Something went wrong while creating the task.");
    }
  };

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? data.task : task)),
        );
      }
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error("Delete task error:", error);
    }
  };

  // ==========================================
  // TASK STATISTICS
  // ==========================================

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const overdueTasks = tasks.filter((task) => task.status === "Overdue").length;

  // ==========================================
  // PRIORITY STYLE
  // ==========================================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Critical":
        return {
          background: "rgba(239, 68, 68, 0.15)",
          color: "#ef4444",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        };

      case "High":
        return {
          background: "rgba(249, 115, 22, 0.15)",
          color: "#f97316",
          border: "1px solid rgba(249, 115, 22, 0.3)",
        };

      case "Medium":
        return {
          background: "rgba(234, 179, 8, 0.15)",
          color: "#eab308",
          border: "1px solid rgba(234, 179, 8, 0.3)",
        };

      case "Low":
        return {
          background: "rgba(34, 197, 94, 0.15)",
          color: "#22c55e",
          border: "1px solid rgba(34, 197, 94, 0.3)",
        };

      default:
        return {};
    }
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return {
          color: "#22c55e",
        };

      case "In Progress":
        return {
          color: "#3b82f6",
        };

      case "Overdue":
        return {
          color: "#ef4444",
        };

      case "Cancelled":
        return {
          color: "#94a3b8",
        };

      default:
        return {
          color: "#eab308",
        };
    }
  };

  // ==========================================
  // STAT CARD
  // ==========================================

  const statCardStyle = {
    flex: "1 1 180px",
    minWidth: "160px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.18)",
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div
      style={{
        minHeight: "100%",
        width: "100%",
        color: "#f8fafc",
        background: "transparent",
        padding: "10px 0 40px",
        boxSizing: "border-box",
      }}
    >
      {/* ======================================
          HEADER
      ====================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "28px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "28px",
              fontWeight: "700",
              color: "#ffffff",
            }}
          >
            Security Tasks
          </h1>

          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            Manage and monitor security-related tasks.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            border: "none",
            borderRadius: "10px",
            padding: "12px 18px",
            background: "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
          }}
        >
          + Add Task
        </button>
      </div>

      {/* ======================================
          STATISTICS
      ====================================== */}

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "28px",
        }}
      >
        <div style={statCardStyle}>
          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            Pending
          </div>

          <strong
            style={{
              fontSize: "30px",
              color: "#eab308",
            }}
          >
            {pendingTasks}
          </strong>
        </div>

        <div style={statCardStyle}>
          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            In Progress
          </div>

          <strong
            style={{
              fontSize: "30px",
              color: "#3b82f6",
            }}
          >
            {inProgressTasks}
          </strong>
        </div>

        <div style={statCardStyle}>
          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            Completed
          </div>

          <strong
            style={{
              fontSize: "30px",
              color: "#22c55e",
            }}
          >
            {completedTasks}
          </strong>
        </div>

        <div style={statCardStyle}>
          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            Overdue
          </div>

          <strong
            style={{
              fontSize: "30px",
              color: "#ef4444",
            }}
          >
            {overdueTasks}
          </strong>
        </div>
      </div>

      {/* ======================================
          TASK LIST
      ====================================== */}

      <div
        style={{
          background: "rgba(255, 255, 255, 0.025)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: "18px",
          padding: "20px",
        }}
      >
        {loading ? (
          <div
            style={{
              padding: "50px",
              textAlign: "center",
              color: "#94a3b8",
            }}
          >
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "42px",
                marginBottom: "12px",
              }}
            >
              ✓
            </div>

            <h3
              style={{
                margin: "0 0 8px",
                color: "#ffffff",
              }}
            >
              No tasks found
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Create your first security task.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.035)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  transition: "0.2s ease",
                }}
              >
                {/* Task Top */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      minWidth: "220px",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontSize: "17px",
                        color: "#ffffff",
                      }}
                    >
                      {task.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "#94a3b8",
                        fontSize: "13px",
                        lineHeight: "1.6",
                      }}
                    >
                      {task.description || "No description provided."}
                    </p>
                  </div>

                  {/* Priority */}

                  <span
                    style={{
                      ...getPriorityStyle(task.priority),
                      padding: "6px 11px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.4px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* Divider */}

                <div
                  style={{
                    height: "1px",
                    background: "rgba(255, 255, 255, 0.06)",
                    margin: "18px 0",
                  }}
                />

                {/* Task Bottom */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Status */}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                    }}
                  >
                    <small
                      style={{
                        color: "#64748b",
                        fontSize: "11px",
                        textTransform: "uppercase",
                      }}
                    >
                      Status
                    </small>

                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task._id, e.target.value)}
                      style={{
                        ...getStatusStyle(task.status),
                        background: "#111827",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        outline: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      <option value="Pending">Pending</option>

                      <option value="In Progress">In Progress</option>

                      <option value="Completed">Completed</option>

                      <option value="Overdue">Overdue</option>

                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Due Date */}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                    }}
                  >
                    <small
                      style={{
                        color: "#64748b",
                        fontSize: "11px",
                        textTransform: "uppercase",
                      }}
                    >
                      Due Date
                    </small>

                    <span
                      style={{
                        color: "#cbd5e1",
                        fontSize: "13px",
                        padding: "8px 0",
                      }}
                    >
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No deadline"}
                    </span>
                  </div>

                  {/* Assigned User */}

                  {task.assignedTo && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      <small
                        style={{
                          color: "#64748b",
                          fontSize: "11px",
                          textTransform: "uppercase",
                        }}
                      >
                        Assigned To
                      </small>

                      <span
                        style={{
                          color: "#cbd5e1",
                          fontSize: "13px",
                          padding: "8px 0",
                        }}
                      >
                        {task.assignedTo.name}
                      </span>
                    </div>
                  )}

                  {/* Delete */}

                  <button
                    onClick={() => deleteTask(task._id)}
                    style={{
                      marginLeft: "auto",
                      border: "1px solid rgba(239, 68, 68, 0.25)",
                      background: "rgba(239, 68, 68, 0.08)",
                      color: "#ef4444",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ======================================
          CREATE TASK MODAL
      ====================================== */}

      {showModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(4, 4, 12, 0.82)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxSizing: "border-box",
          }}
        >
          {/* =========================================
        MODAL
    ========================================= */}

          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              maxHeight: "92vh",
              overflowY: "auto",
              background: "linear-gradient(145deg, #171526 0%, #100f1c 100%)",
              border: "1px solid rgba(124, 92, 255, 0.20)",
              borderRadius: "20px",
              padding: "26px",
              boxSizing: "border-box",
              boxShadow:
                "0 30px 90px rgba(0, 0, 0, 0.65), 0 0 50px rgba(124, 92, 255, 0.08)",
            }}
          >
            {/* =========================================
          HEADER
      ========================================= */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "13px",
                }}
              >
                {/* ICON */}

                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #7655ef, #925ff4)",
                    color: "#ffffff",
                    fontSize: "20px",
                    fontWeight: "600",
                    boxShadow: "0 8px 22px rgba(118, 85, 239, 0.28)",
                  }}
                >
                  +
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#f5f3ff",
                      fontSize: "19px",
                      fontWeight: "700",
                      letterSpacing: "-0.2px",
                    }}
                  >
                    Create Security Task
                  </h2>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#77738a",
                      fontSize: "12px",
                    }}
                  >
                    Add a task to your SecureHub workflow
                  </p>
                </div>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "9px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.035)",
                  color: "#858196",
                  fontSize: "21px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.2s ease",
                }}
              >
                ×
              </button>
            </div>

            {/* =========================================
          TOP DIVIDER
      ========================================= */}

            <div
              style={{
                height: "1px",
                width: "100%",
                background:
                  "linear-gradient(90deg, rgba(124,92,255,0.18), rgba(255,255,255,0.04), transparent)",
                marginBottom: "24px",
              }}
            />

            {/* =========================================
          FORM
      ========================================= */}

            <form
              onSubmit={createTask}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {/* =====================================
            TITLE
        ===================================== */}

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#aaa5b8",
                    fontSize: "11px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                  }}
                >
                  Task Title
                  <span
                    style={{
                      color: "#9b7cff",
                      marginLeft: "4px",
                    }}
                  >
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Investigate suspicious login"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    height: "45px",
                    padding: "0 13px",
                    boxSizing: "border-box",
                    borderRadius: "9px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.035)",
                    color: "#f5f3ff",
                    outline: "none",
                    fontSize: "13px",
                    fontFamily: "inherit",
                    transition: "all 0.2s ease",
                  }}
                />
              </div>

              {/* =====================================
            DESCRIPTION
        ===================================== */}

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#aaa5b8",
                    fontSize: "11px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                  }}
                >
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Describe the security task..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  style={{
                    width: "100%",
                    minHeight: "105px",
                    padding: "12px 13px",
                    boxSizing: "border-box",
                    borderRadius: "9px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.035)",
                    color: "#f5f3ff",
                    outline: "none",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* =====================================
            PRIORITY + DATE
        ===================================== */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                {/* PRIORITY */}

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#aaa5b8",
                      fontSize: "11px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.7px",
                    }}
                  >
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      height: "45px",
                      padding: "0 12px",
                      boxSizing: "border-box",
                      borderRadius: "9px",
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "#151321",
                      color: "#e8e5f0",
                      outline: "none",
                      fontSize: "13px",
                      fontFamily: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Critical">Critical</option>

                    <option value="High">High</option>

                    <option value="Medium">Medium</option>

                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* DUE DATE */}

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#aaa5b8",
                      fontSize: "11px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.7px",
                    }}
                  >
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      height: "45px",
                      padding: "0 12px",
                      boxSizing: "border-box",
                      borderRadius: "9px",
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.035)",
                      color: "#e8e5f0",
                      outline: "none",
                      fontSize: "13px",
                      fontFamily: "inherit",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>

              {/* =====================================
            SECURITY INFO
        ===================================== */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  padding: "12px 14px",
                  borderRadius: "9px",
                  background: "rgba(124,92,255,0.055)",
                  border: "1px solid rgba(124,92,255,0.12)",
                }}
              >
                <div
                  style={{
                    width: "27px",
                    height: "27px",
                    minWidth: "27px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(124,92,255,0.12)",
                    color: "#9b7cff",
                    fontSize: "13px",
                  }}
                >
                  ✓
                </div>

                <p
                  style={{
                    margin: 0,
                    color: "#77738a",
                    fontSize: "11px",
                    lineHeight: "1.5",
                  }}
                >
                  Security tasks help track investigations, account issues, and
                  security activities.
                </p>
              </div>

              {/* =====================================
            BUTTONS
        ===================================== */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "10px",
                  paddingTop: "5px",
                }}
              >
                {/* CANCEL */}

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    height: "42px",
                    padding: "0 18px",
                    borderRadius: "9px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.035)",
                    color: "#858196",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                {/* CREATE */}

                <button
                  type="submit"
                  style={{
                    height: "42px",
                    padding: "0 20px",
                    border: "none",
                    borderRadius: "9px",
                    background:
                      "linear-gradient(135deg, #7655ef 0%, #925ff4 100%)",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 8px 22px rgba(118,85,239,0.25)",
                  }}
                >
                  + Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
