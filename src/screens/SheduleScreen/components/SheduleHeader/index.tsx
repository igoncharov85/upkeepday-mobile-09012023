import React, { FC, memo, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import SearchIcon from '../../../../../assets/svg/SearchIcon';
import styles from './styles';
import SearchInput from '../../../../components/UI/SearchInput';

interface ISheduleHeader {
  text: string
}
export const SheduleHeader: FC<ISheduleHeader> = memo(({ text }) => {
  const [searchMode, setSearchMode] = useState(false)
  const toggleSearchMOde = () => {
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
