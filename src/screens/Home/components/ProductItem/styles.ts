import {StyleSheet} from 'react-native';
import {ITEM_HEIGHT} from '../../../../styles';

export default StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
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
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
