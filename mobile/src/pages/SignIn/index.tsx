import {
    Text, View, StyleSheet, Image, TextInput, TouchableOpacity,
    TouchableHighlight,
} from "react-native";

import React, { useState } from "react";

import { Ionicons } from '@expo/vector-icons'
import { Alert } from "react-native";


export default function SignIn() {

    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {
        if (password === '' || email === '') {
            Alert.alert(
                'Atenção', 'Preencha todos os campos!');
            return;
        }

        console.log("email: " + email)
        console.log("senha: " + password)
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.imagem}
            />

            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder="Digite seu email..."
                placeholderTextColor='#fff'
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.areaPassword}>
                <TextInput
                    style={styles.inputPass}
                    secureTextEntry={visible ? true : false}
                    placeholder="Digite sua senha..."
                    placeholderTextColor='#fff'
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableHighlight style={styles.btnShow} onPress={() => setVisible(!visible)}>
                    {
                        visible
                            ?
                            <Ionicons name="eye" color="#fff" size={23} />
                            :
                            <Ionicons name="eye-off" color="#fff" size={23} />
                    }
                </TouchableHighlight>
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                <Text style={styles.btnText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1d1d2e',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    imagem: {
        marginBottom: 20
    },
    input: {
        backgroundColor: '#101026',
        width: '90%',
        marginVertical: 5,
        paddingVertical: 10,
        paddingLeft: 20,
        color: '#fff',
        fontSize: 14,
        borderRadius: 8
    },
    inputPass: {
        backgroundColor: '#101026',
        width: '80%',
        marginVertical: 5,
        paddingVertical: 10,
        paddingLeft: 20,
        color: '#fff',
        fontSize: 14,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
    },
    btn: {
        backgroundColor: '#3fffa3',
        width: '90%',
        marginVertical: 5,
        borderRadius: 8
    },
    btnShow: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101026',
        height: 48,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,

    },
    btnText: {
        textAlign: 'center',
        paddingVertical: 10,
        color: '#10102e',
        fontSize: 20
    },
    areaPassword: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

})