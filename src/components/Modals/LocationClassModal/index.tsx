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

const LocationClassModal = () => {
  const { goBack } = useTypedNavigation();
  const route = useRoute(),
    { params }: any = route;


  const closeModal = () => {
    goBack();
  };
  const { item } = params as any;

  console.log('------------------------------------')
  const {
    AddressLine,
    City,
    Country,
    LocationId,
    LocationType,
    PostalCode,
    State,
    Url
  } = item.Location

  const LocationTypeIsOnline = LocationType == "Online"

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
          style={styles.container}
        >
          <View />

          <View style={styles.container}>
            <View />
            <View style={{ width: '90%' }}>


              <View style={styles.item}>
                <View>
                  <Text style={styles.title}>
                    {LocationTypeIsOnline ? 'Online Location' : 'In-Person Location'}
                  </Text>
                  {LocationTypeIsOnline ? (
                    <Text style={styles.title}>
                      {Url || 'information not found'}
                    </Text>
                  ) : (
                    <>
                      <Text style={styles.title}>
                        {AddressLine}
                      </Text>
                      <Text style={styles.title}>
                        {`${City}, ${State}, ${PostalCode}`}
                      </Text>
                      <Text style={styles.title}>
                        {Country}
                      </Text>
                    </>
                  )}
                </View>
              </View>

            </View>
            <View style={{ width: '100%', alignItems: 'center', opacity: 0.7671, paddingHorizontal: 20, paddingBottom: 14 }}>
              <CustomButton text={'Back'} onPress={closeModal} backgroundColor='#FA6B6B' />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity >
    </>
  );
};

export default LocationClassModal;
