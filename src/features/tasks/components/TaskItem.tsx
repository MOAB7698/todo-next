"use client";
import styled from "styled-components";
import { Task } from "../types";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { useState } from "react";

const Item = styled.div<{ completed: boolean }>`
  background: ${({ completed, theme }) =>
    completed ? theme.colors.successSoft : theme.colors.surface};
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
  flex: 1;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const Right = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
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
      <Left>
        {/* ✅ چک‌باکس برای تغییر وضعیت */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(e.target.checked)}
          style={{ width: 18, height: 18 }}
        />

        {editing ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            autoFocus
          />
        ) : (
          <Title completed={task.completed}>{task.title}</Title>
        )}
      </Left>

      <Right>
        {editing ? (
          <>
            <Button variant="secondary" onClick={() => setEditing(false)}>
              لغو
            </Button>
            <Button onClick={save}>ذخیره</Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setEditing(true)}>
              ویرایش
            </Button>
            <Button variant="danger" onClick={onDelete}>
              حذف
            </Button>
          </>
        )}
      </Right>
    </Item>
  );
}
