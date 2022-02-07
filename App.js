/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Debit from './src/screens/debitScreen'
import SetLimit from './src/screens/setLimitScreen';
const Stack = createStackNavigator();

function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Debit" component={Debit}
       
        />
        <Stack.Screen name="setlimit" component={SetLimit} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
