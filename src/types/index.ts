export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  pomodoroCount: number;
  completedPomodoros: number;
  dueDate: Date | null;
  priority: "medium" | "high" | "low" | "";
};

export type Filters = {
  isStatusFilterOpen: boolean;
  isPriorityFilterOpen: boolean;
  selectedStatus: string;
  selectedPriority: "medium" | "high" | "low" | "";
};
