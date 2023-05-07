import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DrawerNavigator from "./src/components/DrawerNavigator";

export default function App() {

  const Stack = createNativeStackNavigator();
 
  useEffect(() => {
  }, [])

  return (
    <NavigationContainer>
        <Stack.Navigator
         initialRouteName="DrawerNavigator"
          screenOptions={() => ({
            headerShown: false,
          })}>
            <>
              <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}/>
            </>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
