import { PaymentTrackingSetUp } from "../../../screens/PaymentTrackingSetUp";

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
  SELECT_DATE_SCREEN = 'navigation/SelectDateScreen',
  DATE_RECURRENCE_SCREEN = 'navigation/DateRecurrenceScreen',
  DATE_PREVIEW_SCREEN = 'navigation/DatePreviewScreen',
  ADD_STUDENTS_SCREEN = 'navigation/AddStudentsScreen',
  PREPAYMENT_CONFIGURATION_SCREEN = 'navigation/PrepaymentConfigurationScreen',
  //ADD SCHOOL (business account)
  ADD_NEW_TEACHER_SCREEN = 'navigation/AddNewTeacherScreen',
  ADD_TEACHERS_SCREEN = 'navigation/AddTeachersScreen',
  ADD_BUSINESS_ACCOUNT_SCREEN = 'navigation/AddBusinessAccountScreen',
  SAVE_BUSINESS_ACCOUNT_SCREEN = 'navigation/saveBusinessAccountScreen',
  //SCHOOL CLASS
  ADD_SCHOOL_CLASS_SCREEN = 'navigation/AddSchoolClassScreen',
  SELECT_SCHOOL_DATE_SCREEN = 'navigation/SelectSchoolDateScreen',
  SELECT_SCHOOL_CLASS_TEACHER = 'navigation/SelectClassTeacherScreen',
  SCHOOL_CLASS_LOCATION_TEACHER = 'navigation/SchoolClassLocationScreen',
  UPDATE_CLASS_STUDENTS_SCREEN = 'navigation/UpdateClassStudentsScreen',
  //SCHOOL TEACHERS
  EDIT_TEACHER = 'navigation/EDIT_TEACHER',
  TEACHERS_CLASSES_SCREEN = 'navigation/TEACHERS_CLASSES_SCREEN',
  //TABS
  HOME_SCREEN = 'navigation/HOME_SCREEN',
  STUDENTS_TAB = 'navigation/STUDENTS_TAB',
  SCHEDULE_TAB = 'navigation/SCHEDULE_TAB',
  TO_DO_TAB = 'navigation/TO_DO_TAB',
  CLASSES_TAB = 'navigation/CLASSES_TAB',
  TEACHERS_TAB = 'navigation/TEACHERS_TAB',
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
  MORE_OPTIONS_SCREEN = 'navigation/MORE_OPTIONS_SCREEN',
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
