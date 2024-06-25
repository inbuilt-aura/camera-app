import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native';

import InputScreen from '../screens/InputScreens';
import ScanScreen from '../screens/ScanScreen'; // (Optional, if using camera)

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan Log' }} />  // (Optional)
        <Stack.Screen name="Input" component={InputScreen} options={{ title: 'Log Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
