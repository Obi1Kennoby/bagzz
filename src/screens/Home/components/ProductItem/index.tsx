import {Product} from '../../types';
import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import commonStyles from '../../../../styles';
import {useAddToCart} from '../../../../hooks';

type ProductItemProps = {
  onPress: () => void;
} & Product;

const ProductItem: FC<ProductItemProps> = ({
  id,
  name,
  price,
  image,
  onPress,
}) => {
  const {addToCart} = useAddToCart(id);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.nameText}>{name}</Text>
        <Text>{price}$</Text>
        <TouchableOpacity onPress={addToCart}>
          <Text style={commonStyles.addCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
