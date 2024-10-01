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
        small: "py-4 text-sm ",
        medium: "py-4 text-md",
        large: "py-4 text-lg"
    }

    const colorClasses = {
        primary: outline? "border border-primary text-white bg-secondary": "bg-primary text-white",
        secondary: outline? "border border-secondary text-primary": "bg-secondary text--white",
        danger: outline? "border border-red-600 text-red-600": "bg-red-600 text-white",
        custom: outline? "border border-custom text-custom": "bg-custom text-white"
    }
    return (
        <button
        className={`
            font-roboto rounded hover hover:outline-blue-500 bg-primary text-white
            ${sizeClasses[size]} 
            ${colorClasses[color]} 
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