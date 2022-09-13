import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../pages/Dashboard';

export default function AppRoutes() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
