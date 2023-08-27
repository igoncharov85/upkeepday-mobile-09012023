import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import Classes from '../../assets/svg/schedule/Classes';
import More from '../../assets/svg/schedule/More';
import Schedule from '../../assets/svg/schedule/Schedule';
import Students from '../../assets/svg/schedule/Students';
import Todo from '../../assets/svg/schedule/Todo';
import { NavigationEnum } from '../common/constants/navigation';
import { CancellationModal } from '../components/Modals/CancellationModal';
import DurationSessionModal from '../components/Modals/DurationSessionModal';
import EditTimeSessionModal from '../components/Modals/EditTimeSessionModal';
import PreviewModal from '../components/Modals/PreviewModal';
import ResultClassModal from '../components/Modals/ResultClassModal';
import SelectDurationSessionModal from '../components/Modals/SelectDurationSessionModal';
import { TabNavigator } from '../modules/navigation/TabNavigator';
import { AddBusinessAccountScreen } from '../screens/AddBusinessAccountScreen';
import { AddClassScreen } from '../screens/AddClassScreen';
import { AddNewTeacherScreen } from '../screens/AddNewTeacher';
import { AddStudentsScreen } from '../screens/AddStudentsScreen';
import { CancellationScreen } from '../screens/CancellationScreen';
import { ClassesScreen } from '../screens/ClassesScreen';
import ClassesEditDateScreen from '../screens/ClassesScreen/screens/ClassesEditDateScreen';
import ClassesEditPreviewScreen from '../screens/ClassesScreen/screens/ClassesEditDateScreen/ClassesEditPreviewScreen';
import ClassesEditNameScreen from '../screens/ClassesScreen/screens/ClassesEditNameScreen';
import ClassesPreviewScreen from '../screens/ClassesScreen/screens/ClassesPreviewScreen';
import ClassesStudentScreen from '../screens/ClassesScreen/screens/ClassesStudentScreen';
import ChangeStudentScreen from '../screens/ClassesScreen/screens/ClassesStudentScreen/ChangeStudentScreen';
import { DatePreviewScreen } from '../screens/DatePreviewScreen';
import { DateRecurrenceScreen } from '../screens/DateRecurrenceScreen';
import { EditClassScreen } from '../screens/EditClassScreen';
import { SendEmailScreen } from '../screens/ForgotPassScreen/SendEmailScreen';
import { SetPasswordScreen } from '../screens/ForgotPassScreen/SetPasswordScreen';
import { LoginScreen } from '../screens/LoginScreen';
import MoreScreen from '../screens/MoreScreen';
import { NewStudentScreen } from '../screens/NewStudentScreen';
import { PaymentTrackingSetUp } from '../screens/PaymentTrackingSetUp';
import { PrepaymentConfigurationScreen } from '../screens/PrepaymentConfigurationScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { FinalRegistrationScreen } from '../screens/RegistrationScreen/FinalRegistrtionScreen';
import { SelectDateScreen } from '../screens/SelectDateScreen';
import { ScheduleScreen } from '../screens/SheduleScreen';
import { ScheduleMonthScreen } from '../screens/SheduleScreen/ScheduleMonthScreen';
import { ScheduleDayScreen } from '../screens/SheduleScreen/SheduleDayScreen';
import { SheduleWeekScreen } from '../screens/SheduleScreen/SheduleWeekScreen';
import StudentsScreen from '../screens/StudentsScreen';
import { EditStudentScreen } from '../screens/StudentsScreen/screens/EditStudentScreen';
import { PaymentsTable } from '../screens/StudentsScreen/screens/PaymentsTable';
import { PaymentTracking } from '../screens/StudentsScreen/screens/PaymentTracking';
import PreviewStudentScreen from '../screens/StudentsScreen/screens/PreviewStudentScreen';
import { StudentPayments } from '../screens/StudentsScreen/screens/StudentPayments';
import { RoutesType } from './navigation.types';
import { ConfirmCancellationScreen } from '../screens/ConfirmCancellationScreen';
import LocationClassModal from '../components/Modals/LocationClassModal';

