import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    }
}

export function ListItem({ data }: ItemProps) {
    return (
        <View>
            <Text>{data.amount}X - {data.name}</Text>
            <TouchableOpacity>
                <Feather name="trash-2" color="#FF3F4b" size={25} />
            </TouchableOpacity>
        </View>
    )
}