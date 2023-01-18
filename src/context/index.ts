import {createContext} from 'react';

export type ContextType = {
  increaseProductQuantity: (id: string) => void;
  decreaseProductQuantity: (id: string) => void;
  getProductQuantity: (id: string) => number;
  setProductQuantity: (id: string, quantity: number) => void;
  getAllProductQuantity: () => number;
};

const ProductsContext = createContext<ContextType>({
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  getProductQuantity: () => 0,
  setProductQuantity: () => {},
  getAllProductQuantity: () => 0,
});
export default ProductsContext;
