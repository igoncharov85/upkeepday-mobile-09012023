import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    padding: 20
  },
  done: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#9A80BA',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  back:{
    width: '100%',
    height: 52,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FA6B6B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: "500",
    textAlign: 'center'
  }, 
  bottom: {
    width: '100%',
    height: 100,
  },
  modal: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 11
  }
})