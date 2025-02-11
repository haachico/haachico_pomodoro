import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TasksDashboard from "./pages/TasksDashboard";
import IntroPage from "./pages/IntroPage";
import AboutPage from "./pages/IntroPage/AboutPage";
import CreateTask from "./pages/CreateTask";
import ViewAllTasks from "./pages/ViewAllTasks";
import DetailsPage from "./pages/DetailsPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { fetchTasksThunk } from "./redux/tasks/tasksSlice";
import PomodoroPopup from "./components/Pomodoro";
import PomodoroPage from "./pages/PomodoroPage";
import EditTask from "./pages/EditTask";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(fetchTasksThunk());
    };
    fetchTasks();
  }, []);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IntroPage />} />
            <Route path="pomodoros/dashboard" element={<TasksDashboard />} />
            <Route path="aboutus" element={<AboutPage />} />
            <Route path="createTask" element={<CreateTask mode="create" />} />
            <Route path="editTask" element={<EditTask />} />
            <Route path="tasks" element={<ViewAllTasks />} />
            <Route path="task/:id" element={<DetailsPage />} />
            <Route path="/pomodoro" element={<PomodoroPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
