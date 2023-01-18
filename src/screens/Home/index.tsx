import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Routes from '../../navigation/routes';
import {Product} from './types';
import ProductItem from './components/ProductItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Router';
import {useNavigation} from '@react-navigation/native';
import commonStyles, {ITEM_HEIGHT} from '../../styles';
import {useCartItems} from '../../hooks';

const HomeScreen: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const fetchCartItems = useCartItems();

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(
        'https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0/items',
      );
      const data = await response.json();

      // check in case if it returns "Exceeded rate limit"
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    }
    await fetchCartItems();
  }, [fetchCartItems]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  }, [fetchItems]);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}: {item: Product}) => (
    <ProductItem
      {...item}
      onPress={() => navigation.navigate(Routes.Details, {id: item.id})}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        style={commonStyles.list}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
