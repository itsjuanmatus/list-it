import React, { useRef } from 'react';

export default function InputElement({ ...props }) {
  const {
    label,
    placeholder,
    inputEntered,
    setInputEntered,
    disabled = false,
    type = 'text',
  } = props;

  const locationRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`flex flex-col rounded-2xl ${
        inputEntered ? 'shadow-md bg-white' : 'hover:bg-gray-200 '
      } h-full justify-center pl-5 cursor-pointer w-full`}
      onClick={() => {
        // on click focus on input
        if (locationRef.current !== null) {
          locationRef.current.focus();
        }
      }}
    >
      <label className="text-sm max-w-fit font-semibold">{label}</label>
      <input
        type={type}
        className="h-8 placeholder:text-sm placeholder:font-light 
                    focus:outline-none focus:shadow-outline bg-transparent"
        placeholder={placeholder}
        onFocus={() => setInputEntered(true)}
        onBlur={() => setInputEntered(false)}
        ref={locationRef}
        disabled={disabled}
      />
    </div>
  );
}
