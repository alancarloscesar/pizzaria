import React from 'react'
import {View, Text} from 'react-native'

import { useRoute, RouteProp } from '@react-navigation/native'//importa para pegar os dados que estão no navigate

type RouteDetailParams={//tipagem dos dados recebidos
    Order:{
        number: string | number,
        order_id: string
    }
}

type OrderTypeProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order(){

    const route = useRoute<OrderTypeProps>()

    return(
        <View>
            <Text>Tela de order......</Text>
            <Text>{route.params.number}</Text>
            <Text>{route.params.order_id}</Text>
        </View>
    )
}