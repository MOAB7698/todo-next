"use client";
import styled from "styled-components";

const Field = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
`;

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <Field {...props} />;
}
