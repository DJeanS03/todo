import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, errorMessage, className, ...props }, ref) => {
    const defaultClasses =
      "bg-neutral-800 px-3 py-2 rounded-md w-full resize-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label htmlFor={props.id} className="text-sm text-zinc-300 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${defaultClasses} ${className || ""}`}
          {...props}
        />
        {errorMessage && (
          <p className="text-red-400 text-xs mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
