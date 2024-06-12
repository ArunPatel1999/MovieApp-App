import {Colors, Constants} from 'global/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE + '44',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    backgroundColor: Colors.BLACK,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: Constants.HEIGHT / 1.5,
  },
});
