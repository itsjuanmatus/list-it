import React, { useEffect, useRef, useReducer } from 'react';
import { InputStatesObjectType } from '../../types/Searchbox/InputStateType';
import { InitialInputStates } from './data/InitialInputStates';
import InputElement from './InputElement';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import { City } from '../../types/location/City';

export default function SearchBox() {
  const [inputStates, setInputStates] =
    React.useState<InputStatesObjectType>(InitialInputStates);

  const oneIsFocused =
    inputStates.location.inputEntered ||
    inputStates.category.inputEntered ||
    inputStates.checkIn.inputEntered ||
    inputStates.checkOut.inputEntered;

  const Divider = () => {
    return <hr className="rotate bg-gray-300 h-10 w-px" />;
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setInputStates({
      ...inputStates,
      location: {
        ...inputStates.location,
        inputEntered: false,
      },
    });
  });

  const [foundCities, setFoundCities] = React.useState<City[]>([]);

  const searchCity = async (city: string) => {
    fetch(`/api/location/getCityByName?name=${city}`)
      .then((res) => res.json())
      .then((res) => {
        setFoundCities(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (inputStates.location.value !== '') {
      searchCity(inputStates.location.value);
    }
  }, [inputStates.location]);

  return (
    <div
      ref={wrapperRef}
      className={`h-24 flex w-10/12 m-auto items-center border rounded-2xl ${
        oneIsFocused ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div
        className="relative h-full"
        onClick={() => {
          setInputStates({
            ...InitialInputStates,
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
          value={inputStates.location.value}
        />
        {foundCities.length > 0 && inputStates.location.value.length > 0 && (
          <div
            className={
              'absolute mt-5 max-h-80 overflow-y-auto w-72 bg-white border rounded-lg flex flex-col gap-y-2' +
              ' ' +
              (inputStates.location.inputEntered ? 'opacity-100' : 'opacity-0')
            }
          >
            {foundCities.map((city, idx) => {
              return (
                <h1
                  key={idx}
                  className="text-black text-md p-5 hover:bg-gray-200 w-full cursor-pointer"
                  onClick={() => {
                    setInputStates({
                      ...inputStates,
                      location: {
                        ...inputStates.location,
                        value: city.name,
                      },
                    });
                  }}
                >
                  {city.name} - {city.country.country}
                </h1>
              );
            })}
          </div>
        )}
      </div>

      <Divider />

      <div className="relative h-full">
        <InputElement
          label="What do you need?"
          placeholder="E.g. Sony Alpha A6000"
          inputStates={inputStates}
          setInputStates={setInputStates}
          name={inputStates.category.name}
        />
      </div>

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
        className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 rounded-xl mx-4"
        type="button"
      >
        Search
      </button>
    </div>
  );
}
