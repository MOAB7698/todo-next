"use client";
import styled from "styled-components";
import Link from "next/link";

const Bar = styled.header`
  padding: 12px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background2};
  display: flex;
  justify-content: space-between;
`;

export default function Header() {
  return (
    <Bar>
      <Link href="/">وظایف</Link>
      <nav style={{ display: "flex", gap: 12 }}>
      </nav>
    </Bar>
  );
}
