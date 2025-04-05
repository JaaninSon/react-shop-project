import { Link } from "react-router-dom";
import { ICartState, ICartItems, cartState, removeFromCart, cartList, addToCart } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useRecoilState, useRecoilValue } from "recoil";
import Confirm from "../common/Confirm";

const CartList = (): JSX.Element => {
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const cartItems = useRecoilValue(cartList);

  const removeFromCartHandler = (id: string) => {
    const currentItems = cart.items ?? {};
    const updatedItems = removeFromCart({ items: currentItems }, id);
    setCart(updatedItems);
  };

  const handleIncrease = (item: ICartItems) => {
    setCart(addToCart(cart, item));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className="lg:flex justify-between mb-20 mt-6 md:mt-14 px-2 lg:px-0">
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <div className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
              <Link to={`/product/${item.id}`}>
                {/* 경로확인 */}
                <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
                  <img src={item.image} alt={item.title} className="object-contain w-full h-48" />
                </figure>
              </Link>

              <div className="card-body px-1 lg:px-12">
                <h2 className="card-title">
                  <Link to={`/product/${item.id}`} className="link link-hover">
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-2 mb-4 text-3xl">
                  {toCurrencyFormat(item.price * item.count)}
                  <span className="text-2xl">{`(${toCurrencyFormat(item.price)})`}</span>
                </p>

                <div className="card-actions">
                  <div className="btn-group">
                    <button onClick={() => removeFromCartHandler(item.id)} className="btn btn-primary">
                      -
                    </button>
                    <button className="btn btn-ghost no-animation">{item.count}</button>
                    <button onClick={() => handleIncrease(item)} className="btn btn-primary">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="self-start shrink-0 flex items-center mt-10 mb-20">
        <span className="text-xl md:text-2xl">총 : {toCurrencyFormat(totalPrice)}</span>
        <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
          구매하기
        </label>
      </div>

      <Confirm />
    </div>
  );
};

export default CartList;
