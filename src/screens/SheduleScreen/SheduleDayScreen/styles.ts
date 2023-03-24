import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
  },
  buttonWrapper: {
    marginTop: 20,
    width: '80%',
  },
  lessonItem: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  item: {
    
    position: 'relative',
    backgroundColor: '#ffffff',
    height: 69,
    width: 285,
    marginVertical: 8,
    marginHorizontal: 16,

    borderColor: '#E2E2EA',
    borderStyle: 'solid',
    borderWidth: 1,

    borderRadius: 4,
    overflow: 'hidden',
  },
  itemInfo: {
    marginLeft: 14,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  itemLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    width: 4,
    backgroundColor: '#9A80BA',
  },
  timeStart: {
    
    paddingRight: 14,
    fontSize: 12,
    lineHeight: 18,
    color: '#171930',
    opacity: 0.4,
    borderRightColor: '#2F3045',

    borderRightStyle: 'solid',
    borderRightWidth: 1,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  time: {
    fontSize: 14,
    lineHeight: 22,
    color: '#7E8CA0',
  },
});
