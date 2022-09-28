import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
        size: string;
    };
    deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ItemProps) {

    function handleDeleteItem() {//função para deletar item
        deleteItem(data.id)//passando data.id para a função handle
    }



    return (
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount}x - {data.name} - {data.size}</Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" color="#FF3F4b" size={25} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#101026',
        marginBottom: 10,
        height: 40,
        paddingHorizontal: 15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#272747'
    },
    item: {
        fontSize: 14,
        color: '#fff',
    }
})