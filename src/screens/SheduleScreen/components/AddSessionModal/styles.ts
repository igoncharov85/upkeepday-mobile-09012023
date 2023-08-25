import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sessionBlock: {
    borderRadius: 8,
    minWidth: '80%',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sessionBlockDisabled: {
    backgroundColor: '#6D7B98',
  },
  sessionText: {
    color: '#060633',
    fontSize: 15,
    lineHeight: 17,
    fontWeight: '600',
    marginRight: 15
  },
  sessionTextDisabled: {
    color: '#fff',
  },
});
