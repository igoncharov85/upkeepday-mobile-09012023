/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { ToastModal } from './components/UI/ToastModal';
import { RootNavigation } from './modules/navigation';
import { store } from './store/store';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.rootComponent}>
      <Provider store={store}>
        <RootNavigation />
        <ToastModal />
      </Provider>
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
