import {StyleSheet} from 'react-native';
import { HEIGHT } from '../../global/constants';
import {Fonts, Colors, Constants} from "../../global/index";

export const styles = StyleSheet.create({
  contentContainerStyle: {
    // paddingTop: 10
  },
  con: {
    position: 'relative',
    marginBottom: 10,
  },
  row: {
    width: 51,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  // carousel item
  itemCon: {
    backgroundColor: Colors.BLACK,
    height: HEIGHT/4,
    marginHorizontal: 20,
    width: Constants.WIDTH - 40,
    // borderRadius: 20,
  },

  //dots
  circle: {
    height: 7,
    width: 7,
    borderRadius: 7 / 2,
    backgroundColor: Colors.PRIMARY,
    marginRight: 10,
  },
  dotsCon: {
    width: Constants.WIDTH - 40,
    height: 7,
    position: 'relative',
    bottom: 24,
    left: 20,
    alignItems: 'center',
  },
  dotsFlatList: {
    height: 7,
    width: 85,
  },
});