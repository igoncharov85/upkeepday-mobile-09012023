import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, ReactNode, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationEnum } from "../../../../common/constants/navigation";
import { updateCurrentClassRequestAction } from "../../../../store/shedule";
import { dispatch } from '../../../../store/store';
import styles from './styles';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DiamondIcon } from "../../../../../assets/svg/diamondIcon";
import { useAppSelector } from "../../../../store/hooks";
import { businessAccountActions } from "../../../../store/businessAccount";

interface AddSessionProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  rainbow?: boolean;
  icon?: ReactNode;
};

interface AddSessionModalProps {
  visible: boolean;
  visibleHandler: () => void;
};

export const AddSessionModal: FC<AddSessionModalProps> = memo(({ visible, visibleHandler }) => {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route);
  const studentTab = routeName === 'navigation/STUDENTS_TAB';
  const { currentSchool } = useAppSelector(state => state.businessAccount);

  const addClass = () => {
    visibleHandler();
    dispatch(businessAccountActions.setIsEdit(false));
    dispatch(
      updateCurrentClassRequestAction({
        Class: {
          Name: '',
          StartDate: '',
          EndDate: '',
          EndNumber: 0,
          EndScheduleType: '',
          MakeupRequired: false,
          TrackPrepayment: false,

        },
        Location: {
          LocationId: 0,
          LocationType: '',
          Url: '',
          AddressLine: '',
        },
        Students: [],
        Slots: [],
        Sessions: [],
      })
    );
    navigate(currentSchool ? NavigationEnum.ADD_SCHOOL_CLASS_SCREEN : NavigationEnum.ADD_CLASS_SCREEN);
  }
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  return visible ? (
    <TouchableOpacity onPress={visibleHandler} style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 100 }} activeOpacity={1}>
      <LinearGradient
        colors={['rgba(178, 178, 178, 0.88)', 'rgba(23, 25, 48, 0.898039)']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 0.0 }}
        angle={223.05}
        useAngle={true}
        style={styles.container}>
        <View />
        <View style={{ width: '100%', alignItems: 'center' }}>
          {
            // @ts-ignore
            studentTab ? <SessionButton title={'Add Student'} onPress={() => {
              visibleHandler();
              // @ts-ignore
              navigate(NavigationEnum.ADD_STUDENTS_SCREEN)
            }} /> : <>
              <SessionButton rainbow title={'Add Business Account'} icon={<DiamondIcon />} onPress={() => {
                visibleHandler();
                navigate(NavigationEnum.ADD_BUSINESS_ACCOUNT_SCREEN, { isClear: true });
              }} />
              <SessionButton title={'Add Class'} onPress={addClass} />
            </>
          }
        </View>
      </LinearGradient>
    </TouchableOpacity>
  ) : null;
},
);

const SessionButton: FC<AddSessionProps> = ({ title, onPress, disabled, rainbow, icon }) => {
  return (
    <LinearGradient
      colors={rainbow ? [
        '#EAAFC8', '#654EA3'
      ] : ['#FFF', '#FFF']}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 0.0, y: 0.0 }}
      style={{
        marginVertical: 0,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        minWidth: '82%',
        marginTop: 20,
      }}
    >
      <TouchableOpacity onPress={onPress && onPress} disabled={disabled && disabled}>
        <View style={[{
          backgroundColor: rainbow ? '#FFEDF4' : '#FFF',
          flexDirection: 'row',
          alignItems: 'center'
        }, styles.sessionBlock, disabled ? styles.sessionBlockDisabled : null]}>
          <Text style={[styles.sessionText, , disabled ? styles.sessionTextDisabled : null,]}>{title}</Text>
          {icon}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};
