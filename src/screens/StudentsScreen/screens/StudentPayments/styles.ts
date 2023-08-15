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
    paddingBottom: 0
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 19,
    color: '#36385A',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    shadowOffset: {
        width: 0,
        height: 1
    },
    elevation: 10,
    shadowRadius: 6,
    marginBottom: 0,
    marginTop: 20
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 19,
    color: '#171930',
    marginBottom: 8,
  }
})