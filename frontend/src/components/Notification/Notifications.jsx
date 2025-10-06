import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/notification",
          {
            withCredentials: true,
          }
        );
        console.log("Fetched Notifications:", response.data); // Log the fetched notifications
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/notification/${id}/read`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(`Marked notification ${id} as read`); // Log marking as read
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div>
      <h3>Your Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            style={{
              background: notification.read ? "#f0f0f0" : "#e0f7fa",
              padding: "10px",
              margin: "5px 0",
              borderRadius: "5px",
            }}
          >
            <p>{notification.message}</p>
            {!notification.read && (
              <button
                onClick={() => handleMarkAsRead(notification._id)}
                style={{
                  background: "#00796b",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
