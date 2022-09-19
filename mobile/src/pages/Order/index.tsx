import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'

import { useRoute, RouteProp } from '@react-navigation/native'//importa para pegar os dados que estão no navigate
import { Ionicons } from '@expo/vector-icons'



type RouteDetailParams = {//tipagem dos dados recebidos
    Order: {
        number: string | number,
        order_id: string
    }
}

type OrderTypeProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {

    const [check, setCheck] = useState(false)
    const route = useRoute<OrderTypeProps>()


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabelArea}>
                <Text style={styles.tableNumber}>Mesa: {route.params.number}</Text>
                <TouchableOpacity>
                    <Ionicons name="trash-outline" size={25} color='#ff3f4b' />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.input}>
                <Text style={styles.textInput}>Pizzas</Text>
            </TouchableOpacity>

            <View style={styles.areaCheckTam}>
                <TouchableOpacity style={styles.check}>

                    <TouchableOpacity onPress={() => setCheck(!check)}>
                        {
                            check ?
                                <Ionicons name='checkbox-outline' size={25} color='#fff' />
                                :
                                <View style={styles.notCheck}></View>
                        }
                    </TouchableOpacity>

                    <Text style={{ fontSize: 17, color: '#fff', marginLeft: 10 }}>2 sabores</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.input, { width: '60%', alignItems: 'center' }]}>
                    <Text style={styles.textInput}>M</Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.input}>
                <Text style={styles.textInput}>Primeiro sabor</Text>
            </TouchableOpacity>

            {check && (
                <TouchableOpacity style={styles.input}>
                    <Text style={styles.textInput}>Segundo sabor</Text>
                </TouchableOpacity>
            )}

            <View style={styles.areaQtd}>
                <Text style={styles.qtdText}>Quantidade: </Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    value='1'
                />
            </View>

            <View style={styles.areaBtnPlus}>
                <TouchableOpacity style={styles.btnPlus}>
                    <Text style={styles.btnPlusText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAvancar}>
                    <Text style={styles.btnAvancarText}>Avançar</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1d1d2e',
        flex: 1,
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingTop: '8%'
    },
    tabelArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '4%',
        justifyContent:'flex-end'

    },
    tableNumber: {
        color: '#fff',
        fontSize: 25,
        marginRight: 15,
        fontWeight: '500'
    },
    input: {
        width: '100%',
        backgroundColor: '#101026',
        height: 45,
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 5,
        marginBottom: 14,
        color: "#FFF",
        fontSize: 22
    },
    textInput: {
        color: '#fff',
        fontSize: 16
    },
    areaQtd: {
        flexDirection: 'row',
        justifyContent: "space-between",
        maxHeight: '10%',
        alignItems: 'center',
        marginBottom: 5,
    },
    qtdText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        width: '35%',
        textAlign: 'center',
        justifyContent: 'center',
        paddingBottom: '4%'
    },
    areaBtnPlus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '7%',
    },
    btnPlus: {
        backgroundColor: '#3fd1ff',
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnPlusText: {
        color: '#fff',
        fontSize: 20
    },
    btnAvancar: {
        backgroundColor: '#3fffa3',
        height: '100%',
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnAvancarText: {
        color: '#101026',
        fontSize: 20,
        fontWeight: '500'
    },
    areaCheckTam: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    check: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
    },
    notCheck: {
        width: 20,
        height: 20,
        borderColor: '#fff',
        borderWidth: 1
    }

})