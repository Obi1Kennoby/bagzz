import React, {FC, useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity, Text} from 'react-native';
import CartItem from './components/CartItem';
import styles from './styles';
import commonStyles, {ITEM_HEIGHT} from '../../styles';
import {useCartItems} from '../../hooks';
import Routes from '../../navigation/routes';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Router';

export type Item = {
  item_id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

const CartScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [items, setItems] = useState<Item[]>([]);
  const fetchCartItems = useCartItems();
  const [disabledBuy, setDisabledBuy] = useState(false);
  const fetchItems = async () => {
    setItems((await fetchCartItems()) || []);
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onProceedBuy = async () => {
    // I didn't find any endpoint to apply purchase.
    // After proceeding with the buy, I think the card should be reset on the backend side.
    // Anyway, for demo purposes, let's reset it here
    setDisabledBuy(true);
    try {
      await fetch('https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0/cart', {
        method: 'DELETE',
      });
      await fetchItems();
    } catch (e) {
      console.error(e);
    } finally {
      setDisabledBuy(false);
    }
  };

  const renderItem = ({item}: {item: Item}) => (
    <CartItem
      {...item}
      onPress={() => navigation.navigate(Routes.Details, {id: item.item_id})}
      onRefetch={fetchItems}
    />
  );
  const renderFooter = () => (
    <TouchableOpacity
      style={styles.buyButton}
      onPress={onProceedBuy}
      disabled={disabledBuy || items.length === 0}>
      <Text style={styles.buyText}>Proceed to buy</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <FlatList
        style={commonStyles.list}
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.item_id}
        ListFooterComponent={renderFooter}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

export default CartScreen;
