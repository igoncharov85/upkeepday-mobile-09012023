import React, { FC, memo, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SearchIcon from '../../../../../assets/svg/SearchIcon';
import { AccountSelector } from './components/AccountSelector';
import { getStyles } from './styles';
import { useUiContext } from '../../../../UIProvider';
import SearchInput from '../../../../components/UI/SearchInput';
import { useRoute } from '@react-navigation/native';

export const allowedScreen = ['navigation/SCHEDULE_TAB', 'navigation/CLASSES_TAB', 'navigation/STUDENTS_TAB']

interface ISheduleHeader {
  text?: string
  isSelection?: boolean;
};

export const SheduleHeader: FC<ISheduleHeader> = memo(({ text, isSelection }) => {
  const { colors } = useUiContext();
  const route = useRoute();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const [searchMode, setSearchMode] = useState(false);

  const toggleSearchMOde = () => {
    if (allowedScreen.includes(route.name)) {
    setSearchMode(!searchMode);
    };
  };

  return (
    <View style={styles.container}>
      {
        searchMode
          ? <SearchInput editMode={toggleSearchMOde} />
          : <>
            {isSelection && <AccountSelector isTitle={!!text} />}
            {text && <Text numberOfLines={1} style={styles.headerText}>{text}</Text>}
            <TouchableOpacity onPress={toggleSearchMOde}>
              <SearchIcon />
            </TouchableOpacity>
          </>
      }
    </View>
  );
});