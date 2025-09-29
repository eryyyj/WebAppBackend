

import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import DashboardPage from "./DashboardPage";
import LogsPage from "./LogsPage";

const App = () => {
    const [page, setPage] = useState("login");
    const [token, setToken] = useState("");

    if (!token) {
        if (page === "login") return <LoginPage setPage={setPage} setToken={setToken} />;
        if (page === "signup") return <SignupPage setPage={setPage} setToken={setToken} />;
    }

    return (
        <div>
            <nav>
                <button onClick={() => setPage("dashboard")}>Dashboard</button>
                <button onClick={() => setPage("logs")}>Logs</button>
                <button onClick={() => { setToken(""); setPage("login"); }}>Logout</button>
            </nav>
            {page === "dashboard" && <DashboardPage token={token} />}
            {page === "logs" && <LogsPage token={token} />}
        </div>
    );
};

export default App;
