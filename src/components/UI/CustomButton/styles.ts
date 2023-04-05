import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: '#9A80BA',
  },
  containerActive: {
    backgroundColor: 'none',
    borderWidth: 2,
    borderColor: '#AF9CC9',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textActive: {
    color: '#AF9CC9',
  },
});

