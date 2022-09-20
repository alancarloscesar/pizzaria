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
            <Text>
                {item?.name}
                {/* //passando os names da cat */}
            </Text>
        </TouchableOpacity>
    ))


    return (
        <TouchableOpacity onPress={handleClose}>
            {/* fechando o modal ao clicar */}
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                    {/* option passando cada item do map - option é o result do map */}
                </ScrollView>
            </View>
        </TouchableOpacity>

    )
}