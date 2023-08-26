import React, { FC, memo, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import SearchIcon from '../../../../../assets/svg/SearchIcon';
import styles from './styles';
import SearchInput from '../../../../components/UI/SearchInput';
import { useRoute } from '@react-navigation/native';

interface ISheduleHeader {
  text: string
}
export const allowedScreen = ['SCHEDULE_TAB', 'CLASSES_TAB', 'STUDENTS_TAB']
export const SheduleHeader: FC<ISheduleHeader> = memo(({ text }) => {
  const [searchMode, setSearchMode] = useState(false)
  const route = useRoute();

  const toggleSearchMOde = () => {
    if (allowedScreen.includes(route.name))
      setSearchMode(!searchMode)
  }
  return (
    <View style={styles.container}>
      {searchMode ? <SearchInput editMode={toggleSearchMOde} /> :
        (<>
          <Text style={styles.headerText}>{text}</Text>
          <TouchableOpacity onPress={toggleSearchMOde}>
            <SearchIcon />
          </TouchableOpacity>
        </>)}
    </View>
  );
});
