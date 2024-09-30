import { ButtonProps } from "./types";
import React from "react";

export const Button: React.FC<ButtonProps> = ({
    size = "medium",
    disabled = false,
    color = "primary",
    outline = false,
    fullWidth = true,
    children,
    onClick
}) => {
    const sizeClasses = {
        small: "px-4 text-sm ",
        medium: "px-4 text-md",
        large: "px-4 text-lg"
    }

    const colorClasses = {
        primary: outline? "border border-primary text-primary": "bg-primary text-white",
        secondary: outline? "border border-secondary text-secondary": "bg-secondary text--white",
        danger: outline? "border border-red-600 text-red-600": "bg-red-600 text-white"
    }
    return (
        <button
        className={`
            font-roboto rounded hover hover:outline-blue-500 bg-primary text-white
            ${sizeClasses[size]} 
            ${colorClasses} 
            ${fullWidth ? "w-full" : "w-auto"} 
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
    )
}