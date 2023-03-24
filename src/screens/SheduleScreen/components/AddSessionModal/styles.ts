import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sessionBlock: {
    borderRadius: 8,
    marginTop: 10,
    minWidth: '80%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sessionText: {
    color: '#060633',
    fontSize: 15,
    lineHeight: 17,
    fontWeight: '600',
  },
});
