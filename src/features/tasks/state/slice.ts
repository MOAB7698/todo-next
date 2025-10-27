import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../types";

const API = "/api/tasks";

interface TasksState {
  items: Task[];
  loading: boolean;
  error?: string;
  filter: "all" | "pending" | "completed";
  query: string;
}
const initialState: TasksState = { items: [], loading: false, filter: "all", query: "" };

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetch", async () => {
  const res = await fetch(API, { cache: "no-store" });
  if (!res.ok) throw new Error("Fetch failed");
  return (await res.json()) as Task[];
});

export const addTask = createAsyncThunk<Task, { title: string }>("tasks/add", async ({ title }) => {
  const res = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, completed: false }) });
  if (!res.ok) throw new Error("Create failed");
  return (await res.json()) as Task;
});

export const updateTask = createAsyncThunk<Task, { id: number; title?: string; completed?: boolean }>(
  "tasks/update",
  async (payload) => {
    const res = await fetch(API, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error("Update failed");
    return (await res.json()) as Task;
  }
);

export const removeTask = createAsyncThunk<number, { id: number }>("tasks/remove", async ({ id }) => {
  const url = new URL(API, "http://dummy"); url.searchParams.set("id", String(id));
  const res = await fetch(url.pathname + url.search, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
  return id;
});

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<TasksState["filter"]>) { state.filter = action.payload; },
    setQuery(state, action: PayloadAction<string>) { state.query = action.payload; },
  },
  extraReducers: (b) => {
    b.addCase(fetchTasks.pending, (s) => { s.loading = true; s.error = undefined; })
     .addCase(fetchTasks.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
     .addCase(fetchTasks.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
     .addCase(addTask.fulfilled, (s, a) => { s.items.unshift(a.payload); })
     .addCase(updateTask.fulfilled, (s, a) => {
        const i = s.items.findIndex(t => t.id === a.payload.id);
        if (i >= 0) s.items[i] = a.payload;
     })
     .addCase(removeTask.fulfilled, (s, a) => { s.items = s.items.filter(t => t.id !== a.payload); });
  }
});

export const { setFilter, setQuery } = slice.actions;
export default slice.reducer;
