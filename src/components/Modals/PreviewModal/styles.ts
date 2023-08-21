import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    textAlign: 'center',
  },
  bgGradient: {
    position: 'absolute',
    flex: 1,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.0705882,
    shadowRadius: 6,
    paddingBottom: 20,
    justifyContent: 'space-around',
  },
  bgModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
  },
  cancelScheduled: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: -0.3,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25);',
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
  },
  cancelBtn: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: -0.3,
    color: '#FFFFFF',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171930',
    textAlign: 'center'
  }
});
