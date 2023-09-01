import React, { FC, memo, useMemo } from 'react';
import { Text, View } from 'react-native';
import SearchIcon from '../../../../../assets/svg/SearchIcon';
import { AccountSelector } from './components/AccountSelector';
import { getStyles } from './styles';
import { useUiContext } from '../../../../UIProvider';

interface ISheduleHeader {
  text?: string
  isSelection?: boolean;
}
export const SheduleHeader: FC<ISheduleHeader> = memo(({ text, isSelection }) => {
  const { colors } = useUiContext();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {isSelection && <AccountSelector isTitle={!!text} />}
      {text && <Text numberOfLines={1} style={styles.headerText}>{text}</Text>}
      <View style={styles.search}>
        <SearchIcon />
      </View>
    </View>
  );
});
