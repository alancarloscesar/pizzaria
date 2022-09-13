import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../pages/SignIn';

export default function AuthRoutes() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
