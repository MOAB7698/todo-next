"use client";

import { useEffect } from "react";
import TaskList from "@features/tasks/components/TaskList";
import AddTaskForm from "@features/tasks/components/AddTaskForm";
import { useTasks } from "@features/tasks/hooks/useTasks";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";

export default function Home() {
  const { load, loading, grouped, filter, setFilter, query, setQuery } = useTasks();

  useEffect(() => { load(); }, [load]);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", minHeight: "84vh"}}>
      <h2>لیست تسک‌ها</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8, marginBottom: 8 }}>
        <Input placeholder="جست‌وجو..." value={query} onChange={e => setQuery(e.target.value)} />
        <Button variant={filter === "all" ? "primary" : "secondary"} onClick={() => setFilter("all")}>همه</Button>
        <Button variant={filter === "pending" ? "primary" : "secondary"} onClick={() => setFilter("pending")}>فعال</Button>
        <Button variant={filter === "completed" ? "primary" : "secondary"} onClick={() => setFilter("completed")}>تکمیل شده</Button>
      </div>

      <AddTaskForm />

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <>
          <h3>فعال</h3>
          <TaskList tasks={grouped.pending} emptyText="تسک فعالی نداریم" />
          <h3 style={{ marginTop: 16 }}>تکمیل شده</h3>
          <TaskList tasks={grouped.completed} emptyText="هیچ تسک تکمیل‌شده‌ای نیست." />
        </>
      )}
    </main>
  );
}
