interface CustomInputProps {
  name?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  type?: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}

export function CustomInput({
  name,
  value,
  onChange,
  placeholder,
  label,
  required = false,
  type = "text",
  rightIcon,
  onRightIconClick,
  error,
  touched,
  disabled = false,
  as = "input",
  rows,
}: CustomInputProps) {
  const hasError = touched && error;
  const stringValue = typeof value === "number" ? String(value) : value;
  const baseClasses =
    `w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
      hasError ? "border-red-500 focus:border-red-500" : "border-border focus:border-foreground"
    } ${rightIcon ? "pr-8" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div>
      <label
        className={`block text-xs font-medium mb-1.5 ${
          hasError ? "text-red-500" : "text-muted-foreground"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {as === "textarea" ? (
          <textarea
            name={name}
            value={stringValue}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`${baseClasses} resize-none`}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={stringValue}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={baseClasses}
          />
        )}
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="toggle-visibility"
            disabled={disabled}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
}