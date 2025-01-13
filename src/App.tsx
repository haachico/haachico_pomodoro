import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TasksDashboard from "./pages/TasksDashboard";
import IntroPage from "./pages/IntroPage";
import AboutPage from "./pages/IntroPage/AboutPage";
import CreateTask from "./pages/CreateTask";
import ViewAllTasks from "./pages/ViewAllTasks";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IntroPage />} />
            <Route path="pomodoros/dashboard" element={<TasksDashboard />} />
            <Route path="aboutus" element={<AboutPage />} />
            <Route path="createTask" element={<CreateTask />} />
            <Route path="tasks" element={<ViewAllTasks />} />
            <Route path="task/:id" element={<DetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
