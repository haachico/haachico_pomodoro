import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import TasksDashboard from "./pages/TasksDashboard";
import IntroPage from "./pages/IntroPage";
import AboutPage from "./pages/IntroPage/AboutPage";
import CreateTask from "./pages/CreateTask";
import ViewAllTasks from "./pages/ViewAllTasks";
import DetailsPage from "./pages/DetailsPage";
import PomodoroPage from "./pages/PomodoroPage";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import AuthGuard from "./components/AuthGuard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// import Signup from "./pages/Singup";
import viewTaskDetailsLoader from "./Loaders/viewTaskDetailsLoader";
import viewAllTasksLoader from "./Loaders/viewAllTasksLoader";
import { setLoggedIn } from "./redux/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useEffect } from "react";
import { action } from "./actions/authAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <IntroPage /> },
      {
        element: <AuthGuard />,
        children: [
          {
            path: "pomodoros/dashboard",
            element: <TasksDashboard />,
            loader: viewAllTasksLoader,
          },
          {
            path: "createTask",
            element: <CreateTask mode="create" />,
          },
          {
            path: "editTask/:id",
            element: <EditTask />,
            loader: viewTaskDetailsLoader,
          },
          {
            path: "tasks",
            element: <ViewAllTasks />,
            loader: viewAllTasksLoader,
          },
          {
            path: "task/:id",
            element: <DetailsPage />,
            loader: viewTaskDetailsLoader,
          },
        ],
      },
      { path: "aboutus", element: <AboutPage /> },
      { path: "pomodoro", element: <PomodoroPage /> },
      { path: "login", element: <Login />, action },
      // { path: "signup", element: <Signup />, action },
    ],
  },
]);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       dispatch(setLoggedIn(true));
  //     } else {
  //       dispatch(setLoggedIn(false));
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [dispatch]);

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
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </DndProvider>
  );
}

export default App;
