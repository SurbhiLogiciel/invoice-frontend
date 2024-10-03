import { Chips } from "./types";
import React from "react";

export const PaidChip: React.FC<Chips> = ({
   size="small",
   color="danger",
   outline=true,
   fullWidth= false,
   disabled=false,
   children,
   onClick

}) => {
    const sizeClasses = {
        small: "px-5 py-2 text-sm",
        medium: "px-5 py-2  text-md",
        large: "px-5 py-2  text-lg",
    };

    const colorClasses = {
        primary: outline ? "border border-primary text-white bg-secondary" : "bg-primary text-white",
        secondary: outline ? "border border-secondary text-primary" : "bg-secondary text-white",
        danger: outline ? "border border-red-600 text-red-600" : "bg-red-600 text-white",
    };

    const classNames = [
        "font-roboto my-[25px]",
        sizeClasses[size],
        colorClasses[color],
        fullWidth ? "w-full" : "w-auto",
        disabled ? "opacity-50 cursor-not-allowed" : ""
    ].filter(Boolean).join(' ');

    return (
        <div className={classNames} onClick={onClick}>
        <h2 className="">Invoice Details</h2>
        {children}
      </div>
    )
}