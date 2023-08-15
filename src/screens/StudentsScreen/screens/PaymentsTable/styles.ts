import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    zIndex: 1, 
    maxWidth: '90%', 
    padding: 20, 
    paddingBottom: 0,
    marginBottom: 20
  },
  tableContainer: {
    margin: 20,
    marginTop: 0
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center'
  },
  columnHeader: { 
    flex: 1,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    color: '#232326',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    color: '#232326',
  },
  done: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#9A80BA',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: "500",
  }, 
  switcherWrapper: {
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20,
    flexDirection: 'row'
  }, 
  switcherText: {
    fontStyle: 'normal',
    fontWeight: "600",
    fontSize: 20
  },
  footer: {
    width: '100%', 
    height: 150, 
    padding: 20, 
    display: 'flex', 
    justifyContent: 'flex-end'
  }
})