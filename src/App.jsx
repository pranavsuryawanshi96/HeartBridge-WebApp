import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./app/home/page.jsx";
import About from "./app/about/page.jsx";
import Dashboard from "./app/dashboard/page.jsx";
import Maintenance from './app/maintenance/page.jsx';
import TestFirebase from "./app/test-firebase/page.jsx";
import AnswerClient from "./app/answer/AnswerClient.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Maintenance />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/test-firebase" element={<TestFirebase />} />
      <Route path="/answer/:id" element={<AnswerClient />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
