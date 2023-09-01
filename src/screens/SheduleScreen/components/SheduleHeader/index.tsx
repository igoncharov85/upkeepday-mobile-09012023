import React, { FC, memo, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SearchIcon from '../../../../../assets/svg/SearchIcon';
import { AccountSelector } from './components/AccountSelector';
import { getStyles } from './styles';
import { useUiContext } from '../../../../UIProvider';
import SearchInput from '../../../../components/UI/SearchInput';
import { useRoute } from '@react-navigation/native';

interface ISheduleHeader {
  text: string
  isSelection?: boolean;
}
export const allowedScreen = ['SCHEDULE_TAB', 'CLASSES_TAB', 'STUDENTS_TAB']
export const SheduleHeader: FC<ISheduleHeader> = memo(({ text, isSelection }) => {
  const { colors } = useUiContext();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const route = useRoute();
  const [searchMode, setSearchMode] = useState(false)

  const toggleSearchMOde = () => {
    // if (allowedScreen.includes(route.name)) {
      setSearchMode(!searchMode);
    // };
  };

  return (
    <View style={styles.container}>
      {
        searchMode
          ? <SearchInput editMode={toggleSearchMOde} />
          : <>
            {isSelection
              ? <AccountSelector />
              : <Text style={styles.headerText}>{text}</Text>
            }
            <TouchableOpacity onPress={toggleSearchMOde}>
              <SearchIcon />
            </TouchableOpacity>
          </>
      }
    </View>
  );
});
