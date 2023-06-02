import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'none',
  },
  scrollContainer: {
    height: 150,
  },
  contentContainer: {
    width: '100%',
    paddingTop: 25,
    paddingBottom: 25,
  },
  item: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 27,
    textAlign: 'center',
    lineHeight: 62,
    color: 'rgba(9,10,19,0.4)',
  },

  selectedItemText: {
    fontWeight: 'bold',
    fontSize: 39,
    lineHeight: 62,
    color: '#171930',
  },
});
