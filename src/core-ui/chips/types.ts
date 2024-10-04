import React from "react";
export interface ChipsProp {
    size?: "small"| "medium" | "large" ,
    color?: "primary" | "secondary" | "danger" | "purple" | "success" |"bgGreen",
    outline?: boolean,
    disabled?: boolean,
    children?: React.ReactNode;
    onClick: () => void;
}