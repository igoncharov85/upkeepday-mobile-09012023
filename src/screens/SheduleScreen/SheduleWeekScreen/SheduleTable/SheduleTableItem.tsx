import React, { FC, memo, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CancellationModal } from '../../components/CancellationModal';
import styles from './styles';
import { IGeneratedScheduleEntries, IScheduleItem } from '../../../../common/types/schedule.types';

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
    const colorsTrial = ['#F3AF2C', '#E9600D'];
    const colorsLesson = ['#EAAFC8', '#654EA3'];

    return (
      <>
        <View style={styles.containerItem}>

          {lessonOnThisHour.length > 0 ? lessonOnThisHour.map((lesson) => {

            const lessonMinuteStart = Number(lesson.StartDateTime.split('T')[1].split(':')[1])
            return (
              <View style={{ height: `${lesson.Duration / 60 * 100}%` }}>
                <CancellationModal data={item}>
                  <TouchableOpacity style={{ position: 'relative', }} onPress={() => console.log('lesson', lesson)} >
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
                </CancellationModal>
              </View>
            )

          }) :
            <TouchableOpacity style={styles.containerItem} onPress={() => console.log(lessonOnThisHour)} />

          }
        </View>
      </>
    )
    return (
      <CancellationModal data={item}>
        <TouchableOpacity style={styles.containerItem} onPress={() => console.log(lessonOnThisHour)}>
          {item?.ClassName ? (
            <View
              style={{
                borderRadius: 4,
                flex: 1,
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
                  top: 0,
                  left: 0,
                  right: 0,
                  height: `100%`,
                }}>
                <Text style={styles.textItem}>{item.ClassName}</Text>
              </LinearGradient>
            </View>
          ) : null}
        </TouchableOpacity>
      </CancellationModal>
    );

  },
);
