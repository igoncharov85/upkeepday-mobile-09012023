import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerWekk: {
    flexDirection: 'row',
    marginLeft: 30,
  },

  container: {
    height: 59,
    width: 38,
    marginHorizontal: 4,
    flex: 1,
    opacity: 0.4,
    borderWidth: 0.5,
    borderColor: '#E5E8EB',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'relative',
    overflow: 'hidden',
  },
  daysOfWeek: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    color: '#171930',
    opacity: 0.6,
  },
  number: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    color: '#171930',
  },
  background: {
    backgroundColor: '#8873B5',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
