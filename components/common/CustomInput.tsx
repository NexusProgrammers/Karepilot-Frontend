interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  type?: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  error?: string;
  touched?: boolean;
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
  error,
  touched,
}: CustomInputProps) {
  const hasError = touched && error;
  
  return (
    <div>
      <label className={`block text-xs font-medium mb-1.5 ${hasError ? 'text-red-500' : 'text-muted-foreground'}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
            hasError 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-border focus:border-foreground'
          } ${rightIcon ? 'pr-8' : ''}`}
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