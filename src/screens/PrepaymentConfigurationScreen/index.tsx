import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {NavigationEnum} from '../../common/constants/navigation';
import {ScreenHeader} from '../../components/ScreenHeader';
import {CustomButton} from '../../components/UI/CustomButton';
import {useTypedNavigation} from '../../hook/useTypedNavigation';
import {useAppSelector} from '../../store/hooks';
import {ListGradientCircleButtons} from './ListGradientCircleButtons';
import styles from './styles';

interface IPrepaymentConfigurationScreen {}

export const PrepaymentConfigurationScreen: React.FC<
  IPrepaymentConfigurationScreen
> = () => {
  const {createCurrentClassRequest} = useAppSelector(state => state.schedule);
  const [makeupRequired, setMakeupRequired] = useState(
    createCurrentClassRequest.Class?.MakeupRequired ? 1 : 0,
  );
  const [trackPrepayment, setTrackPrepayment] = useState(
    createCurrentClassRequest.Class?.TrackPrepayment ? 1 : 0,
  );
  const {navigate, goBack} = useTypedNavigation();

  const goTextStep = () => {
    console.log(
      'makeupRequired',
      makeupRequired,
      'trackPrepayment',
      trackPrepayment,
    );
    navigate(NavigationEnum.PAYMENT_TRACKING_SET_UP, {
      makeupRequired: makeupRequired,
      trackPrepayment: trackPrepayment,
    });
  };

  const HandleMakeupRequired = (agreement: number) => {
    setMakeupRequired(agreement);
  };
  const HandleTrackPrepayment = (agreement: number) => {
    setTrackPrepayment(agreement);
  };

  return (
    <View style={{height: '100%'}}>
      <View style={{padding: 20, paddingBottom: 0}}>
        <ScreenHeader
          text={'Prepayment Configuration'}
          onBackPress={() => goBack()}
          withBackButton={true}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.subtitle}>
          UpkeepDay will track prepayments against student’s attendance
        </Text>
      </View>
      <View>
        <ListGradientCircleButtons
          onPress={HandleMakeupRequired}
          label="Do you require to schedule a make-up sessions for this Class?"
          buttons={[
            {
              title: 'Yes',
              subtitle: ' - I need to make up a session if student(s) was absent',
            },
            {
              title: 'No',
              subtitle:
                ' - I don’t need to make up a session if student(s) was absent',
            },
          ]}
        />
        <ListGradientCircleButtons
          onPress={HandleTrackPrepayment}
          twoLines={true}
          label="Do you receive Prepayment for this Class?"
          buttons={[
            {title: 'Yes', subtitle: ' - Track my prepayments'},
            {title: 'No', subtitle: ' '},
          ]}
        />
      </View>
      <View style={{flex: 1, padding: 20, justifyContent: 'flex-end'}}>
        <CustomButton text={'Next step'} onPress={goTextStep} />
      </View>
    </View>
  );
};
