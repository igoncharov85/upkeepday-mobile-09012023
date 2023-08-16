import React, { FC, memo, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CancellationModal } from '../../components/CancellationModal';
import styles from './styles';
import { IGeneratedScheduleEntries, IScheduleItem } from '../../../../common/types/schedule.types';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../../common/constants/navigation';

enum TypeSession {
  lesson,
  trial,
}

interface ISheduleTableItem {
  currentDate: Date;
  lessonOnThisHour?: IGeneratedScheduleEntries[]
  item?: IScheduleItem
}
const mockItem = {
  SlotUid: '',
  StartDateTime: '',
  Duration: 0,
  ClassName: '',
  ScheduleEntryId: 0
}
export const SheduleTableItem: FC<ISheduleTableItem> = memo(
  ({ item = mockItem, lessonOnThisHour = [] }) => {
    const navigation = useNavigation()
    const colorsTrial = ['#F3AF2C', '#E9600D'];
    const colorsLesson = ['#EAAFC8', '#654EA3'];
    const navigateToCancellationModal = () => {
      // @ts-ignore
      navigation.navigate(NavigationEnum.CANCELLATION_MODAL, { item: item })
    }
    return (
      <>
        <View style={styles.containerItem}>

          {lessonOnThisHour.length > 0 ? lessonOnThisHour.map((lesson) => {

            const lessonMinuteStart = Number(lesson.StartDateTime.split('T')[1].split(':')[1])
            return (
              <View style={{ height: `${lesson.Duration / 60 * 100}%` }}>
                <TouchableOpacity onLongPress={navigateToCancellationModal} style={{ position: 'relative', }} >
                  {item?.ClassName ? (
                    <View
                      style={{
                        borderRadius: 4,
                        height: '100%',
                        position: 'relative',
                      }}>
                      <LinearGradient
                        colors={colorsLesson}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{
                          zIndex: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          borderRadius: 4,
                          top: `${lessonMinuteStart / 60 * 100}%`,
                          left: 0,
                          right: 0,
                          height: `100%`,
                        }}>
                        <Text style={styles.textItem}>{item.ClassName}</Text>
                      </LinearGradient>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            )

          }) :
            <TouchableOpacity onLongPress={navigateToCancellationModal} style={styles.containerItem} />

          }
        </View>
      </>
    )
  },
);
