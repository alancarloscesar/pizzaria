import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';

export type StackParams = {//tipando minhas rotas
    Dashboard: undefined,
    Order: {//passando os dados
        number: number | string,
        order_id: string
    }
}

export default function AppRoutes() {
    const Stack = createNativeStackNavigator<StackParams>();//aplicando tipagem no stack

    return (
        <Stack.Navigator>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown: false}}/>
            <Stack.Screen name='Order' component={Order} options={{headerShown: false}}/>
        </Stack.Navigator>

    )
}
