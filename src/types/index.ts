export type PomodoroSession = {
  startTime: string;
  endTime: string;
  duration: number;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  pomodoroTarget: number;
  pomodoroCount: number;
  completedPomodoros: number;
  dueDate: null | string;
  priority: "medium" | "high" | "low" | "";
  category: string;
  isPomodoroAllowed: boolean;
  pomodoroSessions?: PomodoroSession[];
};

export type Filters = {
  isStatusFilterOpen: boolean;
  isPriorityFilterOpen: boolean;
  isCategoryFilterOpen: boolean;
  selectedStatus: string;
  selectedPriority: "medium" | "high" | "low" | "";
  selectedCategory: string;
};

export type CreateTaskType = Omit<Task, "id">;
