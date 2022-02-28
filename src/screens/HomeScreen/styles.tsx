import {View, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    alignContent: 'center',
  },
  postButton: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    borderColor: '#7DE24E',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default styles;
