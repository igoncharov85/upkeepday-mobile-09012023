import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 10,
    position: 'relative'
  },
  containerItem: {
    height: 64,
    minWidth: '14.28571428571429%',
    borderWidth: 1,
    borderColor: 'rgba(47,48,69,0.06)',
    borderStyle: 'solid',
    borderRadius: 3,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
  timeLineBlock: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 6,

  },
  timeLineText: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 18,
    color: '#171930',
    opacity: 0.4,
  },
  textItem: {
    maxWidth: 36,
    fontSize: 9,
    lineHeight: 11,
    color: '#fff',
    marginHorizontal: 4,
    marginVertical: 2,
  },
  absoluteFill: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  mask: {
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  cansel: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  wrapperItem: {
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 4,
    top: 0,
    left: 0,
    right: 0,
    height: `100%`,
  }
});
