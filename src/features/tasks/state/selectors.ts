import { RootState } from "@store/store";
import { Task } from "../types";

export const selectTasks = (s: RootState) => s.tasks.items;

export const selectPending = (s: RootState): Task[] =>
  s.tasks.items.filter(t => !t.completed);

export const selectCompleted = (s: RootState): Task[] =>
  s.tasks.items.filter(t => t.completed);
