export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  pomodoroCount: number;
  completedPomodoros: number;
  dueDate: string;
  priority: "medium" | "high" | "low";
};
