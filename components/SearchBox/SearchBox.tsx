import React, { useEffect, useReducer, useRef } from 'react';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import { City } from '../../types/location/City';
import { actions } from './state/actions';
import { reducer } from './state/reducer';
import { InitialInputStates } from './data/InitialInputStates';
import InputElement from './InputElement';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Product } from '../../types/Product';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

export default function SearchBox() {
  const accessToken = useLocalStorage('accessToken');

  const [inputStates, dispatch] = useReducer(reducer, InitialInputStates);

  useEffect(() => {
    console.log('inputStates', inputStates);
  }, [inputStates]);

  const oneIsFocused =
    inputStates.location.inputEntered ||
    inputStates.product.inputEntered ||
    inputStates.checkIn.inputEntered ||
    inputStates.checkOut.inputEntered;

  const Divider = () => {
    return <hr className="rotate bg-gray-300 h-10 w-px" />;
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    dispatch(actions.inputEnteredFalse());
  });

  const [foundCities, setFoundCities] = React.useState<City[]>([]);

  const searchCity = async (city: string) => {
    fetch(`/api/location/getCityByName?name=${city}`, {
      headers: { accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        setFoundCities(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const [foundProducts, setFoundProducts] = React.useState<Product[]>([]);

  const searchProduct = async (product: string) => {
    fetch(`/api/product/getProductByName?name=${product}`, {
      headers: { accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        setFoundProducts(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (inputStates.location.value !== '') {
      searchCity(inputStates.location.value);
    }
  }, [inputStates.location]);

  useEffect(() => {
    if (inputStates.product.value !== '') {
      searchProduct(inputStates.product.value);
    }
  }, [inputStates.product]);

  useEffect(() => {
    // if checkin is less than checkout then set checkout to ''
    if (inputStates.checkIn.value !== '' && inputStates.checkOut.value !== '') {
      if (
        new Date(inputStates.checkIn.value).getTime() >
        new Date(inputStates.checkOut.value).getTime()
      ) {
        dispatch(actions.inputChanged(inputStates.checkOut.name, ''));
      }
    }

    // if new Date(inputStates.checkIn.value) is not a valid date then set checkin to ''
    if (inputStates.checkIn.value !== '') {
      if (isNaN(new Date(inputStates.checkIn.value).getTime())) {
        dispatch(actions.inputChanged(inputStates.checkIn.name, ''));
        dispatch(actions.inputChanged(inputStates.checkOut.name, ''));
      }
    }

    // if new Date(inputStates.checkOut.value) is not a valid date then set checkout to ''
    if (inputStates.checkOut.value !== '') {
      if (isNaN(new Date(inputStates.checkOut.value).getTime())) {
        dispatch(actions.inputChanged(inputStates.checkOut.name, ''));
      }
    }
  }, [inputStates.checkIn, inputStates.checkOut]);

  return (
    <div
      ref={wrapperRef}
      className={`h-24 flex w-[85vw] m-auto items-center border rounded-2xl ${
        oneIsFocused ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div className="relative h-full">
        <InputElement
          label="Location"
          placeholder="Where are you going?"
          inputStates={inputStates}
          name={inputStates.location.name}
          dispatch={dispatch}
        />
        {foundCities.length > 0 &&
          inputStates.location.value.length > 0 &&
          inputStates.location.inputEntered && (
            <div
              className={
                'absolute mt-5 max-h-80 overflow-y-auto w-72 bg-white border rounded-lg flex flex-col gap-y-2' +
                ' ' +
                (inputStates.location.inputEntered
                  ? 'opacity-100'
                  : 'opacity-0')
              }
            >
              {foundCities.map((city, idx) => {
                return (
                  <h1
                    key={idx}
                    className="text-black text-md p-5 hover:bg-gray-200 w-full cursor-pointer"
                    onClick={() => {
                      dispatch(
                        actions.inputChanged(
                          inputStates.location.name,
                          city.name,
                        ),
                      );
                      dispatch(actions.inputEnteredFalse());
                    }}
                    tabIndex={idx}
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
          name={inputStates.product.name}
          dispatch={dispatch}
        />
        {foundProducts.length > 0 &&
          inputStates.product.value.length > 0 &&
          inputStates.product.inputEntered && (
            <div
              className={
                'absolute mt-5 max-h-80 overflow-y-auto w-72 bg-white border rounded-lg flex flex-col gap-y-2' +
                ' ' +
                (inputStates.product.inputEntered ? 'opacity-100' : 'opacity-0')
              }
            >
              {foundProducts.map((product, idx) => {
                return (
                  <h1
                    key={idx}
                    className="text-black text-md p-5 hover:bg-gray-200 w-full cursor-pointer"
                    onClick={() => {
                      dispatch(
                        actions.inputChanged(
                          inputStates.product.name,
                          product.title,
                        ),
                      );
                      dispatch(actions.inputEnteredFalse());
                    }}
                    tabIndex={idx}
                  >
                    {product.title}
                  </h1>
                );
              })}
            </div>
          )}
      </div>

      <Divider />
      <div className="relative h-full">
        <InputElement
          label="Check in"
          placeholder="Add a date"
          inputStates={inputStates}
          dispatch={dispatch}
          name={inputStates.checkIn.name}
        />
        {inputStates.checkIn.inputEntered && (
          <div
            className={
              'absolute mt-5 max-h-80  overflow-y-auto items-center bg-white border rounded-lg flex flex-col gap-y-2' +
              ' ' +
              (inputStates.checkIn.inputEntered ? 'opacity-100' : 'opacity-0')
            }
          >
            {/** Calendar Date picker */}
            <DayPicker
              mode="single"
              disabled={{
                before: new Date(),
              }}
              selected={inputStates.checkIn.value}
              onSelect={(date: any) => {
                dispatch(
                  actions.inputChanged(
                    inputStates.checkIn.name,
                    format(date, 'PP'),
                  ),
                );
                dispatch(actions.inputEnteredFalse());
              }}
            />
          </div>
        )}
      </div>
      <Divider />
      <div className="relative h-full">
        <InputElement
          label="Check out"
          placeholder="Add a date"
          inputStates={inputStates}
          dispatch={dispatch}
          name={inputStates.checkOut.name}
        />
        {inputStates.checkOut.inputEntered && (
          <div
            className={
              'absolute mt-5 max-h-80 overflow-y-auto items-center bg-white border rounded-lg flex flex-col gap-y-2' +
              ' ' +
              (inputStates.checkOut.inputEntered ? 'opacity-100' : 'opacity-0')
            }
          >
            {/** Calendar Date picker */}
            <DayPicker
              mode="single"
              selected={inputStates.checkOut.value}
              disabled={{
                before: new Date(
                  inputStates.checkIn.value !== ''
                    ? new Date(inputStates.checkIn.value).getTime() + 86400000
                    : // tomorrow's date
                      new Date().getTime() + 86400000,
                ),
              }}
              onSelect={(date: any) => {
                dispatch(
                  actions.inputChanged(
                    inputStates.checkOut.name,
                    format(date, 'PP'),
                  ),
                );
                dispatch(actions.inputEnteredFalse());
              }}
            />
          </div>
        )}
      </div>
      <Divider />

      <button
        className="bg-blue-500 hover:bg-blue-400 text-white w-[10vw] py-4 rounded-xl mx-auto flex items-center justify-center gap-x-2"
        type="button"
      >
        <svg
          className="w-5 h-6 hidden lg:flex"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </button>
    </div>
  );
}
