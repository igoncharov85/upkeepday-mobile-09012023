import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { IToastModal } from '../../../common/types/component.styles';
import { popToastsAction } from '../../../store/app';
import { dispatch } from '../../../store/store';
import { styles } from './styles';

const modalCloseHandler = () => {
  Toast.hide();
  setTimeout(() => {
    dispatch(popToastsAction());
  }, 200);
};

// @ts-ignore
export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      onPress={!props.autoHide ? modalCloseHandler : () => null}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      onPress={!props.autoHide ? modalCloseHandler : () => null}
      style={{
        backgroundColor: '#350A19',
        borderRadius: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'red',
      }}
      text1Style={{
        fontSize: 17,
        lineHeight: 19,
        fontWeight: 'bold',
        color: 'white',
      }}
      text2Style={{
        marginTop: 5,
        fontSize: 15,
        lineHeight: 18,
        color: 'rgba(255,255,255,0.5)',
      }}
    />
  ),

  appToast: ({ text1, text2, autoHide }: IToastModal) => {
    return (
      <Pressable style={styles.container} onPress={!autoHide ? modalCloseHandler : null}>
        <View style={styles.row}>
          <View>
            <Text style={styles.textHeader}>{text1}</Text>
            <Text style={styles.toastText}>{text2}</Text>
          </View>
        </View>
      </Pressable>
    );
  },
};
