"use client";
import styled from "styled-components";
import { Task } from "../types";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { useState } from "react";

const Item = styled.div<{ completed: boolean }>`
  background: ${({ completed, theme }) => (completed ? theme.colors.successSoft : theme.colors.surface)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`;

const Title = styled.span<{ completed: boolean }>`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

export default function TaskItem({
  task, onToggle, onDelete, onEdit
}: {
  task: Task;
  onToggle: (completed: boolean) => void;
  onDelete: () => void;
  onEdit: (title: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const save = () => {
    const t = value.trim();
    if (t && t !== task.title) onEdit(t);
    setEditing(false);
  };

  return (
    <Item completed={task.completed}>
      <div style={{ flex: 1, display: "flex", gap: 10, alignItems: "center" }}>
        {editing ? (
          <Input value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === "Enter" && save()} />
        ) : (
          <Title completed={task.completed}>{task.title}</Title>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {editing ? (
          <>
            <Button variant="secondary" onClick={() => setEditing(false)}>لغو</Button>
            <Button onClick={save}>ذخیره</Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => onToggle(!task.completed)}>
              {task.completed ? "Mark Pending" : "Mark Done"}
            </Button>
            <Button variant="secondary" onClick={() => setEditing(true)}>ویرایش</Button>
            <Button variant="danger" onClick={onDelete}>حذف</Button>
          </>
        )}
      </div>
    </Item>
  );
}
