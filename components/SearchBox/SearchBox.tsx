import React from 'react';
import InputElement from './InputElement';

export default function SearchBox() {
  const [isLocationFocused, setIsLocationFocused] = React.useState(false);
  const [isCategoryFocused, setIsCategoryFocused] = React.useState(false);
  const [isCheckInFocused, setIsCheckInFocused] = React.useState(false);
  const [isCheckOutFocused, setIsCheckOutFocused] = React.useState(false);

  const oneIsFocused =
    isLocationFocused ||
    isCategoryFocused ||
    isCheckInFocused ||
    isCheckOutFocused;

  const Divider = () => {
    return <hr className="rotate bg-gray-300 h-10 w-px" />;
  };

  return (
    <div
      className={`h-24 flex w-10/12 m-auto items-center border rounded-2xl ${
        oneIsFocused ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <InputElement
        label="Location"
        placeholder="Where are you going?"
        inputEntered={isLocationFocused}
        setInputEntered={setIsLocationFocused}
      />

      <Divider />

      <InputElement
        label="What do you need?"
        placeholder="E.g. Sony Alpha A6000"
        inputEntered={isCategoryFocused}
        setInputEntered={setIsCategoryFocused}
      />

      <Divider />

      <InputElement
        label="Check in"
        placeholder="Add a date"
        inputEntered={isCheckInFocused}
        setInputEntered={setIsCheckInFocused}
      />
      <Divider />
      <InputElement
        label="Check out"
        placeholder="Add a date"
        inputEntered={isCheckOutFocused}
        setInputEntered={setIsCheckOutFocused}
      />

      <Divider />

      <button
        className="bg-blue-400 hover:bg-blue-500 text-white px-10 py-4 rounded-xl mx-4"
        type="button"
      >
        Search
      </button>
    </div>
  );
}
