import React, {FC, memo, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

enum TypeSession {
  lesson,
  trial,
}
enum TimeDuration {
  HalfHour = 0.5,
  ThreeQuarterHour = 0.75,
  OneHour = 1,
  OneAndAHalfHours = 1.5,
}
interface ISheduleTableItem {
  timeDuration?: TimeDuration;
  typeSession?: TypeSession | [TypeSession, TypeSession];
  title?: string | [string, string];
}
export const SheduleTableItem: FC<ISheduleTableItem> = memo(
  ({
    timeDuration = TimeDuration.HalfHour,
    typeSession = TypeSession.lesson,
    title = '',
  }) => {
    const dualModule = Array.isArray(title) && Array.isArray(typeSession);
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
    return !dualModule ? (
      <View style={styles.containerItem}>
        {title ? (
          <View
            style={{
              borderRadius: 4,
              flex: 1,
              position: 'relative',
            }}>
            <LinearGradient
              colors={getColors(
                Array.isArray(typeSession) ? typeSession[0] : typeSession,
              )}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={{
                zIndex: 10,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                borderRadius: 4,
                top: 0,
                left: 0,
                right: 0,
                height: `${100 * timeDuration}%`,
              }}>
              <Text style={styles.textItem}>{title}</Text>
            </LinearGradient>
          </View>
        ) : null}
      </View>
    ) : (
      <View style={styles.containerItem}>
        {title ? (
          <View
            style={{
              borderRadius: 4,
              flex: 1,
              position: 'relative',

              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
            }}>
            <LinearGradient
              colors={getColors(typeSession[0])}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={{
                zIndex: 10,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                top: 0,
                left: 0,
                right: 0,
                height: `${100 * TimeDuration.HalfHour}%`,
              }}>
              <Text style={styles.textItem}>{title[0]}</Text>
            </LinearGradient>

            {/* second purt */}
            <LinearGradient
              colors={getColors(typeSession[1])?.reverse()}
              start={{x: 0.5, y: 1}}
              end={{x: 0.5, y: 0}}
              style={{
                zIndex: 10,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                top: '50%',
                left: 0,
                right: 0,
                height: `${100 * TimeDuration.HalfHour}%`,
              }}>
              <Text style={styles.textItem}>{title[1]}</Text>
            </LinearGradient>
            <View
              style={{
                width: '80%',
                backgroundColor: '#fff',
                height: 3,
                borderRadius: 4,
              }}></View>
          </View>
        ) : null}
      </View>
    );
  },
);
