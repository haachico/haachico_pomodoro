export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  pomodoroCount: number;
  completedPomodoros: number;
  dueDate: Date;
  priority: "medium" | "high" | "low" | "";
};

export type Filters = {
  isStatusFilterOpen: boolean;
  isPriorityFilterOpen: boolean;
  selectedStatus: string;
  selectedPriority: "medium" | "high" | "low" | "";
};
