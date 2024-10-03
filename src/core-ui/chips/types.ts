import React from "react";
export interface Chips {
    size: "small"| "medium" | "large" ,
    color: "primary" | "secondary" | "danger" | "purple",
    outline: boolean,
    fullWidth?: boolean,
    disabled?: boolean,
    children?: React.ReactNode;
    onClick: () => void;
}