export interface Chips {
    size: "small"| "medium" | "large" ,
    color: "primary" | "secondary" | "danger",
    outline: boolean,
    fullWidth?: boolean,
    disabled?: boolean,
    children?: React.ReactNode;
    onClick: () => void;
}