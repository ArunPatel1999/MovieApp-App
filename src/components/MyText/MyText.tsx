//import : react components
import {Colors} from 'global/index';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface textProps {
  text: String;
  textAlign: 'auto' | 'center' | 'justify' | 'left' | 'right';
  fontSize: number;
  style: Object;
  textColor:
    | 'Black'
    | 'white'
    | 'theme_green'
    | 'primary'
    | 'grey'
    | 'onxy'
    | 'disabled'
    | 'selective_yellow'
    | 'success'
    | 'danger'
    | 'warning'
    | 'safety_orange'
    | 'sea_green'
    | 'dark_jungle_green'
    | 'ku_crimson'
    | 'trolley_grey'
    | 'outer_space'
    | 'steel_blue'
    | 'liver'
    | 'old_lavender'
    | 'dark_gray'
    | 'prussian_blue'
    | 'jasper'
    | 'dark_green'
    | 'platinum'
    | 'honey_dew'
    | 'ash_grey'
    | 'ucla_blue'
    | 'taupe'
    | 'another_black';
  fontWeight:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 'bold'
    | 'normal';
  margin: number;
  marginBottom: number;
  marginVertical: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  lineHeight: number;
}
const MyText: React.FC<textProps> = ({
  text,
  textAlign = 'auto',
  textColor = Colors.WHITE,
  fontSize = 14,
  style,
  fontWeight,
  margin,
  marginBottom,
  marginVertical,
  marginLeft,
  marginRight,
  marginTop,
  lineHeight,
}) => {
  const getFontColor = () => {
    const keys: string[] = Object.keys(Colors).map(item => item?.toLowerCase());
    const values: string[] = Object.values(Colors).map((item: any) =>
      item?.toLowerCase(),
    );
    const idx: number = keys.findIndex(item => item === textColor);
    if (idx > 1) return values[idx];
    return textColor;
  };
  const styles = StyleSheet.create({
    textStyle: {
      color: getFontColor(),
      textAlign: textAlign,
      fontSize: fontSize,
      fontWeight: fontWeight,
      margin,
      marginBottom,
      marginVertical,
      marginLeft,
      marginRight,
      marginTop,
      lineHeight,
    },
  });
  return <Text style={[styles.textStyle, style]}>{text}</Text>;
};

export default MyText;
