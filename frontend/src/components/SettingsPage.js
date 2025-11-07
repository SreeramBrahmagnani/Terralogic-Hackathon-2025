// src/components/SettingsPage.js
import React, { useState } from "react";
import "../styles/dashboard.css";

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState({
    github: "",
    internalApi: "",
    aiModelKey: "",
  });
  const [notifications, setNotifications] = useState({
    taskUpdates: true,
    aiInsights: true,
    dailyDigest: false,
  });

  const handleApiChange = (e) =>
    setApiKeys((s) => ({ ...s, [e.target.name]: e.target.value }));
  const toggle = (k) => setNotifications((s) => ({ ...s, [k]: !s[k] }));
  const save = () => alert("✅ Settings saved locally (mock).");

  return (
    <div
      className="settings-container"
      style={{ width: "100%", maxWidth: 760 }}
    >
      <h2>Settings</h2>
      <p className="subtitle">Configure API and notifications</p>

      <div className="card">
        <h3>🔐 API Configuration</h3>
        <div className="form-group">
          <label>GitHub Personal Access Token</label>
          <input
            name="github"
            type="password"
            placeholder="GitHub token"
            value={apiKeys.github}
            onChange={handleApiChange}
          />
          <small>Used for repo and issue integrations</small>
        </div>

        <div className="form-group">
          <label>Internal API Endpoint</label>
          <input
            name="internalApi"
            placeholder="https://your-backend/api"
            value={apiKeys.internalApi}
            onChange={handleApiChange}
          />
          <small>Backend link for productivity data</small>
        </div>

        <div className="form-group">
          <label>AI Model API Key</label>
          <input
            name="aiModelKey"
            type="password"
            placeholder="AI key"
            value={apiKeys.aiModelKey}
            onChange={handleApiChange}
          />
          <small>Used for AI summaries & insights</small>
        </div>

        <button className="save-btn" onClick={save}>
          Save API Keys
        </button>
      </div>

      <div className="card">
        <h3>🔔 Notifications</h3>
        <div className="toggle-row">
          <span>Task Updates</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.taskUpdates}
              onChange={() => toggle("taskUpdates")}
            />
            <span className="slider" />
          </label>
        </div>

        <div className="toggle-row">
          <span>AI Insights</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.aiInsights}
              onChange={() => toggle("aiInsights")}
            />
            <span className="slider" />
          </label>
        </div>

        <div className="toggle-row">
          <span>Daily Digest</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.dailyDigest}
              onChange={() => toggle("dailyDigest")}
            />
            <span className="slider" />
          </label>
        </div>
      </div>
    </div>
  );
}
