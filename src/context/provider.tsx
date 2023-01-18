import React, {FC, ReactNode, useCallback, useMemo, useState} from 'react';
import ProductsContext from './index';

const ProductsProvider: FC<{children: ReactNode}> = ({children}) => {
  const [products, setProducts] = useState<{[id: string]: number}>({});

  const increaseProductQuantity = useCallback(
    (id: string) => {
      if (products[id] !== undefined) {
        setProducts({...products, [id]: products[id] + 1});
      } else {
        setProducts({...products, [id]: 1});
      }
    },
    [products],
  );

  const decreaseProductQuantity = useCallback(
    (id: string) => {
      if (products[id] === 1) {
        delete products[id];
        setProducts({...products});
      } else {
        setProducts({...products, [id]: products[id] - 1});
      }
    },
    [products],
  );

  const getProductQuantity = useCallback(
    (id: string) => {
      if (products[id] === undefined) {
        return 0;
      }
      return products[id];
    },
    [products],
  );

  const setProductQuantity = useCallback(
    (id: string, quantity: number) => {
      setProducts({...products, [id]: quantity});
    },
    [products],
  );

  const getAllProductQuantity = useCallback(
    () =>
      Object.values(products).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      ),
    [products],
  );

  const value = useMemo(
    () => ({
      increaseProductQuantity,
      decreaseProductQuantity,
      getProductQuantity,
      setProductQuantity,
      getAllProductQuantity,
    }),
    [
      decreaseProductQuantity,
      getAllProductQuantity,
      getProductQuantity,
      increaseProductQuantity,
      setProductQuantity,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
