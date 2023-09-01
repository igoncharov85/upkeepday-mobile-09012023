import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 18,
    paddingTop: 6,
  },
  item: {
    backgroundColor: 'white',
    position: 'relative',
    width: '85%',
    borderColor: '#E2E2EA',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  itemTrial: {
    height: 98,
  },
  itemLesson: {
    height: 69,
  },
  itemInfo: {
    marginLeft: 14,
    flexDirection: 'column',
  },
  decorItemLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    width: 4,
  },
  decorItemLineTrial: {
    backgroundColor: '#FF7F09',
  },
  decorItemLineLesson: {
    backgroundColor: '#9A80BA',
  },
  timeStart: {
    fontSize: 12,
    lineHeight: 18,
    color: '#171930',
    opacity: 0.4,
  },
  title: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  time: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    color: '#7E8CA0',
  },
});
