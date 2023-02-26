/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RootNavigation} from './modules/navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.rootComponent}>
      <RootNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootComponent: {
    flex: 1,
    backgroundColor: '#EFF1F5',
  },
});

export default App;
