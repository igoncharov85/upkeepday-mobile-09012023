import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
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
  monthItemText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 19,
    color: '#171930',
    alignItems: 'center',
  },
  monthItemActiveText: {
    fontWeight: '600',
    color: '#fff',
  },
  numberOfClasses: {
    fontSize: 9,
    fontWeight: '500',
    lineHeight: 11,
    color: '#fff',
  },
});
