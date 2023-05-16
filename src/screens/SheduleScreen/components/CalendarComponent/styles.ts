import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  arrow: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 100,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(9,10,19,0.3)',
  },
  header: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dayContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
  },
  dayTextSelected: {
    color: '#fff',
  },
  disabledText: {
    color: '#ccc',
  },
  todayGradient: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFA500',
  },
});
