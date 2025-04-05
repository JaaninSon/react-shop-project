import React from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Link } from "react-router-dom";
import { productsList } from "../../store/products";
import { Category } from "../../constants/category";
import ProductsLoad from "./ProductsLoad";
import Error from "../../views/Error";

interface Props {
  category: string;
  isMain?: boolean;
}

function ProductsList({ category, isMain = false }: Props) {
  const productsLoadable = useRecoilValueLoadable(productsList);

  if (productsLoadable.state === "loading") return <ProductsLoad limit={8} isLoading={true} />;
  if (productsLoadable.state === "hasError") return <Error />;

  // const products = useRecoilValue(productsList) ?? [];

  const products = productsLoadable.contents;

  const filteredProducts = products.filter((product) => Category[product.category] === category);

  const mainPageProducts = isMain ? filteredProducts.slice(0, 4) : filteredProducts;

  return (
    <>
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{category}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
        {mainPageProducts.length > 0 ? (
          mainPageProducts.map((product) => (
            <div key={product.id}>
              <Link
                className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
                to={`/product/${product.id}`}
              >
                <figure className=" h-80 bg-white overflow-hidden">
                  <img
                    src={product.image}
                    alt="상품이미지"
                    className="transition-transform duration-300 object-cover"
                  />
                </figure>
                <div className="card-body bg-gray-100 dark:bg-gray-700">
                  <p className="card-title text-base">{product.title}</p>
                  <p className="text-base">${Math.ceil(product.price)}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">해당 카테고리에 상품이 없습니다.</p>
        )}
      </div>
    </>
  );
}

export default ProductsList;
