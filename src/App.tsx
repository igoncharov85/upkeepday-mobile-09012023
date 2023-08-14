import React from 'react';
import { SafeAreaView, StyleSheet, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastModal } from './components/UI/ToastModal';
import { RootNavigation } from './modules/navigation';
import { persistor, store } from './store/store';

function App(): JSX.Element {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaView style={styles.rootComponent}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
          <ToastModal />
        </PersistGate>
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