export const routes: RoutesType<NativeStackNavigationOptions>[] = [
  {
    name: NavigationEnum.REGISTRATION,
    component: RegistrationScreen,
  },
  {
    name: NavigationEnum.ADD_NEW_TEACHER_SCREEN,
    component: AddNewTeacherScreen,
  },
  {
    name: NavigationEnum.ADD_BUSINESS_ACCOUNT_SCREEN,
    component: AddBusinessAccountScreen,
  },
  {
    name: NavigationEnum.FORGOT_PASSWORD_SEND_EMAIL,
    component: SendEmailScreen,
  },
  {
    name: NavigationEnum.FORGOT_PASSWORD_SEND_PASSWORD,
    component: SetPasswordScreen,
  },
  {
    name: NavigationEnum.PAYMENT_TRACKING_SET_UP,
    component: PaymentTrackingSetUp,
  },
  {
    name: NavigationEnum.REGISTRATION_FINAL,
    component: FinalRegistrationScreen,
  },
  {
    name: NavigationEnum.SHEDULE_DAY,
    component: ScheduleDayScreen,
  },
  {
    name: NavigationEnum.SHEDULE_WEEK,
    component: SheduleWeekScreen,
  },
  {
    name: NavigationEnum.SHEDULE_MONTH,
    component: ScheduleMonthScreen,
  },
  {
    name: NavigationEnum.HOME_SCREEN,
    component: TabNavigator,
  },
  {
    name: NavigationEnum.CANCELLATION_SCREEN,
    component: CancellationScreen,
  },
  {
    name: NavigationEnum.ADD_CLASS_SCREEN,
    component: AddClassScreen,
  },
  {
    name: NavigationEnum.SELECT_DATE_SCREEN,
    component: SelectDateScreen,
  },
  {
    name: NavigationEnum.DATE_RECURRENCE_SCREEN,
    component: DateRecurrenceScreen,
  },
  {
    name: NavigationEnum.DATE_PREVIEW_SCREEN,
    component: DatePreviewScreen,
  },
  {
    name: NavigationEnum.ADD_STUDENTS_SCREEN,
    component: AddStudentsScreen,
  },
  {
    name: NavigationEnum.NEW_STUDENT_SCREEN,
    component: NewStudentScreen,
  },
  {
    name: NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN,
    component: PrepaymentConfigurationScreen,
  },
  {
    name: NavigationEnum.CLASS_SCREEN,
    component: ClassesScreen,
  },
  {
    name: NavigationEnum.EDIT_CLASS_SCREEN,
    component: EditClassScreen,
  },
  {
    name: NavigationEnum.CLASSES_PREVIEW_SCREEN,
    component: ClassesPreviewScreen,
  },
  {
    name: NavigationEnum.CLASSES_EDIT_NAME_SCREEN,
    component: ClassesEditNameScreen,
  },
  {
    name: NavigationEnum.CLASSES_EDIT_DATE_SCREEN,
    component: ClassesEditDateScreen,
  },
  {
    name: NavigationEnum.CLASSES_EDIT_PREVIEW_SCREEN,
    component: ClassesEditPreviewScreen,
  },
  {
    name: NavigationEnum.CLASSES_STUDENT_SCREEN,
    component: ClassesStudentScreen,
  },
  {
    name: NavigationEnum.CHANGE_STUDENT_SCREEN,
    component: ChangeStudentScreen,
  },
  {
    name: NavigationEnum.STUDENTS_SCREEN,
    component: StudentsScreen,
  },
  {
    name: NavigationEnum.EDIT_STUDENTS_SCREEN,
    component: EditStudentScreen,
  },
  {
    name: NavigationEnum.STUDENT_PAYMENTS_SCREEN,
    component: StudentPayments,
  },
  {
    name: NavigationEnum.PAYMENTS_TABLE_SCREEN,
    component: PaymentsTable,
  },
  {
    name: NavigationEnum.PAYMENT_STUDENT_TRACKING,
    component: PaymentTracking,
  },
  {
    name: NavigationEnum.PREVIEW_STUDENTS_SCREEN,
    component: PreviewStudentScreen,
  },
  {
    name: NavigationEnum.MORE_SCREEN,
    component: MoreScreen,
  },
  {
    name: NavigationEnum.CONFIRM_CANCELLATION_SCREEN,
    component: ConfirmCancellationScreen,
  },
  {
    name: NavigationEnum.CANCELLATION_MODAL,
    component: CancellationModal,
    options: {
      presentation: 'transparentModal',
      headerShown: false,
    },
  },
  {
    name: NavigationEnum.EDIT_DURATION_CLASS_MODAL,
    component: DurationSessionModal,
    options: {
      presentation: 'transparentModal',
      headerShown: false,
    },
  },
  {
    name: NavigationEnum.EDIT_TIME_CLASS_MODAL,
    component: EditTimeSessionModal,
    options: {
      presentation: 'transparentModal',
      headerShown: false,
    },
  },
  {
    name: NavigationEnum.PREVIEW_MODAL,
    component: PreviewModal,
    options: {
      presentation: 'transparentModal',
      headerShown: false,
    },
  },
  {
    name: NavigationEnum.RESULT_CLASS_MODAL,
    component: ResultClassModal,
    options: {
      presentation: 'transparentModal',
      headerShown: false,
    },
  },
  {
    name: NavigationEnum.SELECT_DURATION_CLASS_MODAL,
    component: SelectDurationSessionModal,
    options: {
      presentation: 'transparentModal',
      headerShown: false,
    },
  },
  {
    name: NavigationEnum.LOCATION_CLASS_MODAL,
    component: LocationClassModal,
    options: {
      presentation: 'transparentModal',
      headerShown: false,
    },
  },
  {
    name: NavigationEnum.LOGIN,
    component: LoginScreen,
  },
];

export const tabRoutes: RoutesType<BottomTabNavigationOptions>[] = [
  {
    name: NavigationEnum.SCHEDULE_TAB,
    component: ScheduleScreen,
    options: {
      title: 'Schedule',
      tabBarLabel: 'Schedule',
      tabBarIcon: ({ color, size }) => (
        <Schedule name="calendar" size={size} color={color} />
      ),
    },
  },
  {
    name: NavigationEnum.TO_DO_TAB,
    component: ScheduleScreen,
    options: {
      title: 'To Do',
      tabBarLabel: 'To Do',
      tabBarIcon: ({ color, size }) => (
        <Todo name="calendar" size={size} color={color} />
      ),
    },
  },
  {
    name: NavigationEnum.CLASSES_TAB,
    component: ClassesScreen,
    options: {
      title: 'Classes',
      tabBarLabel: 'Classes',
      tabBarIcon: ({ color, size }) => (
        <Classes name="calendar" size={size} color={color} />
      ),
    },
  },
  {
    name: NavigationEnum.STUDENTS_TAB,
    component: StudentsScreen,
    options: {
      title: 'Students',
      tabBarLabel: 'Students',
      tabBarIcon: ({ color, size }) => (
        <Students name="calendar" size={size} color={color} />
      ),
    },
  },
  {
    name: NavigationEnum.MORE_TAB,
    component: MoreScreen,
    options: {
      title: 'More',
      tabBarLabel: 'More',
      tabBarIcon: ({ color, size }) => (
        <More name="calendar" size={size} color={color} />
      ),
    },
  },
];
