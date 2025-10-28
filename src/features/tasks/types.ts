export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TasksState {
  items: Task[];
  loading: boolean;
  error?: string;
  filter: "all" | "pending" | "completed";
  query: string;
}