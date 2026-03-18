import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <div className={className}>
      <label className="flex items-center gap-2 cursor-pointer group">
        <input type="checkbox" className="peer hidden" {...props} />
        <div
          className="
            w-5 h-5 rounded-full border-2 border-gray-300
            peer-checked:border-primary peer-checked:bg-primary/10
            flex items-center justify-center transition-all duration-200
            group-hover:border-primary/50
          "
        >
          <div
            className="
              w-2 h-2 rounded-full bg-primary
              scale-0 peer-checked:scale-100 transition-transform duration-200
            "
          />
        </div>
      </label>
    </div>
  );
};

export { Checkbox };
