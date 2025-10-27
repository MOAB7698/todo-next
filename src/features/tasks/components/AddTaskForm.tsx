"use client";

import { useAddTask } from "../hooks/useAddTask";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

export default function AddTaskForm() {
  const { title, setTitle, submit, submitting } = useAddTask();

  return (
    <Row>
      <Input
        placeholder="عنوان تسک جدید..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()}
      />
      <Button disabled={submitting} onClick={submit}>
        افزودن
      </Button>
    </Row>
  );
}
