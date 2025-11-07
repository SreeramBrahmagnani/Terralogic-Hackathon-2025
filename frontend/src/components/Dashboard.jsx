// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function Dashboard() {
//   const [timeRange, setTimeRange] = useState("Today");

//   return (
//     <div className="container py-4">
//       {/* ===== Header with Time Dropdown ===== */}
//       <div
//         className="d-flex justify-content-between align-items-center mb-4 px-2"
//         style={{
//           backgroundColor: "#111827",
//           borderRadius: "10px",
//           padding: "10px 15px",
//         }}
//       >
//         <h1 className="text-light mb-0">Overview</h1>

//         {/* Dropdown Only */}
//         <select
//           className="form-select bg-dark text-light border-0"
//           style={{ width: "160px" }}
//           value={timeRange}
//           onChange={(e) => setTimeRange(e.target.value)}
//         >
//           <option>Today</option>
//           <option>This Week</option>
//           <option>This Month</option>
//           <option>This Year</option>
//         </select>
//       </div>

//       {/* ===== Summary Cards Section ===== */}
//       <div className="row g-3">
//         <div className="col-md-3">
//           <div
//             className="p-3 text-center"
//             style={{
//               backgroundColor: "#1e293b",
//               borderRadius: "12px",
//               border: "1px solid #334155",
//             }}
//           >
//             <h6 className="text-secondary mb-1">Total Tasks</h6>
//             <h3 className="text-info">124</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div
//             className="p-3 text-center"
//             style={{
//               backgroundColor: "#1e293b",
//               borderRadius: "12px",
//               border: "1px solid #334155",
//             }}
//           >
//             <h6 className="text-secondary mb-1">Completed</h6>
//             <h3 className="text-success">98</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div
//             className="p-3 text-center"
//             style={{
//               backgroundColor: "#1e293b",
//               borderRadius: "12px",
//               border: "1px solid #334155",
//             }}
//           >
//             <h6 className="text-secondary mb-1">In Progress</h6>
//             <h3 className="text-warning">18</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div
//             className="p-3 text-center"
//             style={{
//               backgroundColor: "#1e293b",
//               borderRadius: "12px",
//               border: "1px solid #334155",
//             }}
//           >
//             <h6 className="text-secondary mb-1">Blocked</h6>
//             <h3 className="text-danger">8</h3>
//           </div>
//         </div>
//       </div>

//       {/* ===== Summary Section ===== */}
//       <div
//         className="mt-4 p-3"
//         style={{
//           backgroundColor: "#0d1628",
//           border: "1px solid #1e293b",
//           borderRadius: "12px",
//         }}
//       >
//         <h5 className="text-info mb-2">🧠 Weekly Summary</h5>
//         <p className="text-light mb-0">
//           Based on the latest data, team performance has remained stable with a
//           completion rate of 79%. You can switch time ranges above to analyze
//           performance trends.
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("Today");
  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    // Generate fake data dynamically
    const generateData = () => {
      const days =
        timeRange === "Today"
          ? ["9AM", "12PM", "3PM", "6PM"]
          : timeRange === "This Week"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          : ["Week 1", "Week 2", "Week 3", "Week 4"];

      const newData = days.map((label) => ({
        name: label,
        completed: random(40, 100),
        pending: random(10, 60),
      }));

      const newProjectData = [
        { name: "Frontend", value: random(100, 300) },
        { name: "Backend", value: random(80, 250) },
        { name: "API", value: random(50, 200) },
        { name: "Testing", value: random(50, 150) },
      ];

      setData(newData);
      setProjectData(newProjectData);
    };

    generateData();
  }, [timeRange]);

  return (
    <div className="container py-4">
      {/* ===== HEADER ===== */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 px-2"
        style={{
          backgroundColor: "#111827",
          borderRadius: "10px",
          padding: "10px 15px",
        }}
      >
        <h1 className="text-light mb-0">Overview</h1>

        <select
          className="form-select bg-dark text-light border-0"
          style={{ width: "160px" }}
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div
            className="p-3 text-center"
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              border: "1px solid #334155",
            }}
          >
            <h6 className="text-secondary mb-1">Total Tasks</h6>
            <h3 className="text-info">{random(100, 150)}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="p-3 text-center"
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              border: "1px solid #334155",
            }}
          >
            <h6 className="text-secondary mb-1">Completed</h6>
            <h3 className="text-success">{random(80, 120)}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="p-3 text-center"
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              border: "1px solid #334155",
            }}
          >
            <h6 className="text-secondary mb-1">Ongoing</h6>
            <h3 className="text-warning">{random(20, 40)}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="p-3 text-center"
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              border: "1px solid #334155",
            }}
          >
            <h6 className="text-secondary mb-1">Blocked</h6>
            <h3 className="text-danger">{random(5, 15)}</h3>
          </div>
        </div>
      </div>

      {/* ===== LINE CHART ===== */}
      <div
        className="p-3 mb-4"
        style={{
          backgroundColor: "#1e293b",
          borderRadius: "12px",
          border: "1px solid #334155",
        }}
      >
        <h5 className="text-light mb-3 text-center">
          Task Progress ({timeRange})
        </h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#f59e0b"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ===== PIE CHART ===== */}
      <div
        className="p-3"
        style={{
          backgroundColor: "#1e293b",
          borderRadius: "12px",
          border: "1px solid #334155",
        }}
      >
        <h5 className="text-light mb-3 text-center">
          Tasks by Project ({timeRange})
        </h5>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={projectData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {projectData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
