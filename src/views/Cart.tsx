import { useRecoilValue } from "recoil";
import BreadCrumb from "../components/common/Breadcrumb";
import { MENUS } from "../constants/category";
import { cartState } from "../store/cart";
import CartEmpty from "../components/carts/CartEmpty";
import CartList from "../components/carts/CartList";

const Cart = (): JSX.Element => {
  const cart = useRecoilValue(cartState);
  const isEmpty = Object.keys(cart.items ?? {}).length === 0;

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={MENUS.HOME} crumb="장바구니" />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        {isEmpty ? <CartEmpty /> : <CartList />}
      </article>
    </section>
  );
};

export default Cart;
