import { View, StyleSheet, Text } from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listStyle: {
    flex: 1,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  loadingIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#rgba(0,0,0,0.4)',
  },
  emptyContainer: {
    height: '100%',
    width: '100%',
    marginTop: WINDOW_HEIGHT / 3
  },
  noData: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default styles;
