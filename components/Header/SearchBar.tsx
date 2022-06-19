import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Product } from '../../types/Product';

export default function SearchBar() {
  const accessToken = useLocalStorage('accessToken');

  // if path is / then return null
  const router = useRouter();
  if (router.pathname === '/') return null;

  const [foundProducts, setFoundProducts] = useState([]);

  const searchProduct = async (product: string) => {
    if (accessToken) {
      fetch(`/api/product/getProductByName?name=${product}`, {
        headers: { accessToken },
      })
        .then((res) => res.json())
        .then((res) => {
          setFoundProducts(res);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="w-[20vw] relative flex items-center min-h-[2.5rem] 
    "
    >
      <input
        className="bg-transparent border-gray-200 border-[1px] p-1 pl-3
      rounded-full focus:outline-blue-400
      focus:shadow-outline 
      placeholder:text-sm text-gray-600 text-sm w-full h-full"
        type="text"
        placeholder="Search"
        onChange={(e) => searchProduct(e.target.value)}
      />
      <button
        className="flex items-center bg-blue-500 absolute right-2 rounded-full h-6 w-6 justify-center
        hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {foundProducts.length > 0 && (
        <div className="absolute left-0 top-0 mt-[6vh] w-full bg-white border-[1px] rounded-md z-50">
          {foundProducts.map((product: Product) => (
            <p
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100 "
              onClick={() => {
                router.push(`/product/${product.id}`);
              }}
            >
              {product.title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
