import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MyText from 'components/MyText/MyText';
import {Colors} from 'global/index';

interface buttonProps {
  title: string;
  width: string | number;
  backgroundColor: string;
  icon: any;
  onPress: void;
}

const MyButton: React.FC<buttonProps> = ({
  title,
  width = '100%',
  backgroundColor = Colors.THEME_GREEN,
  icon,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        backgroundColor: backgroundColor,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: width,
      }}>
      {icon ? icon : null}
      <MyText
        text={title}
        textAlign="center"
        textColor="white"
        fontSize={16}
        marginLeft={icon ? 10 : 0}
      />
    </TouchableOpacity>
  );
};

export default MyButton;
