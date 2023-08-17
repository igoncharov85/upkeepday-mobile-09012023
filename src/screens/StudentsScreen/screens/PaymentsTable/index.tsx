import React, {FC, useState, useCallback} from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity, ScrollView , Switch} from "react-native";
import styles from './styles';
import { ScreenHeader } from '../../../../components/ScreenHeader';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchStudentPaymentsAction } from '../../../../store/user/actions';
import { ConfirmationModal } from '../../../../components/Modals/ConfirmationModal';
import { NavigationEnum } from '../../../../common/constants/navigation';
import { ScreenLoading } from '../../../../components/UI/ScreenLoading';

export const PaymentsTable: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //@ts-ignore
  const { user, classData } = route.params;
  const dispatch = useAppDispatch();
  const { payments, loading } = useAppSelector(state => state.user);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isModalOpened,  setIsModalOpened] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchStudentPaymentsAction({StudentId: user.StudentId, ClassId: classData.ClassId}))
    }, [])
  );

  const handleSubmit = () => {
    const finalData = {
      TransactionUid: payments.TransactionUid,
      TransactionType: isEnabled ? 'Refund' : 'Payment',
      user, classData
    };
    //@ts-ignore
    navigation.navigate(NavigationEnum.PAYMENT_STUDENT_TRACKING, finalData);
  }

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <ScreenHeader 
            text={`${user.FirstName} ${user.LastName}`}
            onBackPress={() => {navigation.goBack()}} withBackButton={true}  
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            loading ? (
              <View style={{height: 100}}>
                <ScreenLoading />
              </View>
            ) : (
              <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                  <Text style={styles.columnHeader} />
                  <Text style={styles.columnHeader}>Amount</Text>
                  <Text style={styles.columnHeader}>Date</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cell, {fontSize: 20, fontWeight: 'bold'}]}>Total</Text>
                  <Text style={[styles.cell, {
                    fontSize: 20, fontWeight: 'bold', 
                    color: payments.Total !== undefined && payments.Total >= 0 ? '#169861' : "#F00"
                  }]}>
                    ${payments.Total}
                  </Text>
                  <Text style={[styles.cell]} />
                </View>
                {
                  payments.Transactions && payments.Transactions.map((item, idx) => {
                    return (
                      <View style={styles.tableRow} key={item.TransactionId + idx}>
                        <Text style={[styles.cell]}>{classData.Name}</Text>
                        <Text 
                          style={[styles.cell, {color: item.Amount >= 0 ? '#169861' : "#F00"}]}
                        >
                          ${item.Amount}
                        </Text>
                        
                        <Text style={[styles.cell]}>{moment(item.Date).format("MM/DD/YYYY")}</Text>
                      </View> 
                    )
                  })
                }
              </View>
            )
          }
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.switcherWrapper}>
          <Text style={[styles.switcherText, {marginRight: 30}]}>Payment</Text>
          <Switch
            trackColor={{false: '#169861', true: '#F00'}}
            ios_backgroundColor='#169861'
            thumbColor={'#fff'}
            onValueChange={() => {
              setIsEnabled(previousState => !previousState);
              setIsModalOpened(true);
            }}
            value={isEnabled}
            style={{ transform:[{ scaleX: 2 }, { scaleY: 2 }] }}
          />
          <Text style={[styles.switcherText, {marginLeft: 30}]}>Refund</Text>
        </View>
        <TouchableOpacity style={styles.done} onPress={handleSubmit}>
          <Text style={styles.doneText}>Process</Text>
        </TouchableOpacity>
      </View>
      <ConfirmationModal show={isModalOpened} result={(value) => {
        if (!value) setIsEnabled(prev => !prev); 
        setIsModalOpened(false);
      }}>
        <Text style={{textAlign: 'center'}}>
          Do you want to switch to "{isEnabled ? 'Refund' : 'Payment'}"?
        </Text>
      </ConfirmationModal>
    </>
  )
}