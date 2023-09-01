
import React, { memo, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationEnum } from '../../common/constants/navigation';
import { AddBusinessAccountScreen } from "../../screens/AddBusinessAccountScreen";
import { AddNewTeacherScreen } from "../../screens/AddNewTeacher";
import { LoginScreen } from '../../screens/LoginScreen';
import { PaymentTrackingSetUp } from "../../screens/PaymentTrackingSetUp";
import { RegistrationScreen } from '../../screens/RegistrationScreen';
import { FinalRegistrationScreen } from '../../screens/RegistrationScreen/FinalRegistrtionScreen';
import { SendEmailScreen } from '../../screens/ForgotPassScreen/SendEmailScreen';
import { SetPasswordScreen } from '../../screens/ForgotPassScreen/SetPasswordScreen';
import { ScheduleMonthScreen } from '../../screens/SheduleScreen/ScheduleMonthScreen';
import { ScheduleDayScreen } from '../../screens/SheduleScreen/SheduleDayScreen';
import { SheduleWeekScreen } from '../../screens/SheduleScreen/SheduleWeekScreen';
import { CancellationScreen } from '../../screens/CancellationScreen';
import { AddClassScreen } from '../../screens/AddClassScreen';
import { SelectDateScreen } from '../../screens/SelectDateScreen';
import { useAppSelector } from '../../store/hooks';
import { DateRecurrenceScreen } from '../../screens/DateRecurrenceScreen';
import { DatePreviewScreen } from '../../screens/DatePreviewScreen';
import { AddStudentsScreen } from '../../screens/AddStudentsScreen';
import { PrepaymentConfigurationScreen } from '../../screens/PrepaymentConfigurationScreen';
import { TutorTabNavigator } from './TutorTabNavigator';
import { SchoolTabNavigator } from './SchoolTabNavigator';
import { ClassesScreen } from '../../screens/ClassesScreen';
import { EditClassScreen } from '../../screens/EditClassScreen';
import ClassesPreviewScreen from '../../screens/ClassesScreen/screens/ClassesPreviewScreen';
import ResultClassModal from '../../components/Modals/ResultClassModal';
import ClassesEditNameScreen from '../../screens/ClassesScreen/screens/ClassesEditNameScreen';
import ClassesEditDateScreen from '../../screens/ClassesScreen/screens/ClassesEditDateScreen';
import ClassesEditPreviewScreen from '../../screens/ClassesScreen/screens/ClassesEditDateScreen/ClassesEditPreviewScreen';
import ClassesStudentScreen from '../../screens/ClassesScreen/screens/ClassesStudentScreen';
import ChangeStudentScreen from '../../screens/ClassesScreen/screens/ClassesStudentScreen/ChangeStudentScreen';
import StudentsScreen from '../../screens/StudentsScreen';
import { EditStudentScreen } from '../../screens/StudentsScreen/screens/EditStudentScreen';
import PreviewStudentScreen from '../../screens/StudentsScreen/screens/PreviewStudentScreen';
import { MoreScreen } from '../../screens/MoreScreen';
import DurationSessionModal from '../../components/Modals/DurationSessionModal';
import SelectDurationSessionModal from '../../components/Modals/SelectDurationSessionModal';
import EditTimeSessionModal from '../../components/Modals/EditTimeSessionModal';
import { AddTeachersScreen } from '../../screens/AddTeachersScreen';
import { SaveBusinessAccountScreen } from '../../screens/SaveBusinessAccountScreen';
import { AddSchoolClassScreen } from '../../screens/AddSchoolClassScreen';
import { SelectSchoolDateScreen } from '../../screens/SelectSchoolDateScreen';
import { SelectClassTeacherScreen } from '../../screens/SelectClassTeacherScreen';
import { SchoolClassLocationScreen } from '../../screens/SchoolClassLocationScreen';
import { MoreOptionsScreen } from '../../screens/ClassesScreen/screens/MoreOptionsScreen';
import { UpdateClassStudentsScreen } from '../../screens/ClassesScreen/screens/UpdateClassStudentsScreen';
import { businessAccountActions, selectBusinessAccount } from '../../store/businessAccount';
import { dispatch } from '../../store/store';
import { EditTeacherScreen } from '../../screens/SchoolTeachers/UI/EditTeacherScreen';
import { TeacherClassesScreen } from '../../screens/SchoolTeachers/UI/TeacherClassesScreen';


const Stack = createNativeStackNavigator();

