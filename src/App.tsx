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

import Signup from "./pages/Singup";
import viewTaskDetailsLoader from "./Loaders/viewTaskDetailsLoader";
import viewAllTasksLoader from "./Loaders/viewAllTasksLoader";

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
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </DndProvider>
  );
}

export default App;
