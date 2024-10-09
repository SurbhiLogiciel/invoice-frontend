export interface ButtonProps {
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    color?: "primary" |"secondary" | "gray" | "draft" | "purple";
    outline?: "primary" |"secondary";
    fullWidth?: string;
    children: React.ReactNode;
    onClick?: () => void;
}