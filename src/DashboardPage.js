

import React, { useEffect, useState } from "react";

const DashboardPage = ({ token }) => {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setDashboard(data);
        else setError(data.message || "Failed to fetch dashboard");
      } catch {
        setError("Network error");
      }
    };
    fetchDashboard();
  }, [token]);

  // Form state for manual dashboard creation
  const [form, setForm] = useState({
    liveFeedData: "",
    currentShrimpCount: "",
    currentBiomass: "",
    currentFeedMeasurement: "",
    dateTime: "",
    countThreshold: ""
  });
  const [submitError, setSubmitError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError("");
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setDashboard(data);
      } else {
        setSubmitError(data.message || "Failed to create dashboard");
      }
    } catch {
      setSubmitError("Network error");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {!dashboard && (
        <form onSubmit={handleSubmit} style={{marginBottom:20}}>
          <h3>Create Dashboard Data</h3>
          <input name="liveFeedData" placeholder="Live Feed Data" value={form.liveFeedData} onChange={handleChange} /> <br/>
          <input name="currentShrimpCount" placeholder="Current Shrimp Count" value={form.currentShrimpCount} onChange={handleChange} /> <br/>
          <input name="currentBiomass" placeholder="Current Biomass" value={form.currentBiomass} onChange={handleChange} /> <br/>
          <input name="currentFeedMeasurement" placeholder="Current Feed Measurement" value={form.currentFeedMeasurement} onChange={handleChange} /> <br/>
          <input name="dateTime" placeholder="Date and Time" value={form.dateTime} onChange={handleChange} /> <br/>
          <input name="countThreshold" placeholder="Count Threshold" value={form.countThreshold} onChange={handleChange} /> <br/>
          <button type="submit">Create Dashboard</button>
          {submitError && <div style={{color:'red'}}>{submitError}</div>}
        </form>
      )}
      {dashboard ? (
        <div>
          <p>Current Shrimp Count: {dashboard.currentShrimpCount}</p>
          <p>Current Biomass: {dashboard.currentBiomass}</p>
          <p>Current Feed Measurement: {dashboard.currentFeedMeasurement}</p>
          <p>Count Threshold: {dashboard.countThreshold}</p>
          <p>Date and Time: {dashboard.dateTime}</p>
        </div>
      ) : (
        <p>Loading dashboard...</p>
      )}
    </div>
  );
};

export default DashboardPage;
