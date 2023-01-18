import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

type CounterProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

const Counter: FC<CounterProps> = ({quantity, onChange}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => quantity > 0 && onChange(quantity - 1)}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.quantityText}>
        <Text>{quantity}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onChange(quantity + 1)}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
