import React from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

export default function Routes() {

    const isAuthenticated = false;
    const loading = false;

    if(loading){
        return(
            <View style={styles.container}>
                <ActivityIndicator
                    color='#fff' size={70}
                />
                <Text style={styles.text}>Carregando...</Text>
            </View>
        )
    }

    return (

       isAuthenticated ? <AppRoutes /> : <AuthRoutes />

    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#101026',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text:{
        color: '#fff',
        fontSize: 22,
        marginVertical: 20
    }
})