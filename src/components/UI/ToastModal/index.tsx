import React, {FC, memo, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {popToastsAction} from '../../../store/app';
import {useAppSelector} from '../../../store/hooks';

import {toastConfig} from './config';

const TOAST_TIME = 3000;
export const ToastModal: FC = memo(() => {
  const dispatch = useDispatch();
  const {toasts} = useAppSelector(state => state.app);

  useEffect(() => {
    if (toasts && toasts.length !== 0) {
      const currentToast = toasts[0];
      Toast.show({
        type: currentToast.type,
        visibilityTime: TOAST_TIME,
        text1: currentToast.text1,
        text2: currentToast.text2,
        autoHide: currentToast.autoHide === false ? false : true,
      });
      if (currentToast.autoHide) {
        setTimeout(() => {
          dispatch(popToastsAction());
        }, TOAST_TIME + 200);
      }
    }
  }, [dispatch, toasts]);

  // @ts-ignore
  return <Toast config={toastConfig} topOffset={40} />;
});
