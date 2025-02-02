import { Timestamp } from "firebase/firestore";

export type Task = {
  // id: string;
  title: string;
  description: string;
  status: string;
  pomodoroCount: number;
  completedPomodoros: number;
  dueDate: Date | Timestamp | null | "";
  priority: "medium" | "high" | "low" | "";
  category: string;
};

export type Filters = {
  isStatusFilterOpen: boolean;
  isPriorityFilterOpen: boolean;
  isCategoryFilterOpen: boolean;
  selectedStatus: string;
  selectedPriority: "medium" | "high" | "low" | "";
  selectedCategory: string;
};
