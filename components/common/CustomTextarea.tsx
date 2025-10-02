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
      <label className="block text-xs font-medium text-gray-700 mb-2.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-none"
      />
    </div>
  );
}
