import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderColor: 'rgba(224, 178, 219, 0.44)',
    borderWidth: 6,
    borderStyle: 'solid',
    borderRadius: 16,
    marginHorizontal: 44,
    padding: 20,
    width: '80%',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 26,
    color: '#002251',
  },
  subTitle: {
    fontSize: 14,
    lineHeight: 19,
    color: 'rgba(23, 25, 48,0.4)',
  },
  btnContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'space-between',
  },
  input: {
    height: 78,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    marginBottom: 40,
    textAlignVertical: 'top'
  },
});
