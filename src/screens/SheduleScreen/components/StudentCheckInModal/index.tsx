import React, { FC, memo, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import CheckIcon from '../../../../../assets/svg/classes/CheckIcon';
import { CustomButton } from '../../../../components/UI/CustomButton';
import { IScheduleItem } from '../../../../common/types/schedule.types';
import { dispatch } from '../../../../store/store';
import { checkinsUserAction, fetchCheckinsUserAction } from '../../../../store/user/actions';
import { useAppSelector } from '../../../../store/hooks';
import { ECheckinsStatus, ICheckinUser } from '../../../../common/types/user';
import { useNavigation } from '@react-navigation/native';



interface AddSessionModalProps {
  visible: boolean;
  visibleHandler: () => void;
  onPress: () => void;
  data: any;
  hideOwnModal: () => void;
}
const getStatus = ({
  present,
  absent,
}: {
  present: boolean;
  absent: boolean;
}) => {
  if (present) {
    return ECheckinsStatus.Present;
  }
  if (absent) {
    return ECheckinsStatus.Absent;
  }
  return ECheckinsStatus.Empty;
}

export const StudentCheckInModal: FC<AddSessionModalProps> = memo(
  ({ visible, visibleHandler, data, hideOwnModal }) => {
    const navigation = useNavigation();
    const sessionId = data.ScheduleEntryId;

    const name = data.ClassName;
    const { checkins } = useAppSelector((state) => state.user);
    const [checkinsStudent, setCheckinsStudent] = useState([]);
    const [resultCheckinsStudent, setResultCheckinsStudent] = useState([]);
    const [allIn, setAllIn] = useState(false);


    useEffect(() => {
      sessionId && dispatch(fetchCheckinsUserAction(sessionId));
    }, []);

    const onSave = () => {

      dispatch(checkinsUserAction(
        {
          sessionId: sessionId,
          chekins: resultCheckinsStudent,
        }));
      visibleHandler();
      hideOwnModal()
    }


    const onHandleCheckStudent = ({ StudentId, CheckInStatus }: {
      StudentId: number;
      CheckInStatus: ECheckinsStatus;
    }) => {
      const newCheckinsStudent: any = [...resultCheckinsStudent];
      const index = newCheckinsStudent.findIndex((item: ICheckinUser) => item.StudentId === StudentId);
      newCheckinsStudent[index] = { StudentId, CheckInStatus };
      setResultCheckinsStudent(newCheckinsStudent);
    }
    const onHandleCheckAll = () => {
      setAllIn(!allIn);
      const newData = checkins.map((item) => { return { StudentId: item.StudentId, CheckInStatus: getStatus({ present: !allIn, absent: false }) } });
      setResultCheckinsStudent(newData as []);
      setCheckinsStudent(newData as []);
    }
    const skip = () => {
      visibleHandler();
      hideOwnModal()
    }

    useEffect(() => {
      const newData = checkins.map((item) => { return { StudentId: item.StudentId, CheckInStatus: item.CheckInStatus } });
      setResultCheckinsStudent(newData as []);
      setCheckinsStudent(newData as []);

    }, [checkins]);

    return visible ? (
      <TouchableOpacity style={styles.modalWrapper} activeOpacity={1}>
        <LinearGradient
          colors={['rgba(178, 178, 178, 0.5)', 'rgba(23, 25, 48, 0.6)']}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 0.0 }}
          angle={223.05}
          useAngle={true}
          style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.content}>
              {checkins.length ? (<>
                <Text style={[styles.title, { marginTop: 64 }]}>{name}</Text>
                <Text style={[styles.title, { marginBottom: 32 }]}>Student Check-in</Text>
                <View style={styles.allContainer}>
                  <CheckButton active={allIn} icon onPress={onHandleCheckAll} />
                  <Text style={styles.text}>ALL IN</Text>
                </View>
                <Line />
                {checkins.map((item, index) => {
                  return (
                    <CheckItem key={item.StudentId} student={item} status={checkinsStudent[index]} onHandleCheckStudent={onHandleCheckStudent} />
                  )
                })}
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', flex: 1, alignItems: 'flex-end', marginBottom: 48 }}>
                  <CustomButton text={'Skip'} style={{ width: 96 }} onPress={skip} />
                  <CustomButton text={'Confirm'} style={{ width: 96 }} onPress={onSave} />
                </View></>) : (<View style={{ justifyContent: 'space-between', alignItems: 'center', height: '100%', flex: 1, width: '100%', margin: 20 }}>
                  <View />
                  <Text style={styles.title}>No students in this class</Text>
                  <CustomButton text={'Ok'} style={{ width: '90%' }} onPress={visibleHandler} />
                </View>)}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    ) : null;
  },
);


const CheckButton = ({ active, icon, onPress }: { active: boolean; icon?: boolean; onPress?: any }) => {

  const handlePress = () => {
    onPress(icon);
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <CheckIcon active={icon} />
      {!active && <View style={styles.checkBtnActive} />}
    </TouchableOpacity>
  )

};
const CheckItem = ({ student, status, onHandleCheckStudent }: { student: ICheckinUser, status: any, onHandleCheckStudent: any }) => {
  const [checkStatus, setCheckStatus] = useState({
    present: false,
    absent: false,
  });

  useEffect(() => {
    if (status.CheckInStatus === ECheckinsStatus.Present) {
      setCheckStatus({ present: true, absent: false });
    } else if (status.CheckInStatus === ECheckinsStatus.Absent) {
      setCheckStatus({ present: false, absent: true });
    } else {
      setCheckStatus({ present: false, absent: false });
    }

  }, [status]);

  const handlePress = (type: boolean) => {
    if (type) {
      setCheckStatus((state) => {

        return { present: !state.present, absent: false }
      });
    } else {
      setCheckStatus((state) => {
        return { present: false, absent: !state.absent }
      });
    }
  };


  useEffect(() => {
    onHandleCheckStudent({ StudentId: student.StudentId, CheckInStatus: getStatus(checkStatus) });
  }, [checkStatus]);

  const getName = () => {
    let fullName = student.FirstName + ' ' + student.LastName;
    if (fullName.length > 15) {
      fullName = fullName.slice(0, 15).concat("...");
    }
    return fullName;
  }
  return (
    <>
      <View style={styles.checkItem}>
        <View>
          <Text style={styles.text}>{getName()}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CheckButton onPress={handlePress} active={checkStatus.present} icon={true} />
          <View style={{ width: 20 }} />
          <CheckButton onPress={handlePress} active={checkStatus.absent} icon={false} />
          <View style={{ width: 25 }} />
        </View>
      </View>
      <Line />
    </>
  )
}
const Line = () => (
  <View style={styles.line} />
);

