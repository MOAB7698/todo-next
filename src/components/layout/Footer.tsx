"use client";
import styled from "styled-components";

const Bar = styled.footer`
  padding: 16px 24px;
  margin-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  opacity: 0.7;
`;

export default function Footer() {
  return <Bar>© {new Date().getFullYear()} ToDo</Bar>;
}
