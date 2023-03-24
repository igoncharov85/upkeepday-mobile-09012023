import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    // maxWidth: '100%',
    // maxHeight: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
  daysOfWeekText: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 19,
    color: '#171930',
    mixBlendMode: 'normal',
    opacity: 0.4,
  },
});
