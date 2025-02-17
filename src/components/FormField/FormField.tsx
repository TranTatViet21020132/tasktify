import { FormFields, LoginData, SignupData } from "@/interface/Data/Data";
import { ITask } from "@/interface/Components/Tasks/Task";
import { X } from "lucide-react";
import { useRef, RefCallback, useState, useEffect } from "react";
import useTaskStore from "@/zustand/tasks/useTaskStore";

const FormField = <T extends LoginData | SignupData | Partial<ITask>>({
  type,
  placeholder,
  name,
  register,
  error,
  label,
  valueAsNumber
}: FormFields<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const { ref, onChange, ...rest } = register(name, { valueAsNumber });
  const { task } = useTaskStore();

  const combinedRef: RefCallback<HTMLInputElement> = (element) => {
    inputRef.current = element;
    ref(element);
    
    if (element && element.value.length > 0) {
      setInputValue(element.value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const handleClear = () => {
    setInputValue("");
    if (inputRef.current) {
      const event = {
        target: {
          value: "",
          name: name,
          type: type
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(event);
      inputRef.current.value = "";
    }
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (task) {
      setInputValue(task.content);
    } else {
      setInputValue("");
      if (inputRef.current) {
        const event = {
          target: {
            value: "",
            name: name,
            type: type
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        onChange(event);
        inputRef.current.value = "";
      }
      inputRef.current?.focus();
    }
  }, [name, onChange, task, type])

  return (
    <div className="flex flex-col items-start w-full gap-2 mb-2">
      <label
        htmlFor={name}
        className="text-text-light-600 dark:text-text-dark-600 font-archivo text-subheading3 font-semibold"
      >
        {label} <small className="text-red-500">*</small>
      </label>

      <div
        className={`relative inline-flex items-center justify-between placeholder:font-archivo placeholder:text-body5 border-2 font-archivo text-body5 w-full outline-none rounded-lg text-text-light-600 dark:text-text-dark-600 ${
          error
            ? "border-red-500 bg-warning-500 placeholder-text-dark-500 dark:placeholder-text-light-500"
            : "dark:bg-accent-dark-500 bg-accent-light-400 dark:border-accent-dark-500 placeholder-text-light-500 dark:placeholder-text-dark-600"
        }`}
      >
        <input
          type={type}
          placeholder={placeholder}
          required
          {...rest}
          value={inputValue}
          onChange={handleChange}
          ref={combinedRef}
          className={`w-full bg-transparent py-2 pr-8 pl-3 outline-none rounded-lg ${
            error
              ? "dark:text-text-dark-600 text-text-light-600"
              : "text-text-light-600 dark:text-text-dark-600"
          }`}
        />
        {inputValue && (
          <div
            onClick={handleClear}
            className={`flex justify-center items-center cursor-pointer h-full aspect-square absolute right-0 z-10 px-3 ${
              error
                ? "text-text-dark-600 dark:text-text-light-600"
                : "text-text-light-600 dark:text-text-dark-600"
            }`}
          >
            <X className="w-full h-full aspect-square" />
          </div>
        )}
      </div>

      {error && <span className="text-red-500 text-xs italic">{error.message}</span>}
    </div>
  );
};

export default FormField;