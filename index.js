/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import { ScheduleScreen } from './src/screens/SheduleScreen';

AppRegistry.registerComponent(appName, () => ScheduleScreen);
