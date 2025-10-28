"use client";

import styled, { css } from "styled-components";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: number;
  title?: string;
};

const StyledBtn = styled.button<{ variant: string; size: number }>`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 6px;
  transition: background 0.2s ease, color 0.2s ease;
  user-select: none;

  ${({ variant, theme }) => {
    switch (variant) {
      case "success":
        return css`
          color: ${theme.colors.success};
          &:hover {
            background: ${theme.colors.successSoft};
          }
        `;
      case "danger":
        return css`
          color: ${theme.colors.danger};
          &:hover {
            background: ${theme.colors.dangerSoft};
          }
        `;
      case "primary":
        return css`
          color: ${theme.colors.primary};
          &:hover {
            background: ${theme.colors.primarySoft};
          }
        `;
      case "secondary":
        return css`
          color: ${theme.colors.text};
          &:hover {
            background: ${theme.colors.secondary};
          }
        `;
      default:
        return css`
          color: ${theme.colors.text};
          &:hover {
            background: ${theme.colors.border};
          }
        `;
    }
  }}

  width: ${({ size }) => size + 8}px;
  height: ${({ size }) => size + 8}px;
`;

export default function BtnIcon({
  icon,
  variant = "secondary",
  size = 18,
  title,
  ...rest
}: Props) {
  return (
    <StyledBtn variant={variant} size={size} title={title} {...rest}>
      {icon}
    </StyledBtn>
  );
}
