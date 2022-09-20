import React from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity,
    Dimensions, ScrollView
} from 'react-native'

import { CategoryProps } from '../../pages/Order'

//tipagem do modal mesmos dados passados como props do modal
interface ModalPickerProps {
    options: CategoryProps[];//options é a cat, recebendo um array
    handleClose: () => void;
    selectedItem: (item: CategoryProps) => void;//item vindo da category props - order
}

const { width: WidDim, height: HeigDim } = Dimensions.get('window')//pegando altura e largura da tela

export function ModalPicker({ options, handleClose, selectedItem }: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        selectedItem(item)//passando o item para o selectedItem
        handleClose();//fechando o modal ao escolher uma cat
    }

    const option = options.map((item, index) => (//percorrendo o array da cat e colocando em option
        //lembrando que options é a state category que guardamos as cat da requisição
        <TouchableOpacity key={index} onPress={() => onPressItem(item)}>
            <Text style={styles.options} >
                {item?.name}
                {/* //passando os names da cat */}
            </Text>
        </TouchableOpacity>
    ))


    return (
        <TouchableOpacity style={styles.container} onPress={handleClose}>
            {/* fechando o modal ao clicar */}
            <View style={styles.containerModal}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                    {/* option passando cada item do map - option é o result do map */}
                </ScrollView>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerModal: {
        backgroundColor: "#fff",
        width: WidDim - 30,
        height: HeigDim / 2,
        borderRadius: 8
    },
    options:{
        color: '#101026',
        fontWeight: '500',
        fontSize: 16,
        paddingVertical:10,
        paddingLeft: 10
    }

})