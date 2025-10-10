import { Check } from "@/icons/Icons";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  id?: string;
}

export function CustomCheckbox({
  checked,
  onChange,
  label,
  id,
}: CustomCheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer" htmlFor={id}>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
            checked
              ? "bg-[#3D8C6C] border-[#3D8C6C]"
              : "bg-white border-gray-300 dark:bg-card dark:border-border"
          }`}
        >
          {checked && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
      <span className="text-sm text-card-foreground select-none">{label}</span>
    </label>
  );
}
