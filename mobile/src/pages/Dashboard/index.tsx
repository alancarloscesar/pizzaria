import React,{useContext} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import { AuthContext } from '../../contexts/AuthContext'

export default function Dashboard(){
    const {signOut} = useContext(AuthContext)

    async function teste(){
        await signOut();
    }
    return(
        <View>
            <Text>Dashboard....</Text>
            <TouchableOpacity onPress={teste} style={{backgroundColor:'#ff0'}}>
                <Text>Teste</Text>
            </TouchableOpacity>
        </View>
    )
}