import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',

  },
  container: {
    height: '60%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 20,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '140%',


    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  textConflict: {
    color: 'red',
    fontSize: 24,
    textAlign: 'center'
  }
});
