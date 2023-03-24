import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 10,
  },
  containerItem: {
    height: 64,
    minWidth: '14.28571428571429%',
    // maxWidth: '14.28571428571429%',
    // flex: 1,
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
    justifyContent: 'flex-start',
    paddingRight: 4,
  },
  timeLineText: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 18,
    color: '#171930',
    opacity: 0.4,
  },
  textItem: {
    maxWidth:36,
    fontSize: 9,
    lineHeight: 11,
    color: '#fff',
    marginHorizontal: 4,
    margingVertical: 2,
  },
});
