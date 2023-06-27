import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: '85%',
    height: '85%',
    backgroundColor: '#F9FAFC',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: 'rgba(224, 178, 219, 0.44)',
  },
  modalWrapper: { position: 'absolute', height: '100%', width: '100%', zIndex: 111 },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#BAC2CB',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 2,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#002251',
    width: '50%',
  },
  checkItem: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 62, alignItems: 'center' },
  allContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 44,
  },
  checkBtnActive: { position: 'absolute', height: 25, width: 25, backgroundColor: '#fff', top: 2, left: 2, borderRadius: 3 },
  text: {
    marginLeft: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#171930',
  }
});
