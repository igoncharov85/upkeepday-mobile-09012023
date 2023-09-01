import React, { FC, memo, ReactNode } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import StudentCardSvg from '../../../../assets/svg/StudentCardSvg';
import TeacherCardRegSvg from '../../../../assets/svg/TeacherCardRegSvg';
import { NavigationEnum } from '../../../common/constants/navigation';
import {
  PRIVACY_POLICY,
  TERMS_OF_USE_LINK,
} from '../../../common/constants/server';
import { StyleEnum } from '../../../common/constants/styles/styles.enum';
import {
  INavigationBase,
  TRegistrationScreen,
} from '../../../common/types/component.styles';
import { ScreenHeader } from '../../../components/ScreenHeader';
// import {useTypedNavigation} from '../../../hook/useTypedNavigation';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IRegistrationCard {
  text: string;
  renderIcon: () => ReactNode;
  onPress: () => any;
  disabled: boolean;
}
interface IChooseRoleScreen extends INavigationBase {
  setScreen: (screen: TRegistrationScreen) => any;
}
export const ChooseRoleScreen: FC<IChooseRoleScreen> = memo(({ setScreen }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const registrationCards: Array<IRegistrationCard> = [
    {
      text: 'I am a private Tutor',
      onPress: () => setScreen('teacher'),
      renderIcon: () => <TeacherCardRegSvg />,
      disabled: false,
    },
    {
      text: 'I am a student or parent (coming soon!)',
      onPress: () => setScreen('student'),
      renderIcon: () => <StudentCardSvg />,
      disabled: true,
    },
  ];
  const renderRegistrationCard = ({
    onPress,
    renderIcon,
    text,
    disabled
  }: IRegistrationCard) => {
    return (
      <TouchableOpacity
        activeOpacity={StyleEnum.TOUCHABLE_OPACITY}
        style={styles.cardWrapper}
        onPress={onPress}
        disabled={disabled}>
        {renderIcon()}
        <Text style={styles.cardText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ScreenHeader text={'Welcome To UpkeepDay!'} />

      <View style={styles.contentWrapper}>
        <View style={styles.subWrapper}>
          <Text style={styles.headerSubTitle}>
            First help us identify yourself
          </Text>
        </View>
        {registrationCards.map((data, index) => (
          <View style={styles.cardContainer} key={index}>
            {renderRegistrationCard(data)}
          </View>
        ))}
        <Text
          style={styles.text}
          onPress={() => navigate(NavigationEnum.LOGIN)}>
          I’m an existing user. Login
        </Text>
      </View>

      <View style={styles.row}>
        <Text
          style={styles.text}
          onPress={() => Linking.openURL(TERMS_OF_USE_LINK)}>
          Terms of use
        </Text>
        <Text
          style={styles.text}
          onPress={() => Linking.openURL(PRIVACY_POLICY)}>
          Privacy policy
        </Text>
      </View>
    </View>
  );
});
