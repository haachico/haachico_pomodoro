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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchTasksThunk, setLoggedIn } from "./redux/tasks/tasksSlice";
import PomodoroPage from "./pages/PomodoroPage";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import AuthGuard from "./components/AuthGuard";
import TasksGraph from "./pages/TasksGraph";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.tasks.isLoggedIn);

  console.log(isLoggedIn, "is logged in");
  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(fetchTasksThunk());
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(setLoggedIn(true));
        sessionStorage.setItem("token", user.refreshToken);
      } else {
        // User is signed out
        dispatch(setLoggedIn(false));
        sessionStorage.removeItem("token");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IntroPage />} />

          <Route element={<AuthGuard />}>
            <Route path="pomodoros/dashboard" element={<TasksDashboard />} />
            <Route path="createTask" element={<CreateTask mode="create" />} />
            <Route path="editTask/:id" element={<EditTask />} />
            <Route path="tasks" element={<ViewAllTasks />} />
            <Route path="task/:id" element={<DetailsPage />} />
          </Route>

          <Route path="aboutus" element={<AboutPage />} />

          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
