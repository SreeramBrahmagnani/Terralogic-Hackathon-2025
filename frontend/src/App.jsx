// // // src/App.js
// // import React from "react";
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   NavLink,
// // } from "react-router-dom";
// // import Queries from "./components/Queries";
// // import SettingsPage from "./components/SettingsPage";
// // import "./styles/dashboard.css";

// // export default function App() {
// //   return (
// //     <Router>
// //       <div className="queries-wrapper">
// //         {/* ===== FIXED HEADER ===== */}
// //         <header className="fixed-header">
// //           <div className="brand">
// //             <h1>TEAM SYNC•</h1>
// //             <p>AI-powered Productivity Dashboard</p>
// //           </div>

// //           {/* ===== MENU LINKS (NavLink gives active class) ===== */}
// //           <nav>
// //             <NavLink to="/overview">Overview</NavLink>
// //             <NavLink to="/tasks">Tasks</NavLink>
// //             <NavLink to="/insights">AI Insights</NavLink>

// //             {/* `end` prevents /queries staying active when children routes exist */}
// //             <NavLink
// //               to="/queries"
// //               end
// //               className={({ isActive }) => (isActive ? "active" : "")}
// //             >
// //               Queries
// //             </NavLink>

// //             <NavLink
// //               to="/settings"
// //               className={({ isActive }) => (isActive ? "active" : "")}
// //             >
// //               Settings
// //             </NavLink>
// //           </nav>

// //           <div className="profile">SJ</div>
// //         </header>

// //         {/* ===== PAGE SWITCH AREA ===== */}
// //         <main className="settings-main">
// //           <Routes>
// //             <Route path="/" element={<Queries />} />
// //             <Route path="/queries" element={<Queries />} />
// //             <Route path="/settings" element={<SettingsPage />} />
// //             {/* optional placeholders */}
// //             <Route
// //               path="/overview"
// //               element={
// //                 <div style={{ padding: 20 }}>Overview (placeholder)</div>
// //               }
// //             />
// //             <Route
// //               path="/tasks"
// //               element={<div style={{ padding: 20 }}>Tasks (placeholder)</div>}
// //             />
// //             <Route
// //               path="/insights"
// //               element={
// //                 <div style={{ padding: 20 }}>AI Insights (placeholder)</div>
// //               }
// //             />
// //           </Routes>
// //         </main>
// //       </div>
// //     </Router>
// //   );
// // }
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   NavLink,
// } from "react-router-dom";
// import Queries from "./components/Queries";
// import SettingsPage from "./components/SettingsPage";
// import AIInsights from "./components/AIInsights";
// import "./styles/dashboard.css";

// export default function App() {
//   return (
//     <Router>
//       <div className="queries-wrapper">
//         {/* ===== FIXED HEADER ===== */}
//         <header className="fixed-header">
//           <div className="brand">
//             <h1>TEAM SYNC•</h1>
//             <p>AI-powered Productivity Dashboard</p>
//           </div>

//           <nav>
//             <NavLink to="/overview">Overview</NavLink>
//             <NavLink to="/tasks">Tasks</NavLink>
//             <NavLink to="/insights">AI Insights</NavLink>
//             <NavLink
//               to="/queries"
//               end
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               Queries
//             </NavLink>
//             <NavLink
//               to="/settings"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               Settings
//             </NavLink>
//           </nav>

//           <div className="profile">SJ</div>
//         </header>

//         {/* ===== MAIN CONTENT AREA ===== */}
//         <main className="settings-main">
//           <Routes>
//             <Route path="/" element={<Queries />} />
//             <Route path="/queries" element={<Queries />} />
//             <Route path="/settings" element={<SettingsPage />} />
//             <Route path="/insights" element={<AIInsights />} />
//             <Route
//               path="/overview"
//               element={
//                 <div style={{ color: "#94a3b8" }}>
//                   Overview Page (coming soon)
//                 </div>
//               }
//             />
//             <Route
//               path="/tasks"
//               element={
//                 <div style={{ color: "#94a3b8" }}>Tasks Page (coming soon)</div>
//               }
//             />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TasksPage from "./components/TasksPage";
import Queries from "./components/Queries";
import SettingsPage from "./components/SettingsPage";
import AIInsights from "./components/AIInsights";
import "./styles/dashboard.css";

export default function App() {
  return (
    <Router>
      <div className="queries-wrapper">
        {/* ===== FIXED HEADER ===== */}
        <header className="fixed-header">
          <div className="brand">
            <h1>TEAM SYNC•</h1>
            <p>AI-powered Productivity Dashboard</p>
          </div>

          <nav>
            <NavLink
              to="/overview"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Overview
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Tasks
            </NavLink>
            <NavLink
              to="/insights"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              AI Insights
            </NavLink>
            <NavLink
              to="/queries"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Queries
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Settings
            </NavLink>
          </nav>

          <div className="profile">SJ</div>
        </header>

        {/* ===== MAIN CONTENT AREA ===== */}
        <main className="settings-main">
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Dashboard />} />

            {/* Pages */}
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/queries" element={<Queries />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/insights" element={<AIInsights />} />

            {/* Fallback */}
            <Route
              path="*"
              element={
                <div style={{ color: "#94a3b8", padding: "2rem" }}>
                  Page not found
                </div>
              }
            />
          </Routes>
        </main>

        {/* ===== FOOTER ===== */}
        <footer
          style={{
            textAlign: "center",
            padding: "12px 0",
            borderTop: "1px solid #1e293b",
            backgroundColor: "#0d1628",
            color: "#64748b",
          }}
        >
          <small>© 2025 TEAM SYNC — AI Productivity Dashboard</small>
        </footer>
      </div>
    </Router>
  );
}
