import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {NavigationEnum} from '../../../../common/constants/navigation';
import {IStudentByIdResponse} from '../../../../common/types/user';
import {ScreenHeader} from '../../../../components/ScreenHeader';
import {ScreenLoading} from '../../../../components/UI/ScreenLoading';
import {useTypedNavigation} from '../../../../hook/useTypedNavigation';
import {useTypedRoute} from '../../../../hook/useTypedRoute';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {fetchStudentPaymentsClassesAction} from '../../../../store/user/actions';
import {StudentsNavigation} from '../../components/StudentsNavigation';
import {PaymentCard} from './PaymentCard';
import styles from './styles';

export const StudentPayments: FC = () => {
  const {navigate, goBack} = useTypedNavigation();
  const route = useTypedRoute<NavigationEnum.STUDENT_PAYMENTS_SCREEN>();
  const {item: user} = route.params;
  const dispatch = useAppDispatch();
  const {studentList, loading} = useAppSelector(state => state.user);
  const [filteredData, setFilteredData] = useState<IStudentByIdResponse[]>([]);

  useEffect(() => {
    return () => {
      setFilteredData([]);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchStudentPaymentsClassesAction({StudentId: user.StudentId}));
    }, []),
  );

  useEffect(() => {
    filterData('Scheduled');
  }, [studentList]);

  const filterData = (option: string) => {
    const newData = studentList.filter(item => item.Status === option);
    setFilteredData(newData);
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
      <View style={{marginTop: 16}}>
        <StudentsNavigation
          getOption={option => {
            filterData(option);
          }}
          isRequest={false}
        />
      </View>
      {loading ? (
        <ScreenLoading />
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.text}>
              Click on a class you want to view or update payments for
            </Text>
          </View>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.ClassId.toString()}
            contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <PaymentCard
                  {...item}
                  onPress={() => {
                    navigate(NavigationEnum.PAYMENTS_TABLE_SCREEN, {
                      user,
                      classData: item,
                    });
                  }}
                />
              );
            }}
          />
        </>
      )}
    </>
  );
};
