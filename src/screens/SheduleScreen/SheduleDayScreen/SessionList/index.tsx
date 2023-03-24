import React, {memo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SessionItem} from '../SessionItem';
import {format} from 'date-fns';
import styles from './styles';
import {dataOfMonth} from '../..';

enum typeLesson {
  lesson,
  trial,
}
export const getCurrentDayData = (data: any) => {
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const currentDayIndex = 1;
  return data[currentDayIndex];
};
interface Session {
  Duration: number;
  StartDateTime: string;
  className: string;
  type: string;
}
interface ISessionItemLIst {
  data: Session[]
}

const SessionItemList: React.FC<ISessionItemLIst> = memo(({data}) => {


  const formatDate = (dateString: string, formatStr: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const hourString = formattedHours.toString().replace(/^0+/, ''); // Remove leading zero
    return `${hourString}:${formattedMinutes} ${ampm}`;
  };

  const sessionItems = data.map((item, index) => {
    const startTime = new Date(item.StartDateTime);
    const endTime = new Date(startTime.getTime() + item.Duration * 60000);

    return {
      id: index.toString(),
      name: item.className,
      timeStart: formatDate(item.StartDateTime, 'hh:mm a'),
      timeСontinued: `${formatDate(
        startTime.toISOString(),
        'hh:mm a',
      )} - ${formatDate(endTime.toISOString(), 'hh:mm a')}`,
      type: item.type === 'lesson' ? typeLesson.lesson : typeLesson.trial,
    };
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.line} />
      {sessionItems.map(item => (
        <SessionItem
          key={item.id}
          name={item.name}
          timeСontinued={item.timeСontinued}
          timeStart={item.timeStart}
          type={item.type}
          id={item.id}
        />
      ))}
    </ScrollView>
  );
});

export default SessionItemList;
