import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  variant?: "default" | "base";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, className, variant = "default", ...props }, ref) => {
    // Definir estilos padrão para o input
    const defaultClasses =
      "bg-neutral-800 px-3 py-2 rounded-md w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
    const baseClasses =
      "bg-neutral-800 px-3 py-2 rounded-md w-full text-white focus:outline-none";

    const inputClasses = variant === "default" ? defaultClasses : baseClasses;

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label htmlFor={props.id} className="text-sm text-zinc-300 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${inputClasses} ${className || ""}`}
          {...props}
          type="text"
        />
        {errorMessage && (
          <p className="text-red-400 text-xs mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; // Boa prática para depuração

export default Input;
