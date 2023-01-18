import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Router';
import Routes from '../../navigation/routes';
import styles from './styles';
import commonStyles from '../../styles';
import {useAddToCart} from '../../hooks';

type ItemDetails = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
};

const DetailsScreen: FC<
  StackScreenProps<RootStackParamList, Routes.Details>
> = ({
  route: {
    params: {id},
  },
}) => {
  const {addToCart} = useAddToCart(id);
  const [details, setDetails] = useState<ItemDetails | null>(null);
  const fetchDetails = async (itemId: string) => {
    try {
      const response = await fetch(
        `https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0/items/${itemId}/`,
      );
      const data = await response.json();
      setDetails(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  if (!details) {
    return <ActivityIndicator />;
  }

  const {image, name, price, description} = details;

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.nameText}>{name}</Text>
      <Text>{description}</Text>
      <Text>{price}$</Text>
      <TouchableOpacity onPress={addToCart}>
        <Text style={commonStyles.addCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailsScreen;
