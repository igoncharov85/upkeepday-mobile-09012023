import React, { memo } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { SessionItem } from '../SessionItem';
import styles from './styles';
import { IScheduleItem } from '../../../../common/types/schedule.types';
import { generateTimeData } from '../../../../services/utils/generateDate.util';
import { TimeLineItem } from '../../SheduleWeekScreen/SheduleTable';

enum LessonType {
  Lesson,
  Trial,
}

interface ISessionItemListProps {
  data: IScheduleItem[];
}

export const SessionItemList: React.FC<ISessionItemListProps> = memo(
  ({ data }) => {
    const formatDate = (dateString: string, formatStr: string) => {
      const date = new Date(dateString);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      const hourString = formattedHours.toString().replace(/^0+/, '');
      return `${hourString}:${formattedMinutes} ${ampm}`;
    };

    const sessionItems = data?.map((item, index) => {
      const startTime = new Date(item.StartDateTime);
      const endTime = new Date(startTime.getTime() + item.Duration * 60000);

      return {
        id: item.SlotUid,
        name: item.ClassName,
        //@ts-ignore
        timeStart: formatDate(item.StartDateTime, 'hh:mm a'),
        timeContinued: `${formatDate(
          startTime.toISOString(),
          'hh:mm a',
        )} - ${formatDate(endTime.toISOString(), 'hh:mm a')}`,
        type: LessonType.Lesson,
      };
    });

    const timeData = generateTimeData('00:00', '23:00');
    return (
      <>
        <ScrollView style={{ marginBottom: 40, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row' }}>

            <View>
              {timeData.map((item, index) => (
                <TimeLineItem key={index} time={item} />
              ))}
            </View>
            <View style={{ paddingLeft: 12 }}>

              {sessionItems?.map((item, index) => (
                <SessionItem
                  key={item.id}
                  name={item.name}
                  timeContinued={item.timeContinued}
                  timeStart={item.timeStart}
                  type={item.type}
                  id={item.id}
                  data={data[index]}
                />
              ))}

            </View>
          </View>
        </ScrollView>
        <View style={styles.line} />
      </>
    );
  },
);
