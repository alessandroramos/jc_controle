/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import Navigator from './src/Navigator'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);
