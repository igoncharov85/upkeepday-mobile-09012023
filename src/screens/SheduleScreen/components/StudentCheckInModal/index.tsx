import React, { FC, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import CheckIcon from '../../../../../assets/svg/classes/CheckIcon';
import { CustomButton } from '../../../../components/UI/CustomButton';



interface AddSessionModalProps {
  visible: boolean;
  visibleHandler: () => void;
  onPress: () => void;
}

export const StudentCheckInModal: FC<AddSessionModalProps> = memo(
  ({ visible, visibleHandler, onPress }) => {
    const onCreateLesson = () => {
      visibleHandler();
      onPress && onPress();
    }
    return visible ? (
      <TouchableOpacity style={styles.modalWrapper} activeOpacity={1}>
        <LinearGradient
          colors={['rgba(178, 178, 178, 0.5)', 'rgba(23, 25, 48, 0.6)']}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 0.0 }}
          angle={223.05}
          useAngle={true}
          style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.content}>
              <Text style={styles.title}>Class Name Student Check-in</Text>
              <View style={styles.allContainer}>
                <CheckButton active={false} icon />
                <Text style={styles.text}>ALL IN</Text>
              </View>
              <Line />
              <CheckItem />
              <CheckItem />
              <CheckItem />
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', flex: 1, alignItems: 'flex-end', marginBottom: 48 }}>
                <CustomButton text={'Skip'} style={{ width: 96 }} onPress={visibleHandler} />
                <CustomButton text={'Confirm'} style={{ width: 96 }} onPress={visibleHandler} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    ) : null;
  },
);


const CheckButton = ({ active, icon }: { active?: boolean; icon?: boolean }) => {
  const [isActive, setIsActive] = React.useState<boolean>(active || false);
  const handlePress = () => {
    setIsActive(!isActive);
  }
  return (
    <TouchableOpacity style={styles.checkBtn} onPress={handlePress}>
      <CheckIcon active={icon} />
      {isActive && <View style={{ position: 'absolute', height: 25, width: 25, backgroundColor: '#fff', top: 2, left: 2, borderRadius: 3 }} />}
    </TouchableOpacity>
  )

};
const CheckItem = ({ active, icon }: { active?: boolean; icon?: boolean }) => {

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 62, alignItems: 'center' }}>
        <View>
          <Text style={styles.text}>Anna Asol</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CheckButton icon />
          <View style={{ width: 20 }} />
          <CheckButton />
          <View style={{ width: 25 }} />
        </View>
      </View>
      <Line />
    </>
  )
}
const Line = () => (
  <View style={styles.line} />
);

