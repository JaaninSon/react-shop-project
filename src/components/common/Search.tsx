import React from "react";
import { useRecoilValue } from "recoil";
import { productsList } from "../../store/products";
import { Link } from "react-router-dom";

interface SearchProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

function Search({ inputValue, setInputValue }: SearchProps) {
  const allProducts = useRecoilValue(productsList);

  const results = allProducts.filter((product) => product.title.toLowerCase().includes(inputValue.toLowerCase()));
  const isVisible = inputValue.trim().length > 0;

  return (
    <div className={`${isVisible ? "block" : "hidden"}`}>
      {results.length > 0 && (
        //
        <ul className="!fixed left-0 sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto overflow-x-hidden dark:bg-gray-600 !text-gray-800 dark:!text-white">
          {results.map((item) => (
            <li key={item.id} className="hover:bg-gray-100">
              <Link
                to={`/product/${item.id}`}
                className="block px-4 py-2 text-sm text-gray-800"
                onClick={() => setInputValue("")}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
