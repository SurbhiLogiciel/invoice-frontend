// Button.types

export interface ButtonProps {
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    color?: string;
    outline?: boolean;
    fullWidth?: string;
    children: React.ReactNode;
    onClick?: () => void;

}