interface CustomTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder: string;
  label: string;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

export function CustomTextarea({
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  required = false,
  rows = 1,
  disabled = false,
  error,
  touched,
}: CustomTextareaProps) {
  const hasError = touched && error;
  
  return (
    <div>
      <label className={`block text-xs font-medium mb-2.5 ${hasError ? 'text-red-500' : 'text-muted-foreground'}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none ${
          hasError 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-border focus:border-foreground'
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
      {hasError && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}