import {ComponentType} from 'react';
import {NavigationEnum} from '../common/constants/navigation';

export type TypeRootStackParamList = {
  [NavigationEnum.LOGIN]: undefined;
  [NavigationEnum.SELECT_DATE_SCREEN]: undefined;
  [NavigationEnum.DATE_RECURRENCE_SCREEN]: {
    endScheduleType: string;
    finishDate: string;
    numberOf: number;
  };
  [NavigationEnum.DATE_PREVIEW_SCREEN]: undefined;
  [NavigationEnum.ADD_STUDENTS_SCREEN]: undefined;
  [NavigationEnum.NEW_STUDENT_SCREEN]: undefined;
  [NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN]: undefined;
  [NavigationEnum.CLASS_SCREEN]: undefined;
  [NavigationEnum.EDIT_CLASS_SCREEN]: {
    item: any;
  };
  [NavigationEnum.CLASSES_PREVIEW_SCREEN]: {
    item: any;
  };
  [NavigationEnum.CLASSES_EDIT_NAME_SCREEN]: {
    item: any;
  };
  [NavigationEnum.CLASSES_EDIT_DATE_SCREEN]: undefined;
  [NavigationEnum.CLASSES_EDIT_PREVIEW_SCREEN]: {
    item: any;
    sendString: any;
  };
  [NavigationEnum.CLASSES_STUDENT_SCREEN]: {
    item: any;
  };
  [NavigationEnum.CHANGE_STUDENT_SCREEN]: {
    item: any;
    currentStudent: any;
  };
  [NavigationEnum.STUDENTS_SCREEN]: undefined;
  [NavigationEnum.EDIT_STUDENTS_SCREEN]: {
    item: any;
  };
  [NavigationEnum.STUDENT_PAYMENTS_SCREEN]: {
    item: any;
  };
  [NavigationEnum.PAYMENTS_TABLE_SCREEN]: {
    user: any;
    classData: any;
  };
  [NavigationEnum.PAYMENT_STUDENT_TRACKING]: {
    finalData: any;
  };
  [NavigationEnum.PREVIEW_STUDENTS_SCREEN]: {
    item: any;
  };
  [NavigationEnum.MORE_SCREEN]: undefined;
  [NavigationEnum.CANCELLATION_MODAL]: {
    item: any;
  };
  [NavigationEnum.EDIT_DURATION_CLASS_MODAL]: {
    addDuration: (time: any) => void;
    duration: number;
  };
  [NavigationEnum.EDIT_TIME_CLASS_MODAL]: {
    addDuration: (time: any) => void;
    lesson: any;
    newTime?: Date;
  };
  [NavigationEnum.PREVIEW_MODAL]: {
    completeAction: () => void;
    deleteItem: boolean;
    SessionId: string;
    newTime?: Date;
  };
  [NavigationEnum.RESULT_CLASS_MODAL]: {
    item: any;
    actionBtn: any;
    nameAction: string;
  };
  [NavigationEnum.SELECT_DURATION_CLASS_MODAL]: {
    onSetDuration?: (duration: number) => void;
    onSetStartTime?: (data: any) => void;
    timeDuration?: number;
    startDateTime: string;
    onCreateLesson: (lesson: any) => void;
    dayOfWeek?: number;
    maxDuration?: any;
  };
  [NavigationEnum.REGISTRATION]: undefined;
  [NavigationEnum.ADD_NEW_TEACHER_SCREEN]: undefined;
  [NavigationEnum.ADD_BUSINESS_ACCOUNT_SCREEN]: undefined;
  [NavigationEnum.FORGOT_PASSWORD_SEND_EMAIL]: undefined;
  [NavigationEnum.FORGOT_PASSWORD_SEND_PASSWORD]: {
    uuid: string;
  };
  [NavigationEnum.PAYMENT_TRACKING_SET_UP]: {
    makeupRequired: number;
    trackPrepayment: number;
  };
  [NavigationEnum.REGISTRATION_FINAL]: {
    uuid: string;
  };
  [NavigationEnum.SHEDULE_DAY]: undefined;
  [NavigationEnum.SHEDULE_WEEK]: undefined;
  [NavigationEnum.SHEDULE_MONTH]: undefined;
  [NavigationEnum.HOME_SCREEN]: undefined;
  [NavigationEnum.CANCELLATION_SCREEN]: {
    itemData: any;
  };
  [NavigationEnum.ADD_CLASS_SCREEN]: undefined;
  [NavigationEnum.CLASSES_TAB]: undefined;
  [NavigationEnum.STUDENTS_TAB]: undefined;
  [NavigationEnum.MORE_TAB]: undefined;
  [NavigationEnum.TO_DO_TAB]: undefined;
  [NavigationEnum.SCHEDULE_TAB]: undefined;
};
export interface RoutesType<T> {
  name: keyof TypeRootStackParamList;
  component: ComponentType;
  options?: T;
}
