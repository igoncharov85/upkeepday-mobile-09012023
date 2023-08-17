import {useRoute} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import {ISlot} from '../../../../common/types/user';
import {ConfirmationModal} from '../../../../components/Modals/ConfirmationModal';
import {ScreenHeader} from '../../../../components/ScreenHeader';
import {useTypedNavigation} from '../../../../hook/useTypedNavigation';
import {useAppDispatch} from '../../../../store/hooks';
import {sendStudentPaymentAction} from '../../../../store/user/actions';
import {formatTimeSlot} from '../StudentPayments/PaymentCard';
import {LeftIconArrow} from './LeftIconArrow';
import {RightIconArrow} from './RightIconArrow';
import styles from './styles';

export const PaymentTracking: FC = () => {
  const {goBack} = useTypedNavigation();
  const route = useRoute();
  //@ts-ignore
  const {user, TransactionType, classData, TransactionUid} = route.params;
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [inputErrors, setInputErrors] = useState<{
    amount: boolean;
    selectedDate: boolean;
  }>({
    amount: false,
    selectedDate: false,
  });
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const obj = {amount, selectedDate};
    for (let input in obj) {
      //@ts-ignore
      if (obj[input].length === 0)
        setInputErrors(prev => ({...prev, [input]: true}));
      else setInputErrors(prev => ({...prev, [input]: false}));
    }

    if (amount.length !== 0 && selectedDate.length !== 0) {
      setIsModalOpened(true);
    }
  };

  const sendRequest = () => {
    //* success
    const finalData = {
      TransactionUid,
      TransactionType,
      Amount: +amount,
      Date: selectedDate,
    };

    console.log(finalData, {
      StudentId: user.StudentId,
      ClassId: classData.ClassId,
    });
    dispatch(
      sendStudentPaymentAction({
        ...finalData,
        StudentId: user.StudentId,
        ClassId: classData.ClassId,
      }),
    );
  };

  const renderSlots = () => {
    return classData.Slots.map((item: ISlot) => (
      <Text style={[styles.text, {textAlign: 'center'}]} key={item.SlotUid}>
        {formatTimeSlot(item)}
      </Text>
    ));
  };

  return (
    <>
      <View style={styles.header}>
        <ScreenHeader
          text={`${user.FirstName} ${user.LastName}`}
          onBackPress={() => {
            goBack();
          }}
          withBackButton={true}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text
            style={[
              styles.title,
              {
                color: TransactionType === 'Payment' ? '#169861' : '#F00',
                fontWeight: 'bold',
              },
            ]}>
            Add {TransactionType}
          </Text>
          <Text style={[styles.title, {marginBottom: 20}]}>
            {classData.Name}
          </Text>
          {renderSlots()}
          <View style={styles.textWrap}>
            <Text style={styles.text}>
              Total classes held: {classData.PastSessions}
            </Text>
            <Text style={styles.text}>
              Scheduled classes: {classData.Scheduled}
            </Text>
          </View>
          <View style={styles.inputBlock}>
            <View style={styles.inputWrap}>
              <Text
                style={[
                  styles.text,
                  {
                    marginRight: 30,
                    color: inputErrors.amount ? '#F00' : '#000',
                  },
                ]}>
                Amount
              </Text>
              <LinearGradient
                colors={['#EAAFC8', '#654EA3']}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.linearGradient}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={text => {
                    setAmount(text);
                  }}
                />
              </LinearGradient>
            </View>
            <View style={[styles.inputWrap, {marginTop: 20}]}>
              <Text
                style={[
                  styles.text,
                  {
                    marginRight: 50,
                    color: inputErrors.selectedDate ? '#F00' : '#000',
                  },
                ]}>
                Date
              </Text>
              <LinearGradient
                colors={['#EAAFC8', '#654EA3']}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.linearGradient}>
                <TextInput style={styles.input} value={selectedDate} />
              </LinearGradient>
            </View>
          </View>
          <Calendar
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: '#654EA3',
              },
            }}
            style={{
              marginTop: 20,
              borderRadius: 8,
              marginBottom: 20,
            }}
            renderArrow={direction => {
              return direction === 'left' ? (
                <LeftIconArrow />
              ) : (
                <RightIconArrow />
              );
            }}
          />
          <TouchableOpacity style={styles.done} onPress={handleSubmit}>
            <Text style={styles.doneText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ConfirmationModal
        show={isModalOpened}
        result={value => {
          if (value) sendRequest();
          setIsModalOpened(false);
        }}>
        <Text style={[styles.modalTitle, {fontWeight: 'bold'}]}>
          {classData.Name}
        </Text>
        {renderSlots()}
        <Text style={styles.modalTitle}>
          Total classes held: {classData.PastSessions}
        </Text>
        <Text style={styles.modalTitle}>
          Scheduled classes: {classData.Scheduled}
        </Text>
        <Text style={styles.modalTitle}>
          Student: {`${user.FirstName} ${user.LastName}`}
        </Text>
        <Text style={styles.modalTitle}>
          {TransactionType} Amount: {amount}
        </Text>
        <Text style={[styles.modalTitle, {marginBottom: 0}]}>
          Date: {selectedDate}
        </Text>
      </ConfirmationModal>
    </>
  );
};
