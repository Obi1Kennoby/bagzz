import {StyleSheet} from 'react-native';

const SIZE = 30;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  quantityText: {
    flex: 1,
    height: SIZE,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
