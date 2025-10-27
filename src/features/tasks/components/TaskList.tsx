"use client";
import TaskItem from "./TaskItem";
import { Task } from "../types";
import styled from "styled-components";
import { useTasks } from "../hooks/useTasks";

const Col = styled.div` display: flex; flex-direction: column; gap: 8px; `;

export default function TaskList({ tasks, emptyText }: { tasks: Task[]; emptyText?: string; }) {
  const { toggle, del, edit } = useTasks();
  if (!tasks.length) return <p style={{ opacity: 0.7 }}>{emptyText || "لیست خالی است."}</p>;
  return (
    <Col>
      {tasks.map(t => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={(completed) => toggle(t.id, completed)}
          onDelete={() => del(t.id)}
          onEdit={(title) => edit(t.id, title)}
        />
      ))}
    </Col>
  );
}
