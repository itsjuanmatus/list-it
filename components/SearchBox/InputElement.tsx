import React, { useRef } from 'react';
import { InitialInputStates } from './data/InitialInputStates';
import { actions } from './state/actions';

export default function InputElement({ ...props }) {
  const {
    label,
    placeholder,
    inputStates,
    dispatch,
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
      } h-full justify-center pl-5 cursor-pointer w-[17vw]`}
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
        onFocus={() => dispatch(actions.inputEnteredTrue(name))}
        value={inputStates[name]?.value}
        onChange={(e) => {
          dispatch(actions.inputChanged(name, e.target.value));
        }}
        ref={locationRef}
        disabled={disabled}
      />
    </div>
  );
}
