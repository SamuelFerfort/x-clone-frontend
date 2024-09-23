import { useState } from 'react';

const StyledFormInput = ({ label, value, onChange, maxLength, isTextArea = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const InputComponent = isTextArea ? 'textarea' : 'input';

  return (
    <div 
      className={`border rounded-md px-3 py-1 flex flex-col transition-colors duration-200 ${
        isFocused ? 'border-btn-blue' : 'border-white/20'
      } ${isTextArea ? 'h-20 mt-8' : 'h-14 mt-20'}`}
    >
      <div className="flex justify-between">
        <label 
          htmlFor={label.toLowerCase()} 
          className={`transition-colors duration-200 ${
            isFocused ? 'text-btn-blue' : 'text-white/40'
          }`}
        >
          {label}
        </label>
        <span className="text-white/40 text-sm">{value.length}/{maxLength}</span>
      </div>
      <InputComponent
        type="text"
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= maxLength || e.target.value.length < value.length) {
            onChange(e.target.value);
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name={label.toLowerCase()}
        placeholder={isTextArea ? "I like turtles..." : ""}
        className="bg-black outline-none w-full text-white resize-none placeholder:text-white/40"
      />
    </div>
  );
};

export default StyledFormInput