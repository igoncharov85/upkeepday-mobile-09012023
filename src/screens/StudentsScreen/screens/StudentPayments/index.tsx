import React, { FC, useEffect, useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import styles from './styles';
import { ScreenHeader } from "../../../../components/ScreenHeader";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StudentsNavigation } from "../../components/StudentsNavigation";
import { PaymentCard } from "./PaymentCard";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchStudentPaymentsClassesAction } from "../../../../store/user/actions";
import { ScreenLoading } from "../../../../components/UI/ScreenLoading";
import { IStudentByIdResponse } from "../../../../common/types/user";
import { NavigationEnum } from "../../../../common/constants/navigation";

export const StudentPayments: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //@ts-ignore
  const { item: user } = route.params;
  const dispatch = useAppDispatch();
  const { studentList, loading } = useAppSelector(state => state.user);
  const [filteredData, setFilteredData] = useState<IStudentByIdResponse[]>([]);

  useEffect(() => {
    return () => {
      setFilteredData([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchStudentPaymentsClassesAction({StudentId: user.StudentId}));
    }, [])
  );

  useEffect(() => {
    filterData('Scheduled');
  }, [studentList]);

  const filterData = (option: string) => {
    const newData = studentList.filter(item => item.Status === option);
    setFilteredData(newData);
  }

  return (
    <>
      <View style={styles.header}>
        <ScreenHeader 
          text={`${user.FirstName} ${user.LastName}`}
          onBackPress={() => {navigation.goBack()}} withBackButton={true}  
        />
      </View>
      <View style={{marginTop: 16}}>
        <StudentsNavigation getOption={(option) => {filterData(option)}} isRequest={false} />
      </View>
      {
        loading ? (<ScreenLoading />) : (
          <>
            <View style={styles.container}>
              <Text style={styles.text}>Click on a class you want to view or update payments for</Text>
            </View>
            <FlatList 
              data={filteredData}
              keyExtractor={item => item.ClassId.toString()}
              contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <PaymentCard {...item} onPress={() => {
                    //@ts-ignore
                    navigation.navigate(NavigationEnum.PAYMENTS_TABLE_SCREEN, {
                      user, classData: item
                    })
                  }} />
                )
              }}
            />
          </>
        )
      }
    </>
  )
}