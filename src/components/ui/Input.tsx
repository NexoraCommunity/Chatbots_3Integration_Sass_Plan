

interface InputProps {
  placeholder: string;
  variant?: "primary" | "secondary" | "default" | "custom" | "miniDefault";
  type?: "text" | "password" | "email" | "file";
  icon?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
const Input = ({
  placeholder,
  type = "text",
  variant = "primary",
  className,
  onChange: onchange,
  required = false
}: InputProps) => {
  const variants = {
    primary:
      "text-gray-500 rounded-xl border border-gray-[#646464] focus:outline-none focus:border-none focus:ring-2 focus:ring-[#01D2B3] p-5 h-15",
    secondary: "text-gray-500 rounded-lg border border-[#646464] focus:outline-none focus:border-none focus:ring-2 focus:ring-[#01D2B3] p-4 h-12",
    default: "focus:outline-none focus:border-none h-15",
    miniDefault: "focus:outline-none focus:border-none",
    custom: "",
  };
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${variants[variant]} w-full ${className}`}
      onChange={onchange}
      required={required}
    />
  );
};

export { Input };
