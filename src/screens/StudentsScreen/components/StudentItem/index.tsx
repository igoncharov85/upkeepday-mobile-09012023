import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import BankCardIcon from '../../../../../assets/svg/classes/BankCardIcon';
import CheckIcon from '../../../../../assets/svg/classes/CheckIcon';

import EditIcon from '../../../../../assets/svg/classes/EditIcon';
import MailIcon from '../../../../../assets/svg/students/MailIcon';
import OrangeCrossIcon from '../../../../../assets/svg/students/OrangeCrossIcon';
import PhoneIcon from '../../../../../assets/svg/students/PhoneIcon';
import {NavigationEnum} from '../../../../common/constants/navigation';
import {IStudentResponse} from '../../../../common/types/user';
import {useTypedNavigation} from '../../../../hook/useTypedNavigation';
import {dispatch} from '../../../../store/store';
import {
  deleteStudentAction,
  updateStudentStatus,
} from '../../../../store/user/actions';

import styles from './styles';

interface IStudentsItem {
  item: IStudentResponse | any;
}

export enum EClassesStatus {
  scheduled = 'Scheduled',
  archived = 'Archived',
  nonScheduled = 'NonScheduled',
}

const StudentsItem: React.FC<IStudentsItem> = ({item}) => {
  const {navigate} = useTypedNavigation();

  const studentStatus = item.Status;
  const handleEdit = () => {
    navigate(NavigationEnum.EDIT_STUDENTS_SCREEN, {item});
  };

  const handlePayment = () => {
    navigate(NavigationEnum.STUDENT_PAYMENTS_SCREEN, {item});
  };

  const handleInfo = () => {
    navigate(NavigationEnum.PREVIEW_STUDENTS_SCREEN, {item});
  };
  const onArchived = () => {
    navigate(NavigationEnum.RESULT_CLASS_MODAL, {
      item: item,
      actionBtn: () => {
        dispatch(
          updateStudentStatus({status: 'Archived', StudentId: item.StudentId}),
        );
        navigate(NavigationEnum.STUDENTS_TAB);
      },
      nameAction: 'Archive Student',
    });
  };
  const handleDelete = () => {
    navigate(NavigationEnum.RESULT_CLASS_MODAL, {
      item: item,
      actionBtn: () => {
        dispatch(deleteStudentAction({StudentId: item.StudentId}));
        navigate(NavigationEnum.STUDENTS_TAB);
      },
      nameAction: 'Delete  Permanently',
    });
  };
  return (
    <View style={styles.container}>
      <View style={[styles.part]}>
        <Text style={styles.title}>
          {item.FirstName} {item.LastName}
        </Text>
      </View>
      <View style={[styles.part, styles.partTop]}>
        <View>
          <View style={styles.payment}>
            <View style={styles.paymentItem}>
              <PhoneIcon />
            </View>
            <Text style={styles.text}>
              {
                //@ts-ignore
                item.Phone
              }
            </Text>
          </View>
          <View style={styles.payment}>
            <View style={styles.paymentItem}>
              <MailIcon />
            </View>
            <Text style={styles.text}>{item.Email}</Text>
          </View>
          <Text style={styles.text}>
            <Text style={styles.title}>Notes: </Text>
            {item.Notes}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleInfo}>
            <Text style={[styles.underlineText, styles.textRight]}>
              Enrolled Classes: {item.EnrolledClasses.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePayment}>
            <Text style={[styles.underlineText, styles.textRight]}>
              Total Balance:{' '}
              <Text style={{color: item.Balance >= 0 ? '#169861' : '#F00'}}>
                {item.Balance}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.part}>
        <View style={styles.link}>
          {studentStatus === EClassesStatus.scheduled && (
            <>
              <TouchableOpacity style={styles.linkItem} onPress={handleEdit}>
                <EditIcon />
              </TouchableOpacity>
            </>
          )}
          {studentStatus === EClassesStatus.nonScheduled && (
            <>
              <TouchableOpacity style={styles.linkItem} onPress={handleEdit}>
                <EditIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkItem} onPress={onArchived}>
                <OrangeCrossIcon />
              </TouchableOpacity>
            </>
          )}
          {studentStatus === EClassesStatus.archived && (
            <TouchableOpacity style={styles.linkItem} onPress={handleDelete}>
              <CheckIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.buttonIcon]} onPress={handlePayment}>
            <BankCardIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StudentsItem;
