import { ButtonProps } from "./types";
import React from "react";

export const Button: React.FC<ButtonProps> = ({
    size = "medium",
    disabled = false,
    color = "primary",
    outline = false,
    fullWidth = false,
    children,
    onClick
}) => {
    const sizeClasses = {
        small: "px-4 py-[11px] text-md",
        medium: "px-4 py-4 text-md",
        large: "px-4 py-4 text-lg"
    }

    const colorClasses = {
        primary: outline? "border border-primary text-primary": "bg-primary text-white",
        secondary: outline? "border border-secondary text-secondary": "bg-secondary text--white",
        danger: outline? "border border-red-600 text-red-600": "bg-red-600 text-white",
        draft: outline? "border border-draft text-draft": "bg-draft text-white"
    }

    const baseClass = `
    font-roboto font-bold rounded-md  text-white
    ${sizeClasses[size]} 
    ${colorClasses[color]}  
    ${fullWidth ? "w-full" : "w-auto"} 
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

    return (
        <button className={baseClass} disabled={disabled} onClick={onClick}>
            {children}
        </button>

    );
}