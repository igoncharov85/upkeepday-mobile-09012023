import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { ComponentType } from 'react'
import { NavigationEnum } from '../common/constants/navigation'

export type TypeRootStackParamList =  {
	[NavigationEnum.LOGIN]: undefined
	[NavigationEnum.SELECT_DATE_SCREEN]: undefined
	[NavigationEnum.DATE_RECURRENCE_SCREEN]: undefined
	[NavigationEnum.DATE_PREVIEW_SCREEN]: undefined
	[NavigationEnum.ADD_STUDENTS_SCREEN]: undefined
	[NavigationEnum.NEW_STUDENT_SCREEN]: undefined
	[NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN]: undefined
	[NavigationEnum.CLASS_SCREEN]: undefined
	[NavigationEnum.EDIT_CLASS_SCREEN]: undefined
	[NavigationEnum.CLASSES_PREVIEW_SCREEN]: undefined
	[NavigationEnum.CLASSES_EDIT_NAME_SCREEN]: undefined
	[NavigationEnum.CLASSES_EDIT_DATE_SCREEN]: undefined
	[NavigationEnum.CLASSES_EDIT_PREVIEW_SCREEN]: undefined
	[NavigationEnum.CLASSES_STUDENT_SCREEN]: undefined
	[NavigationEnum.CHANGE_STUDENT_SCREEN]: undefined
	[NavigationEnum.STUDENTS_SCREEN]: undefined
	[NavigationEnum.EDIT_STUDENTS_SCREEN]: undefined
	[NavigationEnum.STUDENT_PAYMENTS_SCREEN]: undefined
	[NavigationEnum.PAYMENTS_TABLE_SCREEN]: undefined
	[NavigationEnum.PAYMENT_STUDENT_TRACKING]: undefined
	[NavigationEnum.PREVIEW_STUDENTS_SCREEN]: undefined
	[NavigationEnum.MORE_SCREEN]: undefined
	[NavigationEnum.CANCELLATION_MODAL]: undefined
	[NavigationEnum.EDIT_DURATION_CLASS_MODAL]: undefined
	[NavigationEnum.EDIT_TIME_CLASS_MODAL]: undefined
	[NavigationEnum.PREVIEW_MODAL]: undefined
	[NavigationEnum.RESULT_CLASS_MODAL]: undefined
	[NavigationEnum.SELECT_DURATION_CLASS_MODAL]: undefined
	[NavigationEnum.REGISTRATION]: undefined
	[NavigationEnum.ADD_NEW_TEACHER_SCREEN]: undefined
	[NavigationEnum.ADD_BUSINESS_ACCOUNT_SCREEN]: undefined
	[NavigationEnum.FORGOT_PASSWORD_SEND_EMAIL]: undefined
	[NavigationEnum.FORGOT_PASSWORD_SEND_PASSWORD]: undefined
	[NavigationEnum.PAYMENT_TRACKING_SET_UP]: undefined
	[NavigationEnum.REGISTRATION_FINAL]: undefined
	[NavigationEnum.SHEDULE_DAY]: undefined
	[NavigationEnum.SHEDULE_WEEK]: undefined
	[NavigationEnum.SHEDULE_MONTH]: undefined
	[NavigationEnum.HOME_SCREEN]: undefined
	[NavigationEnum.CANCELLATION_SCREEN]: undefined
	[NavigationEnum.ADD_CLASS_SCREEN]: undefined
	[NavigationEnum.PAYMENT_TRACKING_SET_UP]: undefined
}
export interface RoutesType {
	name: keyof TypeRootStackParamList
	component: ComponentType
	option?: NativeStackNavigationOptions
}
