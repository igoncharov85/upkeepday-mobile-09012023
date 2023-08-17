import React from 'react';
import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../src/screens/StudentsScreen/components/StudentItem/styles';

const BankCardIcon: FC = () => {
  return (
    <LinearGradient
      colors={['#2ECB9C', '#169861']} style={styles.buttonIcon}
    >
      <Svg width="28" height="21" viewBox="0 0 28 21" fill="none">
        <Path d="M27.0667 4.20001V1.86667C27.0667 0.835802 26.2309 0 25.2001 0H1.86667C0.835802 0 0 0.835802 0 1.86667V4.20001H27.0667Z" fill="white"/>
        <Path d="M15.5713 6.0667H0V16.8001C0 17.8309 0.835802 18.6667 1.86667 18.6667H14.1279C12.8824 17.1398 12.1334 15.1915 12.1334 13.0667C12.1334 10.2177 13.483 7.6893 15.5713 6.0667ZM1.86667 12.6H7.93336V14.0001H1.86667V12.6ZM10.2667 16.8001H1.86667V15.4001H10.2667V16.8001Z" fill="white"/>
        <Path d="M21 6.0667C17.1341 6.0667 14 9.20084 14 13.0667C14 16.9326 17.1341 20.0667 21 20.0667C24.8659 20.0667 28 16.9326 28 13.0667C28 9.20084 24.8659 6.0667 21 6.0667ZM20.5334 16.7198L17.0735 13.2599L18.3932 11.9402L20.5334 14.0803L24.0735 10.5402L25.3932 11.8599L20.5334 16.7198Z" fill="white"/>
      </Svg>
    </LinearGradient>
  )
}

export default BankCardIcon;