export const StackNavigator = memo(() => {
  const { isAuth } = useAppSelector((store) => store.auth);
  const { currentSchool } = useAppSelector(selectBusinessAccount);

  useEffect(() => {
    if (isAuth) {
      dispatch(businessAccountActions.setIsSelectAccount(true));
    };
  }, [isAuth]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuth ? NavigationEnum.HOME_SCREEN : NavigationEnum.LOGIN}>

      <Stack.Group >
        <Stack.Screen name={NavigationEnum.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={NavigationEnum.REGISTRATION}
          component={RegistrationScreen}
        />
        <Stack.Screen
          name={NavigationEnum.ADD_NEW_TEACHER_SCREEN}
          component={AddNewTeacherScreen}
        />
        <Stack.Screen
          name={NavigationEnum.ADD_TEACHERS_SCREEN}
          component={AddTeachersScreen}
        />
        <Stack.Screen
          name={NavigationEnum.ADD_BUSINESS_ACCOUNT_SCREEN}
          component={AddBusinessAccountScreen}
        />
        <Stack.Screen
          name={NavigationEnum.SAVE_BUSINESS_ACCOUNT_SCREEN}
          component={SaveBusinessAccountScreen}
        />
        <Stack.Screen
          name={NavigationEnum.FORGOT_PASSWORD_SEND_EMAIL}
          //@ts-ignore
          component={SendEmailScreen}
        />
        <Stack.Screen
          name={NavigationEnum.FORGOT_PASSWORD_SEND_PASSWORD}
          //@ts-ignore
          component={SetPasswordScreen}
        />
        <Stack.Screen
          name={NavigationEnum.PAYMENT_TRACKING_SET_UP}
          //@ts-ignore
          component={PaymentTrackingSetUp}
        />
        <Stack.Screen
          name={NavigationEnum.REGISTRATION_FINAL}
          component={FinalRegistrationScreen}
        />
        <Stack.Screen
          name={NavigationEnum.SHEDULE_DAY}
          component={ScheduleDayScreen}
        />
        <Stack.Screen
          name={NavigationEnum.SHEDULE_WEEK}
          component={SheduleWeekScreen}
        />
        <Stack.Screen
          name={NavigationEnum.SHEDULE_MONTH}
          component={ScheduleMonthScreen}
        />

        <Stack.Screen
          name={NavigationEnum.HOME_SCREEN}
          component={currentSchool
            ? SchoolTabNavigator
            : TutorTabNavigator
          }
        />

        <Stack.Screen
          name={NavigationEnum.CANCELLATION_SCREEN}
          component={CancellationScreen}
        />
        <Stack.Screen
          name={NavigationEnum.ADD_CLASS_SCREEN}
          component={AddClassScreen}
        />
        <Stack.Screen
          name={NavigationEnum.ADD_SCHOOL_CLASS_SCREEN}
          component={AddSchoolClassScreen}
          initialParams={{ isClear: true }}
        />
        <Stack.Screen
          name={NavigationEnum.SELECT_SCHOOL_CLASS_TEACHER}
          component={SelectClassTeacherScreen}
        />
        <Stack.Screen
          name={NavigationEnum.SCHOOL_CLASS_LOCATION_TEACHER}
          component={SchoolClassLocationScreen}
        />
        <Stack.Screen
          name={NavigationEnum.SELECT_DATE_SCREEN}
          component={SelectDateScreen}
        />
        <Stack.Screen
          name={NavigationEnum.SELECT_SCHOOL_DATE_SCREEN}
          component={SelectSchoolDateScreen}
        />
        <Stack.Screen
          name={NavigationEnum.DATE_RECURRENCE_SCREEN}
          component={DateRecurrenceScreen}
        />
        <Stack.Screen
          name={NavigationEnum.DATE_PREVIEW_SCREEN}
          component={DatePreviewScreen}
        />
        <Stack.Screen
          name={NavigationEnum.ADD_STUDENTS_SCREEN}
          component={AddStudentsScreen}
        />
        <Stack.Screen
          name={NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN}
          component={PrepaymentConfigurationScreen}
        />
        <Stack.Screen
          name={NavigationEnum.CLASS_SCREEN}
          component={ClassesScreen}
        />
        <Stack.Screen
          name={NavigationEnum.EDIT_CLASS_SCREEN}
          component={EditClassScreen}
        />
        <Stack.Screen
          name={NavigationEnum.CLASSES_PREVIEW_SCREEN}
          component={ClassesPreviewScreen}
        />
        <Stack.Screen
          name={NavigationEnum.CLASSES_EDIT_NAME_SCREEN}
          component={ClassesEditNameScreen}
        />
        <Stack.Screen
          name={NavigationEnum.CLASSES_EDIT_DATE_SCREEN}
          component={ClassesEditDateScreen}
        />
        <Stack.Screen
          name={NavigationEnum.CLASSES_EDIT_PREVIEW_SCREEN}
          component={ClassesEditPreviewScreen}
        />

        <Stack.Screen
          name={NavigationEnum.CLASSES_STUDENT_SCREEN}
          component={ClassesStudentScreen}
        />
        <Stack.Screen
          name={NavigationEnum.CHANGE_STUDENT_SCREEN}
          component={ChangeStudentScreen}
        />
        <Stack.Screen
          name={NavigationEnum.STUDENTS_SCREEN}
          component={StudentsScreen}
        />
        <Stack.Screen
          name={NavigationEnum.EDIT_STUDENTS_SCREEN}
          //@ts-ignore
          component={EditStudentScreen}
        />
        <Stack.Screen
          name={NavigationEnum.PREVIEW_STUDENTS_SCREEN}
          component={PreviewStudentScreen}
        />
        <Stack.Screen
          name={NavigationEnum.MORE_SCREEN}
          component={MoreScreen}
        />

      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name={NavigationEnum.RESULT_CLASS_MODAL}
          component={ResultClassModal}
          options={{
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationEnum.EDIT_DURATION_CLASS_MODAL}
          component={DurationSessionModal}
          options={{
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationEnum.SELECT_DURATION_CLASS_MODAL}
          component={SelectDurationSessionModal}
          options={{
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationEnum.EDIT_TIME_CLASS_MODAL}
          component={EditTimeSessionModal}
          options={{
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationEnum.MORE_OPTIONS_SCREEN}
          component={MoreOptionsScreen}
          initialParams={{ currentClass: null }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationEnum.UPDATE_CLASS_STUDENTS_SCREEN}
          component={UpdateClassStudentsScreen}
          initialParams={{ currentClass: null }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationEnum.EDIT_TEACHER}
          component={EditTeacherScreen}
          initialParams={{ currentClass: null }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationEnum.TEACHERS_CLASSES_SCREEN}
          component={TeacherClassesScreen}
          initialParams={{ currentClass: null }}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
});
