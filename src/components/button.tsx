import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "close" | "success" | "normal";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-yellow-300 text-text-title hover:bg-neutral-white-900",
    secondary: "bg-gray-600 text-text-title hover:bg-gray-300",
    danger: "bg-red-500 text-text-title hover:bg-red-600",
    close: "bg-button-gray text-text-title hover:bg-neutral-white-900",
    success: "bg-button-green text-text-title hover:bg-green-300",
    normal: "text-text-title border border-yellow-500",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
