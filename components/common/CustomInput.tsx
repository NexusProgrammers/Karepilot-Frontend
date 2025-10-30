interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  type?: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export function CustomInput({
  value,
  onChange,
  placeholder,
  label,
  required = false,
  type = "text",
  rightIcon,
  onRightIconClick,
}: CustomInputProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-0 py-2.5 bg-transparent border-0 border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground ${rightIcon ? 'pr-8' : ''}`}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="toggle-visibility"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
}