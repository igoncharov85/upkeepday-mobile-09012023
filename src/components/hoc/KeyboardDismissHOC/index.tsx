import React from 'react'
import {FC, PropsWithChildren} from 'react';
import {Keyboard, Pressable, ViewStyle} from 'react-native';

interface IKeyboardDismissHOC {
  extraStyles?: ViewStyle;
}
export const KeyboardDismissHOC: FC<PropsWithChildren<IKeyboardDismissHOC>> = ({
  extraStyles,
  children,
}) => {
  const onPress = () => {
    Keyboard.dismiss();
  };
  return (
    <Pressable onPress={onPress} style={extraStyles ? extraStyles : {flex: 1}}>
      {children}
    </Pressable>
  );
};
