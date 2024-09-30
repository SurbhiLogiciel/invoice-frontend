// Button.types

export interface ButtonProps {
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    color?: "primary" | "secondary" | "danger" | "draft";
    outline?: boolean;
    fullWidth?: string;
    children: React.ReactNode;
    onClick?: () => void;

}