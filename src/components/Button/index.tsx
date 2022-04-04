import React from "react";

export type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;

};

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  disabled,
  color
}) => {
  return (
    <button
      type={ type }
        disabled={disabled}
        className={color}
        onClick={onClick}
    >
      { children }
    </button>
  );
};