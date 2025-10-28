"use client";
import { useEffect } from "react";
import TaskList from "@features/tasks/components/TaskList";
import AddTaskForm from "@features/tasks/components/AddTaskForm";
import TaskFilters from "@features/tasks/components/TaskFilters"; 
import { useTasks } from "@features/tasks/hooks/useTasks";

export default function Home() {
  const { load, loading, grouped, filter, setFilter, query, setQuery } = useTasks();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 900,
        margin: "0 auto",
        minHeight: "84vh",
        marginBottom: 80,
      }}
    >
      <h2>لیست تسک‌ها</h2>

      <TaskFilters
        filter={filter}
        setFilter={setFilter}
        query={query}
        setQuery={setQuery}
      />

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
