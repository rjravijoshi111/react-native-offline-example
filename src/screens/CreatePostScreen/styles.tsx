import { View, StyleSheet, Text } from 'react-native';
import { WINDOW_WIDTH } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  textInputWrapper: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dadae8',
    fontSize: 17,
  },
  descriptionInputWrapper: {
    height: 200,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
    marginBottom: 100
  },
  descriptionInputStyle: {
    flex: 1,
    color: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dadae8',
    fontSize: 17,
  },
  selectMedia: {
    height: 100,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    borderColor: '#dadae8',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusIcon: {
    width: '100%',
    height: '100%',
    tintColor: 'white'
  },
  plusContainer: {
    width: 40,
    height: 40,
  },
  selectText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 10
  },
  buttonStyle: {
    width: '100%',
    padding: 20,
    borderBottomWidth: 1
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 10
  },
  modalStyle: {
    height: 200
  },
  outerViewModal: {
    height: 200,
    backgroundColor: '#rgba(123,0,0,0.9)',
  },
  modalInnerContainer: {
    flex: 1,
    backgroundColor: '#rgba(0,0,0,0.0)'
  },
  image: {
    marginVertical: 24,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  crossContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 999,
    right: 10,
    top: 10,
    borderRadius: 15
  },
  selectedImage: {
    width: 30,
    height: 30,
    transform: [{ rotate: '45deg' }]
  },
  submitButtonContainer: {

  },
  SubmitButtonStyle: {
    bottom: 10,
    position: 'absolute',
    width: '90%',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaec31',
  },
  buttonTextStyle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  }
});

export default styles;
