import React from 'react';
import InputElement from './InputElement';

export default function SearchBox() {
  // this is the schema for the input states
  interface inputStateType {
    name: string;
    label: string;
    placeholder: string;
    inputEntered: boolean;
    value: string;
  }

  const [inputStates, setInputStates] = React.useState<{
    [key: string]: inputStateType;
  }>({
    location: {
      name: 'location',
      label: 'Location',
      placeholder: 'Where are you going?',
      inputEntered: false,
      value: '',
    },
    category: {
      name: 'category',
      label: 'What do you need?',
      placeholder: 'E.g. Sony Alpha A6000',
      inputEntered: false,
      value: '',
    },
    checkIn: {
      name: 'checkIn',
      label: 'Check in',
      placeholder: 'Check in date',
      inputEntered: false,
      value: '',
    },
    checkOut: {
      name: 'checkOut',
      label: 'Check out',
      placeholder: 'Check out date',
      inputEntered: false,
      value: '',
    },
  });

  const oneIsFocused =
    inputStates.location.inputEntered ||
    inputStates.category.inputEntered ||
    inputStates.checkIn.inputEntered ||
    inputStates.checkOut.inputEntered;

  const Divider = () => {
    return <hr className="rotate bg-gray-300 h-10 w-px" />;
  };

  return (
    <div
      className={`h-24 flex w-10/12 m-auto items-center border rounded-2xl ${
        oneIsFocused ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div
        className="relative h-full"
        onClick={() => {
          setInputStates({
            ...inputStates,
            location: {
              ...inputStates.location,
              inputEntered: true,
            },
          });
        }}
      >
        <InputElement
          label="Location"
          placeholder="Where are you going?"
          inputStates={inputStates}
          setInputStates={setInputStates}
          name={inputStates.location.name}
        />
        <div
          className={
            'absolute mt-5 h-64 w-64 bg-white ' +
            (inputStates.location.inputEntered ? 'opacity-100' : 'opacity-0')
          }
          onBlur={() => {
            setInputStates({
              ...inputStates,
              [inputStates.location.name]: {
                ...inputStates[inputStates.location.name],
                inputEntered: false,
              },
            });
          }}
        >
          <h1 className="text-black"> Hola </h1>
        </div>
      </div>

      <Divider />

      <InputElement
        label="What do you need?"
        placeholder="E.g. Sony Alpha A6000"
        inputStates={inputStates}
        setInputStates={setInputStates}
        name={inputStates.category.name}
      />

      <Divider />

      <InputElement
        label="Check in"
        placeholder="Add a date"
        inputStates={inputStates}
        setInputStates={setInputStates}
        name={inputStates.checkIn.name}
      />
      <Divider />
      <InputElement
        label="Check out"
        placeholder="Add a date"
        inputStates={inputStates}
        setInputStates={setInputStates}
        name={inputStates.checkOut.name}
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
