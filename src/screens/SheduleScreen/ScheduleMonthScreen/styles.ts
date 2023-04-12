import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    width: '100%'
  },
  itemContainer: {
    flex: 1,
    height: 92,
    alignItems: 'center',
    margin: 1
  },
  header: {
    height: 32,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  monthYear: {
    flex: 1,
    height: 32,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dayNames: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingTop: 10,
  },
  dayName: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 19,
    color: '#171930',
    opacity: 0.4,
  },
  daysOfWeekText: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 19,
    color: '#171930',
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
