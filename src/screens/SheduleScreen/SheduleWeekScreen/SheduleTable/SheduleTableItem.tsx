import React, { FC, memo, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CancellationModal } from '../../components/CancellationModal';
import styles from './styles';
import { IScheduleItem } from '../../../../common/types/schedule.types';

enum TypeSession {
  lesson,
  trial,
}

interface ISheduleTableItem { }
export const SheduleTableItem: FC<IScheduleItem> = memo(
  (item) => {
    const colorsTrial = ['#F3AF2C', '#E9600D'];
    const colorsLesson = ['#EAAFC8', '#654EA3'];

    const getColors = (typeSession: TypeSession) => {
      switch (typeSession) {
        case TypeSession.lesson:
          return colorsLesson;
        case TypeSession.trial:
          return colorsTrial;
      }
    };
    return (
      <CancellationModal data={item}>
        <View style={styles.containerItem}>
          {item.ClassName ? (
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
        </View>
      </CancellationModal>
    );

  },
);
