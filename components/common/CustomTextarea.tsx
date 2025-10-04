interface CustomTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  rows?: number;
}

export function CustomTextarea({
  value,
  onChange,
  placeholder,
  label,
  required = false,
  rows = 1, 
}: CustomTextareaProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-2.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground resize-none"
      />
    </div>
  );
}