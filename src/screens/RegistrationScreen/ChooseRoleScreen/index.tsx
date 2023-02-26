import React, {FC, memo, ReactNode} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import StudentCardSvg from '../../../../assets/svg/StudentCardSvg';
import TeacherCardRegSvg from '../../../../assets/svg/TeacherCardRegSvg';
import {StyleEnum} from '../../../common/constants/styles/styles.enum';
import {TRegistrationScreen} from '../../../common/types/component.styles';
import {ScreenHeader} from '../../../components/ScreenHeader';
import styles from './styles';

interface IRegistrationCard {
  text: string;
  renderIcon: () => ReactNode;
  onPress: () => any;
}
interface IChooseRoleScreen {
  setScreen: (screen: TRegistrationScreen) => any;
}
export const ChooseRoleScreen: FC<IChooseRoleScreen> = memo(({setScreen}) => {
  const registrationCards: Array<IRegistrationCard> = [
    {
      text: 'I am a student or parent',
      onPress: () => setScreen('student'),
      renderIcon: () => <StudentCardSvg />,
    },
    {
      text: 'I am a private Tutor',
      onPress: () => setScreen('tutor'),
      renderIcon: () => <TeacherCardRegSvg />,
    },
  ];
  const renderRegistrationCard = ({
    onPress,
    renderIcon,
    text,
  }: IRegistrationCard) => {
    return (
      <TouchableOpacity
        activeOpacity={StyleEnum.TOUCHABLE_OPACITY}
        style={styles.cardWrapper}
        onPress={onPress}>
        {renderIcon()}
        <Text style={styles.cardText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ScreenHeader text={'Welcome To CP'} />
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
      <Text style={styles.text}>I’m an existing user. Login</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Terms of use</Text>
        <Text style={styles.text}>Privacy policy</Text>
      </View>
    </View>
  );
});
