import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const COLORS = ["#8b5cf6", "#10b981", "#f59e0b"];

export default function TasksPage() {
  const [timeRange, setTimeRange] = useState("Today");
  const [teamData, setTeamData] = useState([]);
  const [tasksByProject, setTasksByProject] = useState([]);
  const [openIssues, setOpenIssues] = useState([]);

  // Utility: generate random integer
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Function to generate random data dynamically (with duplicates)
  const generateDynamicData = (range) => {
    const multiplier =
      range === "Today"
        ? 1
        : range === "This Week"
        ? 7
        : range === "This Month"
        ? 30
        : 365;

    const names = [
      "Alice Johnson",
      "Bob Smith",
      "Carol Davis",
      "David Lee",
      "Emma Wilson",
      "Grace Chen",
      "Henry Taylor",
    ];

    // Create random duplicate entries
    const newTeamData = Array.from({ length: random(8, 12) }, () => {
      const name = names[random(0, names.length - 1)];
      const assigned = random(1, 6) * multiplier;
      const completed = random(0, assigned);
      const ongoing = assigned - completed;
      const trendValue = random(-80, 100);
      const trend = `${trendValue > 0 ? "+" : ""}${trendValue}%`;
      return { name, assigned, completed, ongoing, trend };
    });

    // Generate dynamic chart values
    const projectNames = ["API Services", "Mobile App", "Web Platform"];
    const newTasksByProject = projectNames.map((project) => ({
      name: project,
      value: random(10, 60) * multiplier,
    }));

    const newOpenIssues = projectNames.map((project) => ({
      name: project,
      value: random(5, 40) * multiplier,
    }));

    // Update the state
    setTeamData(newTeamData);
    setTasksByProject(newTasksByProject);
    setOpenIssues(newOpenIssues);
  };

  // Run when timeRange changes
  useEffect(() => {
    generateDynamicData(timeRange);
  }, [timeRange]);

  return (
    <div className="container py-4">
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 px-2"
        style={{
          backgroundColor: "#111827",
          borderRadius: "10px",
          padding: "10px 15px",
        }}
      >
        <h1 className="text-light mb-0">Task Management</h1>

        <div className="d-flex align-items-center gap-2">
          {/* Upload button */}
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#3b82f6",
              border: "none",
              fontWeight: "500",
              borderRadius: "8px",
            }}
            onClick={() => document.getElementById("taskFileUpload").click()}
          >
            Upload
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            id="taskFileUpload"
            accept=".csv, .xlsx, .json"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                alert(`✅ File "${file.name}" selected successfully!`);
              }
            }}
          />
        </div>
      </div>

      {/* Table Section */}
      <div
        className="card p-3 mb-4"
        style={{ backgroundColor: "#1e293b", borderRadius: "15px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="text-light mb-0">Team Task Overview ({timeRange})</h5>
          <input
            type="text"
            className="form-control w-25 bg-dark text-light border-0"
            placeholder="Search name..."
          />
        </div>

        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Assigned</th>
              <th>Completed</th>
              <th>Ongoing</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {teamData.map((person, i) => (
              <tr key={i}>
                <td>{person.name}</td>
                <td>{person.assigned}</td>
                <td className="text-success">{person.completed}</td>
                <td className="text-warning">{person.ongoing}</td>
                <td
                  className={
                    person.trend.includes("+") ? "text-success" : "text-danger"
                  }
                >
                  {person.trend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Row */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <div
            className="card p-3"
            style={{ backgroundColor: "#1e293b", borderRadius: "15px" }}
          >
            <h5 className="text-center text-light mb-3">
              Tasks by Project ({timeRange})
            </h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={tasksByProject}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {tasksByProject.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div
            className="card p-3"
            style={{ backgroundColor: "#1e293b", borderRadius: "15px" }}
          >
            <h5 className="text-center text-light mb-3">
              Open Issues by Project ({timeRange})
            </h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={openIssues}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {openIssues.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
