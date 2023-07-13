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
  interactive: {
    width: '100%',
    marginTop: 8,
    height: 52,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    paddingHorizontal: 10,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    color: 'black',
  },
  interactiveText: {
    fontSize: 14,
    lineHeight: 19,
    color: '#000000',
    fontWeight: '500',
  },
  interactiveChildren: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    height: 38,
    width: 105,
    borderRadius: 9,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  dateText: {
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
  },
});
