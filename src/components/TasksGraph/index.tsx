import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Task } from "../../types";
import { RootState } from "../../store";
import "./index.css";

type TasksGraphProps = {
  onClose: () => void;
};

const TasksGraph = ({ onClose }: TasksGraphProps) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const completedCount = tasks.filter(
    (task: Task) => task.status.toLowerCase() === "completed"
  ).length;
  const inProgressCount = tasks.filter(
    (task: Task) => task.status.toLowerCase() === "in progress"
  ).length;
  const pendingCount = tasks.filter(
    (task: Task) => task.status.toLowerCase() === "pending"
  ).length;

  const data = [
    { name: "Completed", value: completedCount },
    { name: "In Progress", value: inProgressCount },
    { name: "Pending", value: pendingCount },
  ];

  console.log(data, "data");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  return (
    <div className="tasks-graph">
      <button className="graph-close-btn" onClick={onClose}>
        x
      </button>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TasksGraph;
