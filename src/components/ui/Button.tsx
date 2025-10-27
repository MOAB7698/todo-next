"use client";
import styled, { css } from "styled-components";

type Variant = "primary" | "secondary" | "danger";
const variants: Record<Variant, any> = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    &:disabled { opacity: 0.6; }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: #000;
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: #fff;
  `
};

const Btn = styled.button<{ variant?: Variant }>`
  border: none;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  ${({ variant = "primary" }) => variants[variant]}
`;

export default function Button({
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <Btn variant={variant} {...props} />;
}
