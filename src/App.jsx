import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import TaskManager from "@/components/pages/TaskManager";

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TaskManager />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;