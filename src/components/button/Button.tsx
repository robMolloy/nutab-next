import React from "react";

type TThemeBrandColors =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "ghost";
type TThemeStateColors = "info" | "success" | "warning" | "error";
type TThemeSize = "xs" | "sm" | "md" | "lg";

type TBtnVariant = TThemeBrandColors | TThemeStateColors | "link";

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: TBtnVariant;
  size?: TThemeSize;
  outline?: boolean;
  wide?: boolean;
  children?: React.ReactNode;
};

const variantToVariantClassMap: { [k in TBtnVariant]: `btn-${k}` } = {
  neutral: "btn-neutral",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  ghost: "btn-ghost",
  link: "btn-link",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
};
const sizeToSizeClassMap: {
  [k in TThemeSize]: k extends "md" ? "" : `btn-${k}`;
} = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};
export const Button = (p: TButtonProps) => {
  const { variant, size, outline, wide, children, className, ...other } = p;
  const variantClass = variantToVariantClassMap[variant];
  const sizeClass = size ? sizeToSizeClassMap[size] : "";
  const outlineClass = !!outline ? "btn-outline" : "";
  const wideClass = !!wide ? "btn-wide" : "";

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${outlineClass} ${wideClass} ${className}`}
      {...other}
    >
      {children}
    </button>
  );
};
