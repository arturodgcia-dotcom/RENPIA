import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function ButtonLink({ href, variant = "primary", children }: ButtonLinkProps) {
  return (
    <a className={`button button--${variant}`} href={href}>
      {children}
    </a>
  );
}
