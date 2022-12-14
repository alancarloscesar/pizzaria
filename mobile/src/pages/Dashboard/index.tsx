import React, { useContext, useState, useEffect } from 'react'
import { TextInput, Text, TouchableOpacity, SafeAreaView, StyleSheet, Alert, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { api } from '../../services/api'
import { Feather } from '@expo/vector-icons'


//importando as tipagens de navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../routes/app.routes'

import { AuthContext } from '../../contexts/AuthContext'


export default function Dashboard() {



    // console.disableYellowBox = true;

    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>()
    const { user, signOut } = useContext(AuthContext)

    const [tableS, setTableS] = useState('')
    
    async function newOrderTable() {
        if (tableS === '') {
            Alert.alert('Atenção', 'Preencha todos os campos!!!')
            return;
        }

        const response = await api.get('/order/table', {
            params: {
                table: Number(tableS)
            }
        })

        if (response.data !== null) {
            //passando os dados da tipagem do stack.screen da rota - enviando dados via navigate
            navigation.navigate('Order', { number: tableS, order_id: response.data.id })//passando os dados

            setTableS('')
        } else {
            try {
                const response = await api.post('/order', {//requisição
                    table: Number(tableS),//passando o table e convertendo para numero
                    garcom: user.name,
                    user_id: user.id
                })

                //passando os dados da tipagem do stack.screen da rota - enviando dados via navigate
                navigation.navigate('Order', { number: tableS, order_id: response.data.id })//passando os dados

                setTableS('')


            } catch (err) {
                // console.log(err.response.status);
                // console.log(err.message);
                // console.log(err.response.headers); 
                Alert.alert("Atenção", `${err.response.data.error}`)
            }
        }


    }

    return (
        <>
            <View style={styles.logout}>
                <TouchableOpacity style={styles.logoutTouch} onPress={() => signOut()}>
                    <Feather name='power' size={20} color='#fff' style={{ marginRight: 8 }} />
                    <Text style={{ color: '#fff', fontSize: 16 }}>Sair</Text>
                </TouchableOpacity>
            </View>

            <SafeAreaView style={styles.container}>


                <Text style={styles.Title}>Novo Pedido</Text>
                <TextInput
                    placeholder='Digite o número da mesa...'
                    placeholderTextColor='#bdbbbb'
                    style={styles.TextInputContainer}
                    keyboardType={'numeric'}
                    value={tableS}
                    onChangeText={setTableS}
                />

                <TouchableOpacity style={styles.BtnContainer} onPress={newOrderTable}>
                    <Text style={styles.BtnContainerText}>Abrir Mesa</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'
    },
    Title: {
        color: '#fff',
        fontSize: 35,
        fontWeight: '300'
    },
    TextInputContainer: {
        backgroundColor: '#101026',
        height: 50,
        width: '90%',
        marginVertical: 15,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: 8,
        fontSize: 20,
    },
    BtnContainer: {
        backgroundColor: "#3fffa3",
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#101026',
        borderRadius: 8,
    },
    BtnContainerText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#1d1d2e",
        justifyContent: 'flex-end',
    },
    logoutTouch: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingRight: 20,
    }
})