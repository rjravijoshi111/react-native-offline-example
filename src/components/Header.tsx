import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DARK_GREY, WHITE} from '../styles';
import {appImages} from '../styles/appImages';

const Header = ({
  isShowBack = false,
  onBackPress = () => {},
  selectedAnswer = '',
  onSelect = () => {},
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        marginTop: insets.top,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {isShowBack && (
        <TouchableOpacity onPress={onBackPress}>
          <Image
            source={appImages.back}
            style={{height: 25, width: 25, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      )}
      <View style={{flex: 1}}></View>
      <Image
        source={appImages.upLogo}
        style={{height: 30, width: 30, resizeMode: 'contain'}}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    marginBottom: 20,
    marginRight: 20,
    maxWidth: '50%',
  },
  title: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
    color: DARK_GREY,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 17,
    overflow: 'hidden',
  },
});
