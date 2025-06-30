import { useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Label from '@/components/admin/form/Label';
import { CalenderIcon } from '@/components/admin/icons';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
    id: string;
    mode?: "single" | "multiple" | "range" | "time";
    onChange?: Hook | Hook[];
    defaultDate?: DateOption;
    label?: string;
    placeholder?: string;
};

export default function DatePicker({
    id,
    mode,
    onChange,
    label,
    defaultDate,
    placeholder,
}: PropsType) {
    useEffect(() => {
        const flatPickr = flatpickr(`#${id}`, {
            mode: mode || "single",
            static: true,
            monthSelectorType: "static",
            enableTime: true,              // ✅ Enable time input
            time_24hr: true,               // ✅ Optional: 24-hour format
            dateFormat: "Y-m-d H:i",       // ✅ Include time in format
            defaultDate,
            onChange,
        });

        return () => {
            if (!Array.isArray(flatPickr)) {
                flatPickr.destroy();
            }
        };
    }, [mode, onChange, id, defaultDate]);

    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}

            <div className="relative">
                <input
                    id={id}
                    placeholder={placeholder}
                    className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-hidden focus:ring-3  dark:bg-background dark:placeholder:text-primary/30 bg-background border-border focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
                />

                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none top-1/2 dark:text-gray-400">
                    <CalenderIcon className="size-6" />
                </span>
            </div>
        </div>
    );
}
