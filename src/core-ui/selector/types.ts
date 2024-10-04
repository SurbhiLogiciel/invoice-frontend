export interface SelectorProps {
    options: Array<{ value: string; label: string }>; // Correct prop type
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
    fullWidth?: boolean;
}