import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PaymentIcon from '../../../../assets/svg/classes/PaymentIcon';
import { useTypedNavigation } from '../../../hook/useTypedNavigation';
import { formatDateForPeriod } from '../../../services/utils/fullDateToValue.util';
import { fetchClassesAction } from '../../../store/classes/actions';
import { dispatch } from '../../../store/store';
import { CustomButton } from '../../UI/CustomButton';

import styles from './styles';

const ResultClassModal = () => {
  const { goBack } = useTypedNavigation();
  const route = useRoute(),
    { params }: any = route;
  console.log(params)
  const closeModal = () => {
    goBack();
  };
  const { item, actionBtn, nameAction } = params as any;
  const handleAction = () => {
    actionBtn();
    item?.Status && dispatch(fetchClassesAction(item.Status.toLowerCase()));
  };
  console.log('------------------------------------')
  console.log(item, 'item in ResultClassModal')
  console.log(item, 'nameAction in ResultClassModal')
  console.log(item, 'actionBtn in ResultClassModal')
  return (
    <>
      <TouchableOpacity
        onPress={closeModal}
        style={styles.modalWrapper}
        activeOpacity={1}>
        <LinearGradient
          colors={['rgba(178, 178, 178, 0.88)', 'rgba(23, 25, 48, 0.898039)']}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 0.0 }}
          angle={223.05}
          useAngle={true}
          style={styles.container}>
          <View />
          <View style={styles.content}>
            <View style={styles.container}>
              <View />
              <View style={styles.item}>
                {item.Name ? (
                  <View>
                    <Text style={styles.title}>{item.Name}</Text>
                    <Text style={styles.text}>
                      {formatDateForPeriod(item.StartDate)} -{' '}
                      {formatDateForPeriod(item.EndDate)}
                    </Text>
                    <Text style={styles.text}>
                      Scheduled classes: {item.ScheduledClasses}
                    </Text>
                    <Text style={styles.text}>
                      Total classes held: {item.TotalClassesHeld}
                    </Text>
                    <Text style={styles.text}>
                      {item.Students.length} students
                    </Text>
                    <Text style={styles.text}>
                      {item.Location.Address || 'Location Address'}
                    </Text>
                    <View style={styles.payment}>
                      <View style={styles.paymentItem}>
                        <PaymentIcon active={item.TrackPrepayment} />
                      </View>
                      <Text style={styles.underlineText}>Payment Tracking</Text>
                    </View>
                  </View>
                ) : null}
                {item.EnrolledClasses ? (
                  <View>
                    <Text style={[styles.title, { textAlign: 'center' }]}>
                      {item.FirstName} {item.LastName}
                    </Text>
                    <Text style={[styles.text, { textAlign: 'center' }]}>
                      {item.Phone}
                    </Text>
                    <Text style={[styles.text, { textAlign: 'center' }]}>
                      {item.Email}
                    </Text>
                    <Text style={[styles.text, { textAlign: 'center' }]}>
                      <Text style={styles.title}>{item.Notes && 'Notes:'}</Text>
                      {item.Notes}
                    </Text>
                  </View>
                ) : null}
                {item.StudentName ? (
                  <View>
                    <Text style={[styles.title, { textAlign: 'center' }]}>
                      Remove Student
                    </Text>
                    <Text style={[styles.text, { textAlign: 'center' }]}>
                      {item.StudentName}
                    </Text>
                    <Text style={[styles.text, { textAlign: 'center' }]}>
                      {item.ClassName}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <CustomButton text={nameAction} onPress={handleAction} />
                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default ResultClassModal;
