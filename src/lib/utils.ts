import type { Task } from "@features/tasks/types";

export function groupByStatus(tasks: Task[]) {
  return {
    pending: tasks.filter(t => !t.completed),
    completed: tasks.filter(t => t.completed)
  };
}
