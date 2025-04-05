import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import { useRecoilValue, useRecoilState } from "recoil";
import { productsList } from "../../store/products";
import { cartState, addToCart } from "../../store/cart";
import { Link } from "react-router-dom";
import Rating from "../common/Rating";

function ProductsView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useRecoilValue(productsList);
  const product = products.find((p) => p.id.toString() === id);

  // console.log(product);

  useEffect(() => {
    if (!product) {
      navigate("/404", { replace: true });
    }
  }, [product, navigate]);

  if (!product) return null;

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={product?.category} crumb={product?.title} />
      <article>
        <ProductsDetail product={product} />
      </article>
    </section>
  );
}

function ProductsDetail({ product }) {
  /* console.log 데이터 확인 */
  // console.log(product);

  const [cart, setCart] = useRecoilState(cartState);

  const handleAddToCart = () => {
    const productData = {
      id: product.id.toString(),
      title: product.title,
      price: product.price,
      count: 1,
      image: product.image,
    };

    const updatedCart = addToCart(cart, productData);
    setCart(updatedCart);
  };

  return (
    <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
      <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
        <img src={product.image} alt={product.title} className="w-full object-contain h-72" />
      </figure>
      <div className="card-body px-1 lg:px-12">
        <h2 className="card-title">
          {product.title}
          <span className="badge badge-accent ml-2">NEW</span>
        </h2>
        <p className="mt-4">{product.description}</p>
        <div className="flex items-center mt-3">
          <Rating rate={product.rating.rate} count={product.rating.count} />
        </div>
        <p className="mt-2 mb-4 text-3xl">${Math.ceil(product.price)}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            장바구니에 담기
          </button>
          <Link to="/cart" className="btn btn-outline ml-1">
            장바구니로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsView;
