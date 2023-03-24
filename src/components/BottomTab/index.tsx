import React, {FC, memo, useEffect} from 'react';
import {Text, View} from 'react-native';
import Classes from '../../../assets/svg/schedule/Classes';
import More from '../../../assets/svg/schedule/More';
import Schedule from '../../../assets/svg/schedule/Schedule';
import Students from '../../../assets/svg/schedule/Students';
import Todo from '../../../assets/svg/schedule/Todo';
import {INavigationBase} from '../../common/types/component.styles';
import {CustomButton} from '../../components/UI/CustomButton';
import NavigationActions from '../../services/navigation-service';
import {logoutAction} from '../../store/auth/actions';
import {dispatch} from '../../store/store';
import styles from './styles';

interface IBottomTab {}

export const BottomTab: FC<IBottomTab> = memo(({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Schedule color={'#171930'} />
        <Text style={styles.title}>Schedule</Text>
      </View>
      <View style={styles.item}>
        <Todo color={'#BAC2CB'} />
        <Text style={styles.title}>To Do </Text>
      </View>
      <View style={styles.item}>
        <Classes color={'#BAC2CB'} />
        <Text style={styles.title}>Classes</Text>
      </View>
      <View style={styles.item}>
        <Students color={'#BAC2CB'} />
        <Text style={styles.title}>Students</Text>
      </View>
      <View style={styles.item}>
        <More color={'#BAC2CB'} />
        <Text style={styles.title}>More</Text>
      </View>
    </View>
  );
});
