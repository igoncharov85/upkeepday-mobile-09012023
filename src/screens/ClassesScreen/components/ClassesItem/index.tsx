import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DeleteIcon from '../../../../../assets/svg/classes/DeleteIcon';
import DocumentIcon from '../../../../../assets/svg/classes/DocumentIcon';
import EditIcon from '../../../../../assets/svg/classes/EditIcon';
import MailIcon from '../../../../../assets/svg/classes/MailIcon';
import PaymentIcon from '../../../../../assets/svg/classes/PaymentIcon';
import ScheduledIcon from '../../../../../assets/svg/classes/ScheduledIcon';
import { NavigationEnum } from '../../../../common/constants/navigation';
import {
  EClassesStatus,
  IClassesResponse,
} from '../../../../common/types/classes.types';
import { useTypedNavigation } from '../../../../hook/useTypedNavigation';
import { formatDateForPeriod } from '../../../../services/utils/fullDateToValue.util';
import {
  deleteClassesAction,
  fetchClassesSchedule,
} from '../../../../store/classes/actions';
import { dispatch } from '../../../../store/store';

import styles from './styles';

interface IClassesItem {
  item: IClassesResponse;
}

const ClassesItem: React.FC<IClassesItem> = ({ item }) => {
  const { navigate } = useTypedNavigation();

  const navigateToEditLesson = () => {
    navigate(NavigationEnum.EDIT_CLASS_SCREEN, { item });
  };

  const navigateToLessonView = () => {
    navigate(NavigationEnum.CLASSES_PREVIEW_SCREEN, { item });
  };

  const handleDelete = () => {
    navigate(NavigationEnum.RESULT_CLASS_MODAL, {
      item: item,
      actionBtn: () => {
        dispatch(deleteClassesAction(item.ClassId));
      },
      nameAction: 'Delete  Permanently',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.Name}</Text>
      <View style={[styles.part, styles.partTop]}>
        <View>
          <Text style={styles.text}>
            {formatDateForPeriod(item.StartDate)} -{' '}
            {formatDateForPeriod(item.EndDate)}
          </Text>
          <View style={styles.payment}>
            <View style={styles.paymentItem}>
              <PaymentIcon active={item.TrackPrepayment} />
            </View>
            <Text style={styles.underlineText}>Payment Tracking</Text>
          </View>
          <Text style={styles.text}>
            Total sessions held: {item.TotalClassesHeld}
          </Text>
        </View>
        <View>
          <Text style={[styles.text, styles.textRight]}>
            {item.Location?.Address || 'Location Address'}
          </Text>
          <Text style={[styles.underlineText, styles.textRight]}>
            {item.Students?.length} students
          </Text>
          <Text style={[styles.text, styles.textRight]}>
            Scheduled sessions: {item.ScheduledClasses}
          </Text>
        </View>
      </View>

      <View style={styles.part}>
        <View style={styles.link}>
          {item.Status?.toLocaleLowerCase() === EClassesStatus.scheduled ? (
            <>
              <TouchableOpacity
                style={styles.linkItem}
                onPress={navigateToLessonView}>
                <ScheduledIcon />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkItem}
                onPress={navigateToEditLesson}>
                <EditIcon />
              </TouchableOpacity>

              {/*<TouchableOpacity onPress={() => { }} style={styles.linkItem}>*/}
              {/*  <MailIcon />*/}
              {/*</TouchableOpacity>*/}

              {/*<TouchableOpacity onPress={() => { }} style={styles.linkItem}>*/}
              {/*  <DocumentIcon />*/}
              {/*</TouchableOpacity>*/}
            </>
          ) : (
            <TouchableOpacity style={styles.linkItem} onPress={handleDelete}>
              <DeleteIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ClassesItem;
