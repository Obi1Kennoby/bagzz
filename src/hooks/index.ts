import {useCallback, useContext} from 'react';
import {Item} from '../screens/Cart';
import ProductsContext from '../context';

export const useAddToCart = (id: string) => {
  const {increaseProductQuantity, getProductQuantity} =
    useContext(ProductsContext);
  const addToCart = useCallback(async () => {
    try {
      const quantity = getProductQuantity(id) + 1;
      let response: Response;
      if (quantity === 1) {
        response = await fetch(
          `https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0/cart?id=${id}&quantity=${quantity}`,
          {method: 'POST'},
        );
      } else {
        response = await fetch(
          `https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0/cart/${id}`,
          {method: 'PUT', body: JSON.stringify({quantity})},
        );
      }

      if (response?.status === 200) {
        increaseProductQuantity(id);
      }
    } catch (e) {
      console.error(e);
    }
  }, [getProductQuantity, id, increaseProductQuantity]);

  return {addToCart};
};

export const useCartItems = () => {
  const {setProductQuantity} = useContext(ProductsContext);
  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch(
        'https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0/cart',
      );
      const data: Item[] = await response.json();
      data.forEach(item => setProductQuantity(item.item_id, item.quantity));
      return data;
    } catch (e) {
      console.error(e);
    }
  }, [setProductQuantity]);

  return fetchCartItems;
};
