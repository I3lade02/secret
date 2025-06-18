import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { FaBell } from 'react-icons/fa'; // FontAwesome icon

export default function Navbar() {
  const { user, logout } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/notifications', {
          headers: { Authorization: token }
        });
        setNotifications(res.data);
        setUnreadCount(res.data.filter(n => !n.isRead).length);
      } catch (err) {
        console.error('Failed to load notifications', err);
      }
    };

    if (user) fetchNotifications();
  }, [user]);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/notifications/${id}`, {}, {
        headers: { Authorization: token }
      });

      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => prev - 1);
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">GameSwap</Link>

        <div className="d-flex align-items-center">
          {user && (
            <div className="dropdown me-3">
              <button
                className="btn btn-light position-relative"
                data-bs-toggle="dropdown"
              >
                <FaBell />
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                  </span>
                )}
              </button>

              <ul className="dropdown-menu dropdown-menu-end p-2" style={{ minWidth: '250px' }}>
                {notifications.length === 0 ? (
                  <li className="text-muted px-2">No notifications</li>
                ) : (
                  notifications.map(notif => (
                    <li
                      key={notif._id}
                      className={`dropdown-item small ${notif.isRead ? 'text-muted' : 'fw-bold'}`}
                      onClick={async () => {
                        await markAsRead(notif._id);
                        if (notif.targetUrl) {
                          window.location.href = notif.targetUrl;
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {notif.text}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}

          {user ? (
            <>
              <Link to="/profile" className="btn btn-outline-primary btn-sm me-2">Profile</Link>
              <button onClick={logout} className="btn btn-outline-secondary btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary btn-sm me-2">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
