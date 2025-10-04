interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  type?: string;
}

export function CustomInput({
  value,
  onChange,
  placeholder,
  label,
  required = false,
  type = "text",
}: CustomInputProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
      />
    </div>
  );
}