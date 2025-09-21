import React, { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode; // Button text or content
    size?: "xs" | "sm" | "md"; // Button size
    type?: "button" | "submit" | "reset"; // Button types
    variant?: "primary" | "outline" | "default"; // Button variant
    startIcon?: ReactNode; // Icon before the text
    endIcon?: ReactNode; // Icon after the text
    onClick?: () => void; // Click handler
    disabled?: boolean; // Disabled state
    className?: string; // Disabled state
}

const Button: React.FC<ButtonProps> = ({
    children,
    size = "md",
    variant = "primary",
    type = "submit",
    startIcon,
    endIcon,
    onClick,
    className = "",
    disabled = false,
}) => {
    // Size Classes
    const sizeClasses = {
        xs: "px-3 py-2 text-xs",
        sm: "px-4 py-3 text-sm",
        md: "px-5 py-3.5 text-sm",
    };

    // Variant Classes
    const variantClasses = {
        primary:
            "bg-bite-tongue text-white shadow-theme-xs hover:bg-happy-hearts disabled:bg-brand-300",
        outline:
            "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
        default:
            "",
    };

    return (
        <button
            className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${sizeClasses[size]
                } ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""
                }`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {startIcon && <span className="flex items-center">{startIcon}</span>}
            {children}
            {endIcon && <span className="flex items-center">{endIcon}</span>}
        </button>
    );
};

export default Button;
