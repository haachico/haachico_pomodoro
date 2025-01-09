import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TasksDashboard from "./pages/TasksDashboard";
import IntroPage from "./pages/IntroPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IntroPage />} />
          <Route path="/pomodoros/dashboard" element={<TasksDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
