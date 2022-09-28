import React, { useContext, useState } from 'react'
import { TextInput, Text, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { api } from '../../services/api'

//importando as tipagens de navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../routes/app.routes'

import { AuthContext } from '../../contexts/AuthContext'

export default function Dashboard() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>()
    const { user, signOut } = useContext(AuthContext)

    const [table, setTable] = useState('')

    async function teste(){
        await signOut();
    }

    async function newOrderTable() {
        if (table === '') {
            Alert.alert('Atenção', 'Preencha todos os campos!!!')
            return;
        }

        console.log(user.id)      

        const response = await api.post('/order', {//requisição
            table: Number(table),//passando o table e convertendo para numero
            garcom: user.name,
            user_id: user.id
        })

        //passando os dados da tipagem do stack.screen da rota - enviando dados via navigate
        navigation.navigate('Order', { number: table, order_id: response.data.id })//passando os dados

        setTable('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.Title}>Novo Pedido</Text>
            <TextInput
                placeholder='Digite o número da mesa...'
                placeholderTextColor='#bdbbbb'
                style={styles.TextInputContainer}
                keyboardType={'numeric'}
                value={table}
                onChangeText={setTable}
            />

            <TouchableOpacity style={styles.BtnContainer} onPress={newOrderTable}>
                <Text style={styles.BtnContainerText}>Abrir Mesa</Text>
            </TouchableOpacity>

        </SafeAreaView>
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
    }
})