import React, { useRef } from 'react';
import { InitialInputStates } from './data/InitialInputStates';

export default function InputElement({ ...props }) {
  const {
    label,
    placeholder,
    inputStates,
    setInputStates,
    disabled = false,
    type = 'text',
    name = '',
  } = props;

  const locationRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex flex-col rounded-2xl ${
        inputStates[name]?.inputEntered === true
          ? 'shadow-md bg-white'
          : 'hover:bg-gray-200 '
      } h-full justify-center pl-5 cursor-pointer w-64`}
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
        onMouseEnter={() => {
          console.log(inputStates);
        }}
        onFocus={() =>
          setInputStates({
            ...InitialInputStates,
            [name]: {
              ...inputStates[name],
              inputEntered: true,
            },
          })
        }
        value={props.value}
        onChange={(e) => {
          setInputStates({
            ...inputStates,
            [name]: {
              ...inputStates[name],
              value: e.target.value,
            },
          });
        }}
        ref={locationRef}
        disabled={disabled}
      />
    </div>
  );
}
