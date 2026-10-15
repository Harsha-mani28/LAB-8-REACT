
import { useState } from "react";
import "./App.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (username.trim().length < 3) {
      setError("Username must contain at least 3 characters.");
      return;
    }

    if (password.length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    onLogin(username.trim());
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="brand-icon">SP</div>
        <h1>Student Portal</h1>
        <p className="muted">Sign in to continue</p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          autoComplete="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {error && <p className="error">{error}</p>}

        <button className="primary full-width" type="submit">
          Login
        </button>

        <p className="hint">
          Demo only: enter any username and a password of 4 or more characters.
        </p>
      </form>
    </div>
  );
}

function Dashboard({ username }) {
  const stats = [
    { title: "Courses", value: "6", icon: "📚" },
    { title: "Assignments", value: "12", icon: "📝" },
    { title: "Attendance", value: "92%", icon: "📊" },
  ];

  return (
    <>
      <div className="welcome-banner">
        <div>
          <p className="eyebrow">STUDENT OVERVIEW</p>
          <h1>Welcome back, {username}!</h1>
          <p>Here is your student portal overview.</p>
        </div>
        <div className="welcome-emoji">🎓</div>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <div className="stat-card" key={item.title}>
            <span className="stat-icon">{item.icon}</span>
            <p>{item.title}</p>
            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      <section className="panel">
        <h2>Recent Activities</h2>
        <div className="activity">
          <span>✓</span>
          <div>
            <strong>Student portal accessed</strong>
            <p>Your dashboard is ready to use.</p>
          </div>
        </div>
        <div className="activity">
          <span>📘</span>
          <div>
            <strong>Learning progress</strong>
            <p>Check your courses and assignments regularly.</p>
          </div>
        </div>
        <div className="activity">
          <span>👤</span>
          <div>
            <strong>Profile management</strong>
            <p>Keep your student information updated.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Profile({ username, setUsername }) {
  const [name, setName] = useState(username);
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("Computer Science");
  const [message, setMessage] = useState("");

  function saveProfile(e) {
    e.preventDefault();
    setUsername(name.trim());
    setMessage("Profile updated successfully!");
  }

  return (
    <section className="panel profile-panel">
      <div className="profile-heading">
        <div className="avatar">
          {(name || username).charAt(0).toUpperCase()}
        </div>
        <div>
          <h1>My Profile</h1>
          <p className="muted">Manage your student information</p>
        </div>
      </div>

      <form onSubmit={saveProfile} className="profile-form">
        <label htmlFor="profileName">Full Name / Username</label>
        <input
          id="profileName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={3}
          required
        />

        <label htmlFor="profileEmail">Email Address</label>
        <input
          id="profileEmail"
          type="email"
          placeholder="student@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="profileCourse">Course</label>
        <select
          id="profileCourse"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option>Computer Science</option>
          <option>Information Technology</option>
          <option>Electronics</option>
          <option>Mechanical Engineering</option>
        </select>

        <label>Account Type</label>
        <input value="Student" readOnly />

        {message && <p className="success">{message}</p>}

        <button type="submit" className="primary">
          Save Profile
        </button>
      </form>
    </section>
  );
}

export default function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("Dashboard");

  function logout() {
    setLoggedIn(false);
    setPage("Dashboard");
    setUsername("");
  }

  if (!loggedIn) {
    return <Login onLogin={(name) => {
      setUsername(name);
      setLoggedIn(true);
    }} />;
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon small">SP</span>
          <span>Student Portal</span>
        </div>

        <p className="nav-label">MENU</p>

        <button
          className={page === "Dashboard" ? "nav-button active" : "nav-button"}
          onClick={() => setPage("Dashboard")}
        >
          <span>▦</span> Dashboard
        </button>

        <button
          className={page === "Profile" ? "nav-button active" : "nav-button"}
          onClick={() => setPage("Profile")}
        >
          <span>👤</span> My Profile
        </button>

        <div className="sidebar-bottom">
          <div className="user-summary">
            <div className="avatar small-avatar">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{username}</strong>
              <p>Student Account</p>
            </div>
          </div>

          <button className="logout-button" onClick={logout}>
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="muted">Student Workspace</p>
            <h2>{page}</h2>
          </div>
          <div className="topbar-user">
            <span className="online-dot"></span>
            {username}
          </div>
        </header>

        <div className="page-content">
          {page === "Dashboard" ? (
            <Dashboard username={username} />
          ) : (
            <Profile username={username} setUsername={setUsername} />
          )}
        </div>

        <footer className="footer">
          Student Portal · React Application
        </footer>
      </main>
    </div>
  );
}
