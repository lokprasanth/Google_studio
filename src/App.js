import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Studio from "./pages/Studio";           
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ApiKeyDashboard from "./pages/ApiKeyDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Default landing page */}
        <Route index element={<Homepage />} />

        {/* Studio Route */}
        <Route path="studio" element={<Studio />} />

        {/* Redirect /apikey to nested dashboard route */}
        <Route path="apikey" element={<Navigate to="/dashboard/api-key" replace />} />

        {/* Dashboard with nested route */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="api-key" replace />} />
          <Route path="api-key" element={<ApiKeyDashboard />} />
        </Route>

        {/* Optional: 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
