import React, {FC, useContext, useState} from 'react';
import {Item} from '../../index';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Counter from '../../../Home/components/Counter';
import StoreContext from '../../../../context';
import styles from './styles';

type CartItemProps = {
  onPress: () => void;
  onRefetch?: () => void;
} & Item;

const CartItem: FC<CartItemProps> = ({
  item_id,
  name,
  price,
  image,
  quantity,
  onPress,
  onRefetch,
}) => {
  const {increaseProductQuantity, decreaseProductQuantity} =
    useContext(StoreContext);
  const [quantityState, setQuantityState] = useState(quantity);

  const removeProduct = async () => {
    return fetch(
      `https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0/cart/${item_id}`,
      {method: 'DELETE'},
    );
  };

  const onQuantityChange = async (newQuantity: number) => {
    if (newQuantity > quantityState) {
      increaseProductQuantity(item_id);
    } else {
      decreaseProductQuantity(item_id);
    }
    setQuantityState(newQuantity);
    try {
      if (newQuantity === 0) {
        await removeProduct();
        await onRefetch?.();
      }
    } catch (e) {
      setQuantityState(1);
      console.error(e);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.row}>
          <Counter quantity={quantityState} onChange={onQuantityChange} />
          <Text style={styles.priceText}>{price * quantityState}$</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartItem;
