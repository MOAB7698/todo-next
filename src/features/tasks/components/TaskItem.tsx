"use client";
import styled from "styled-components";
import { Task } from "../types";
import Input from "@components/ui/Input";
import { useState } from "react";
import BtnIcon from "@components/ui/BtnIcon";
import { Edit, Trash2, X, Check } from "@components/ui/icons";

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
  cursor: pointer;
  user-select: none;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Title = styled.span<{ completed: boolean }>`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  flex: 1;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Right = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    padding-top: 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
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

  const handleClick = () => {
    if (!editing) onToggle(!task.completed);
  };

  return (
    <Item completed={task.completed} onClick={handleClick}>
      <Left>
        <Checkbox
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(e.target.checked)}
          onClick={(e) => e.stopPropagation()}
        />
        {editing ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Title completed={task.completed}>{task.title}</Title>
        )}
      </Left>
      <Right onClick={(e) => e.stopPropagation()}>
        {editing ? (
          <>
            <BtnIcon icon={<X />} title="لغو" onClick={() => setEditing(false)} />
            <BtnIcon icon={<Check />} title="ذخیره" variant="success" onClick={save} />
          </>
        ) : (
          <>
            <BtnIcon icon={<Edit />} title="ویرایش" onClick={() => setEditing(true)} />
            <BtnIcon icon={<Trash2 />} title="حذف" variant="danger" onClick={onDelete} />
          </>
        )}
      </Right>
    </Item>
  );
}