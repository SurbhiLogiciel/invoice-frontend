export interface ButtonProps {
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    color?: "primary" |"secondary" | "custom";
    outline?: "primary" |"secondary" | "custom";
    fullWidth?: string;
    children: React.ReactNode;
    onClick?: () => void;
}