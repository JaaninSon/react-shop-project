import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchState } from "../../constants/searchAtom";
import { Link } from "react-router-dom";
import { cartState } from "../../store/cart";
import Search from "../../components/common/Search";
import { THEME } from "../../constants/constants";

function Nav() {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || THEME.LIGHT);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK));
  };

  const [searchProduct, setSearchProduct] = useRecoilState(searchState);

  const cart = useRecoilValue(cartState);
  // console.log("in Nav Com", cart);
  const totalCart = Object.values(cart.items || {}).reduce((acc, item) => acc + item.count, 0);
  // console.log(totalCart);

  return (
    <>
      <nav className="navbar bg-base-100 text-base-content dark:bg-neutral dark:text-white shadow-lg fixed z-10 w-full  ">
        <div className=" xl:container xl:m-auto flex  w-full">
          <div className="md:hidden">
            <label htmlFor="side-menu" className="flex-none lg:hidden btn btn-square btn-ghost w-10 sm:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-gray-700 dark:stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <h1 className="shrink-0 flex md:flex-none flex-1 text-lg font-bold  mx-1 sm:mx-2 font-bold whitespace-nowrap">
            <Link to="/">React Shop</Link>
          </h1>

          <div className="hidden flex-none md:flex md:flex-1 ml-2">
            <Link to="/fashion" className="hover:text-white hover:bg-blue-500 px-3 btn btn-ghost btn-sm">
              패션
            </Link>

            <Link to="/accessory" className="hover:text-white hover:bg-blue-500 px-3 btn btn-ghost btn-sm">
              액세서리
            </Link>

            <Link to="/digital" className="hover:text-white hover:bg-blue-500 px-3 btn btn-ghost btn-sm">
              디지털
            </Link>
          </div>

          <div className="flex items-center px-2">
            <button className="btn btn-ghost hover:bg-transparent" onClick={toggleDarkMode}>
              {theme === THEME.DARK ? (
                <svg className="swap-off h-7 w-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              ) : (
                <svg className="swap-on h-7 w-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              )}
            </button>

            <div className="lg:block relative dropdown">
              {/* hidden lg:block 안먹음... md설정은, sm에 다시나타남 */}
              <button
                type="button"
                className="flex sm:hidden w-10 sm:w-auto mx-0 px-0 sm:mx-2 sm:px-2 btn btn-ghost js-search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 stroke-gray-700 dark:stroke-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
              <input
                type="text"
                placeholder="검색"
                className="fixed left-0 top-4 opacity-0 sm:opacity-100 sm:static sm:flex sm:rounded w-full input input-bordered w-24 md:w-auto bg-base-200 text-gray-800 border-0 focus:outline-0 rounded-none sm:transform-none transition-all js-searchInput -z-10 dark:bg-gray-600 !text-gray-800 dark:!text-white"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
              />
              <Search inputValue={searchProduct} setInputValue={setSearchProduct} />
            </div>

            <Link to="/cart" className="btn btn-ghost ml-1 w-10 sm:w-12">
              <span className="relative">
                <svg
                  className="h-6 w-6 dark:stroke-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
                <span className="inline-flex items-center justify-center absolute top-0 right-0 px-2 py-1 rounded-full bg-red-500 text-xs font-bold leading-none text-gray-200 transform translate-x-1/2 -translate-y-1/2">
                  {totalCart}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
