import { atom, selector } from "recoil";
import { CART_ITEM } from "../constants/category";
import { productsList } from "./products";

export interface ICartInfo {
  readonly id: number;
  readonly count: number;
}

export interface ICartItems {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly count: number;
  readonly image: string;
}

export interface ICartState {
  readonly items?: Record<string | number, ICartInfo>;
}

/**
 * 카트의 상태는 localStorage 기준으로 초기화
 * 카트의 상태는 새로고침해도 유지되어야 한다.
 */
export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) && setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

/*
 * cartList
 * id, image, count 등을 return
 */

export const cartList = selector<ICartItems[]>({
  key: "cartListSelector",
  get: ({ get }) => {
    const cart = get(cartState);
    const products = get(productsList);
    const items = cart.items ?? {};

    const result: ICartItems[] = [];

    for (const id in items) {
      const productInfo = products.find((p) => p.id === Number(id));
      const count = items[id].count;

      if (productInfo) {
        result.push({
          id: id,
          title: productInfo.title,
          price: productInfo.price,
          image: productInfo.image,
          count,
        });
      }
    }

    return result;
  },
});

//* addToCart
export const addToCart = (cart: ICartState, product: ICartItems): ICartState => {
  const currentItems = cart.items || {};
  const existingItem = currentItems[product.id];

  const newCount = existingItem ? existingItem.count + 1 : 1;

  const updatedItems: Record<string | number, ICartInfo> = {
    ...currentItems,
    [product.id]: {
      id: Number(product.id),
      count: newCount,
    },
  };

  return {
    items: updatedItems,
  };
};

export const removeFromCart = (cart: ICartState, id: string): ICartState => {
  const items = cart.items ?? {};

  console.log("removeFromCart - 현재 items", items);
  console.log("id 확인", id);

  if (items[id].count === 1) {
    const { [id]: removed, ...rest } = items;
    return { items: rest };
  } else {
    return {
      items: {
        ...items,
        [id]: { id: Number(id), count: items[id].count - 1 },
      },
    };
  }
};
