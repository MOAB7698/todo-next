"use client";
import styled from "styled-components";

const Bar = styled.footer`
  padding: 16px 24px;
  margin-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background2};
  text-align: center;
  opacity: 0.7;
`;

export default function Footer() {
  return <Bar> ToDo • Powered By MoHaMaD AbOuTaLeBi</Bar>;
}
