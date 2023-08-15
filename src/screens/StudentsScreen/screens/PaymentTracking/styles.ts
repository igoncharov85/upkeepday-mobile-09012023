import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  linearGradient: {
    width: 120, 
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    zIndex: 1, 
    maxWidth: '90%', 
    padding: 20, 
    paddingBottom: 0
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    color: '#36385A',
    marginBottom: 8,
  },
  title: {
    fontStyle: 'normal',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  },
  textWrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20
  },
  inputBlock: {
    width: '100%',
    borderColor: '#BAC2CB',
    borderStyle: 'solid',
    borderBottomWidth: 0.7,
    borderTopWidth: 0.7,
    padding: 20, 
    marginTop: 20,
  },
  inputWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',  
    alignItems: 'center'
  }, 
  input: {
    width: '100%', 
    height: 44,
    textAlign: 'center',
    borderRadius: 2, 
    backgroundColor: '#FDFDFE'
  }, 
  arrow: {
    width: 40, 
    height: 40, 
    borderRadius: 100,
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderColor: '#171930',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 10
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
    marginBottom: 20
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: "500",
  }, 
  modalTitle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: '#36385A',
    marginBottom: 8
  }
})