import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  part: {
    flex: 1,
  },
  interactive: {
    width: '100%',
    marginTop: 8,
    height: 52,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    paddingHorizontal: 10,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    color: 'black',
  },
  interactiveText: {
    fontSize: 14,
    lineHeight: 19,
    color: '#000000',
    fontWeight: '500',
  },
  interactiveChildren: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchButton: {
    backgroundColor: 'rgba(165, 175, 196, 0.5)',
    width: 85,
    height: 38,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 9,
  },
  switchButtonCircle: {
    width: 42,
    height: 32,
    backgroundColor: '#FBFCFD',
    borderRadius: 2200,
    overflow: 'hidden',
  },
  dateContainer: {
    height: 38,
    width: 105,
    borderRadius: 9,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  dateText: {
    fontSize: 15,
    lineHeight: 18,
  },
  notification: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    marginVertical: 12,
    maxWidth: '80%'
  },
  confirm: {
    height: 38,
    width: 122,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(175, 156, 201,0.5)',
    borderRadius: 9,
    marginTop: 20,
    marginBottom: 20,

  },
  confirmText: {

    lineHeight: 19,
    fontWeight: '500',
    color: '#000',
    fontSize: 15
  },
  finishBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%'
  }
});
