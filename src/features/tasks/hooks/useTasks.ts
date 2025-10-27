"use client";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import { fetchTasks, updateTask, removeTask, setFilter, setQuery } from "../state/slice";
import { groupByStatus } from "@lib/utils";

export function useTasks() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, filter, query } = useSelector((s: RootState) => s.tasks);

  const load = useCallback(() => { dispatch(fetchTasks()); }, [dispatch]);
  const toggle = useCallback((id: number, completed: boolean) => { dispatch(updateTask({ id, completed })); }, [dispatch]);
  const del = useCallback((id: number) => { dispatch(removeTask({ id })); }, [dispatch]);
  const edit = useCallback((id: number, title: string) => { dispatch(updateTask({ id, title })); }, [dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items;
    if (filter === "pending") list = list.filter(t => !t.completed);
    if (filter === "completed") list = list.filter(t => t.completed);
    if (q) list = list.filter(t => t.title.toLowerCase().includes(q));
    return list;
  }, [items, filter, query]);

  const grouped = useMemo(() => groupByStatus(filtered), [filtered]);

  return {
    items, loading, grouped,
    filter, setFilter: (f: "all" | "pending" | "completed") => dispatch(setFilter(f)),
    query, setQuery: (v: string) => dispatch(setQuery(v)),
    load, toggle, del, edit
  };
}
