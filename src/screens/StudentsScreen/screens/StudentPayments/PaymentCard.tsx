import React, {FC} from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import styles from './styles';
import { ISlot, IStudentByIdResponse } from '../../../../common/types/user';

interface IProps extends IStudentByIdResponse {
  onPress: () => void
}

export const formatTimeSlot = (timeSlot: ISlot) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const dayOfWeek = daysOfWeek[timeSlot.DayOfWeek];
  const startTime = new Date(`1970-01-01T${timeSlot.StartTime}Z`);
  const endTime = new Date(startTime.getTime() + timeSlot.Duration * 60000);

  const formattedStartTime = startTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const formattedEndTime = endTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return `${dayOfWeek}, ${formattedStartTime} - ${formattedEndTime}`;
}

export const PaymentCard: FC<IProps> = (card) => {
  
  return (
    <TouchableOpacity style={styles.card} onPress={() => {card.onPress()}}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{card.Name}</Text>
        <Text style={styles.title}>
          Balance: <Text style={{color: card.Balance >= 0 ? '#169861' : "#F00"}}>
            {card.Balance}
          </Text>
        </Text>
      </View>
      {
        card.Slots.map(item => {
          return (
            <Text style={styles.text} key={item.SlotUid}>{formatTimeSlot(item)}</Text>  
          )
        })
      }
      <Text style={styles.text}>Total classes held: {card.PastSessions}</Text>
      <Text style={styles.text}>Total classes attended: {card.Attended}</Text>
      <Text style={styles.text}>Scheduled classes: {card.Scheduled}</Text>
      <Text style={styles.text}>Payment type: {card.PaymentType}</Text>
    </TouchableOpacity>
  )
} 