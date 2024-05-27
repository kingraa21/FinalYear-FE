import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Layout from "./layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
