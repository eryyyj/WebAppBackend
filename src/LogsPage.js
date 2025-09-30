import React, { useEffect, useState } from "react";

const LogsPage = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/biomass-records", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setLogs(data);
        else setError(data.message || "Failed to fetch logs");
      } catch {
        setError("Network error");
      }
    };
    fetchLogs();
  }, [token]);

  return (
    <div>
      <h2>Biomass Records (Logs)</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <ul>
        {logs.length === 0 ? <li>No logs yet.</li> : logs.map((log, i) => <li key={i}>{JSON.stringify(log)}</li>)}
      </ul>
    </div>
  );
};

export default LogsPage;
