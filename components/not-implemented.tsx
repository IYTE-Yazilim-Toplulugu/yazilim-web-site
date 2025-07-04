import { AlertTriangle, Code, Wrench } from "lucide-react";

interface NotImplementedProps {
    feature?: string;
    description?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "card" | "minimal";
}

export default function NotImplemented({
    feature = "This feature",
    description = "This functionality is currently under development and will be available soon.",
    size = "md",
    variant = "default"
}: NotImplementedProps) {
    const sizeClasses = {
        sm: "p-4 text-sm",
        md: "p-6 text-base",
        lg: "p-8 text-lg"
    };

    const iconSizes = {
        sm: 16,
        md: 20,
        lg: 24
    };

    if (variant === "minimal") {
        return (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Code size={iconSizes[size]} />
                <span className="text-sm font-medium">{feature} - Coming Soon</span>
            </div>
        );
    }

    if (variant === "card") {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className={`text-center ${sizeClasses[size]}`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                        <Wrench size={iconSizes[size]} className="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/10 rounded-full text-sm font-medium text-yellow-700 dark:text-yellow-300">
                        <AlertTriangle size={14} />
                        Under Development
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className={`flex items-start gap-3 ${sizeClasses[size]}`}>
                <div className="flex-shrink-0">
                    <AlertTriangle size={iconSizes[size]} className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                        {feature} - Not Implemented
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
