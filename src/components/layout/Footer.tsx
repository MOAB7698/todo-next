"use client";
import styled from "styled-components";

const Bar = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background2};
  text-align: center;
  position: fixed;
  bottom: 0;
  text-align: center;
  min-height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px -6px 10px 0px ${({ theme }) => theme.colors.shadowDark};
}
`;

export default function Footer() {
  return <Bar> ToDo • Powered By MoHaMaD AbOuTaLeBi</Bar>;
}
