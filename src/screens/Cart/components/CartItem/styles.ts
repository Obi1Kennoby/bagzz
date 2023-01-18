import {StyleSheet} from 'react-native';
import {ITEM_HEIGHT} from '../../../../styles';

export default StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    flex: 1,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: '100%',
  },
  content: {
    gap: 10,
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  nameText: {fontSize: 18, fontWeight: '600'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {flex: 1, marginLeft: 8, fontWeight: '700'},
});
