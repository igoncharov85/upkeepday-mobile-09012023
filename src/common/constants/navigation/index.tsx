import {PaymentTrackingSetUp} from "../../../screens/PaymentTrackingSetUp";

export enum NavigationEnum {
  LOGIN = 'navigation/LOGIN',
  REGISTRATION = 'navigation/REGISTRATION',
  REGISTRATION_FINAL = 'navigation/REGISTRATION_FINAL',
  FORGOT_PASSWORD_SEND_EMAIL = 'navigation/FORGOT_PASSWORD_SEND_EMAIL',
  FORGOT_PASSWORD_SEND_PASSWORD = 'navigation/FORGOT_PASSWORD_SEND_PASSWORD',
  PAYMENT_TRACKING_SET_UP = 'navigation/PAYMENT_TRACKING_SET_UP',
  //SHEDULE
  SHEDULE_DAY = 'navigation/SHEDULE_DAY',
  SHEDULE_WEEK = 'navigation/SHEDULE_WEEK',
  SHEDULE_MONTH = 'navigation/SHEDULE_MONTH',
  //CANCELLATION
  CANCELLATION_SCREEN = 'navigation/CancellationScreen',
  CANCELLATION_MODAL = 'navigation/CancellationModalWrapper',
  //ADD CLASS
  ADD_CLASS_SCREEN = 'navigation/AddClassScreen',
  ADD_NEW_TEACHER_SCREEN = 'navigation/AddNewTeacherScreen',
  ADD_BUSINESS_ACCOUNT_SCREEN = 'navigation/AddBusinessAccountScreen',
  SELECT_DATE_SCREEN = 'navigation/SelectDateScreen',
  DATE_RECURRENCE_SCREEN = 'navigation/DateRecurrenceScreen',
  DATE_PREVIEW_SCREEN = 'navigation/DatePreviewScreen',
  ADD_STUDENTS_SCREEN = 'navigation/AddStudentsScreen',
  NEW_STUDENT_SCREEN = 'navigation/NewStudentScreen',
  PREPAYMENT_CONFIGURATION_SCREEN = 'navigation/PrepaymentConfigurationScreen',
  //TABS
  HOME_SCREEN = 'navigation/HOME_SCREEN',
  STUDENTS_TAB = 'navigation/STUDENTS_TAB',
  SCHEDULE_TAB = 'navigation/SCHEDULE_TAB',
  TO_DO_TAB = 'navigation/TO_DO_TAB',
  CLASSES_TAB = 'navigation/CLASSES_TAB',
  MORE_TAB = 'navigation/MORE_TAB',
  //CLASSES
  CLASS_SCREEN = 'navigation/CLASS_SCREEN',
  EDIT_CLASS_SCREEN = 'navigation/EDIT_CLASS_SCREEN',
  CLASSES_PREVIEW_SCREEN = 'navigation/CLASSES_PREVIEW_SCREEN',
  CLASSES_EDIT_NAME_SCREEN = 'navigation/CLASSES_EDIT_NAME_SCREEN',
  CLASSES_EDIT_DATE_SCREEN = 'navigation/CLASSES_EDIT_DATE_SCREEN',
  CLASSES_EDIT_PREVIEW_SCREEN = 'navigation/CLASSES_EDIT_PREVIEW_SCREEN',
  CLASSES_STUDENT_SCREEN = 'navigation/CLASSES_STUDENT_SCREEN',
  CHANGE_STUDENT_SCREEN = 'navigation/CHANGE_STUDENT_SCREEN',
  //STUDENTS
  STUDENTS_SCREEN = 'navigation/STUDENTS_SCREEN',
  EDIT_STUDENTS_SCREEN = 'navigation/EDIT_STUDENTS_SCREEN',
  PREVIEW_STUDENTS_SCREEN = 'navigation/PREVIEW_STUDENTS_SCREEN',
  //MORE
  MORE_SCREEN = 'navigation/MORE_SCREEN',
  //MODALS
  RESULT_CLASS_MODAL = 'navigation/RESULT_CLASS_MODAL',
  SELECT_DURATION_CLASS_MODAL = 'navigation/SELECT_DURATION_CLASS_MODAL',
  EDIT_DURATION_CLASS_MODAL = 'navigation/EDIT_DURATION_CLASS_MODAL',
  EDIT_TIME_CLASS_MODAL = 'navigation/EDIT_TIME_CLASS_MODAL'
}
