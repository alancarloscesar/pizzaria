import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    View, Text, StyleSheet, SafeAreaView,
    TouchableOpacity, TextInput, Modal, FlatList
} from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'

import { useRoute, RouteProp } from '@react-navigation/native'//importa para pegar os dados que estão no navigate
import { Ionicons } from '@expo/vector-icons'

import { ModalPicker } from '../../components/ModalPicker'

import { api } from '../../services/api'
import { ListItem } from '../../components/ListItem'



type RouteDetailParams = {//tipagem dos dados recebidos
    Order: {
        number: string | number,
        order_id: string
    }
}

export type CategoryProps = {//tipando os dados da categoria
    id: string;
    name: string;
}

export type ProductProps = {//tipagem de produtos
    id: string;
    name: string;
    // price: number | string;
}

export type SizeProps = {
    id: string;
    name: string;
}
export type ItemsProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderTypeProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {

    const [check, setCheck] = useState(false)
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([])//passando a typagem
    const [selectedCategory, setSelectedCategory] = useState<CategoryProps | undefined>()//passando a typagem

    const [product, setProduct] = useState<ProductProps[] | []>([])
    const [selectedProduct, setSelectedProduct] = useState<ProductProps | undefined>()

    const [size, setSize] = useState<SizeProps[] | []>([])
    const [selectedSize, setSelectedSize] = useState<SizeProps | undefined>()
    const [idCatGet, setidCatGet] = useState('')

    const [amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemsProps[]>([])

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)
    const [modalProductVisible, setModalProductVisible] = useState(false)
    const [modalSizeVisible, setModalSizeVisible] = useState(false)

    const { signOut } = useContext(AuthContext)

    const route = useRoute<OrderTypeProps>()

    useEffect(() => {
        async function loadCategory() {
            const response = await api.get('/category')

            setCategory(response.data)//passando reponse para o state 
            setSelectedCategory(response.data[0])

        }

        loadCategory();


    }, [])

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/product/category', {
                params: {
                    category_id: selectedCategory?.id
                }
            })

            setProduct(response.data)
            setSelectedProduct(response.data[0])
        }
        loadProducts();
    }, [selectedCategory])//ação do effect ao selecionar uma categoria

    useEffect(() => {
        async function loadSize() {
            const response = await api.get('/category/size', {
                params: {
                    category_id: selectedCategory?.id
                }
            })

            setSize(response.data)
            setSelectedSize(response.data[0])
            // console.log(selectedCategory?.id)
            //console.log(response.data)
        }
        loadSize()
    }, [selectedCategory])


    async function handleDeleteTable() {

        try {
            await api.delete('/order', {//requisicao de deletar 
                params: {//params - query params
                    order_id: route.params.order_id
                }
            })
            navigation.goBack();//voltar uma pagina
        } catch (error) {
            console.log("Erro ao excluir mesa -> " + error)
        }
    }

    function handleCategorySelect(item: CategoryProps) {//seleciona o item do modal
        setSelectedCategory(item)//jogando o item no state

    }

    function handleProductSelect(item: ProductProps) {
        setSelectedProduct(item)
    }

    function handleSizeSelect(item: SizeProps) {
        setSelectedSize(item)
    }

    // adcionando um produto nessa mesa
    async function handleAdd() {
        const response = await api.post('/order/add', {
            order_id: route.params?.order_id,
            product_id: selectedProduct?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: selectedProduct?.id as string,
            name: selectedProduct?.name as string,
            amount: amount
        }
        setItems(oldArray => [...oldArray, data])
    }

    //função para deletar o item da flatlist e bd
    async function handleDeleteItem(item_idd: string) {
        const response = await api.delete('/order/item', {
            params: {
                item_id: item_idd
            }
        })
        //apos remover da api removemos da flatlis com filter
        let removeItem = items.filter(item => {
            return (item.id !== item_idd)//retorna tudo menos o removido
        })

        setItems(removeItem)//atualiza flatlist

    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabelArea}>
                <Text style={styles.tableNumber}>Mesa: {route.params.number}</Text>
                {
                    items.length === 0 && (

                        <TouchableOpacity onPress={handleDeleteTable}>
                            <Ionicons name="trash-outline" size={25} color='#ff3f4b' />
                        </TouchableOpacity>
                    )
                }
            </View>

            {category.length !== 0 && (//se meu array da category for diferente de 0
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    {/* modal true */}
                    <Text style={styles.textInput}>{selectedCategory?.name}</Text>
                    <Ionicons name="caret-down-outline" color='#fff' size={22} />
                </TouchableOpacity>
            )}

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
                <TouchableOpacity
                    style={[styles.input, { width: '60%', alignItems: 'center' }]}
                    onPress={() => setModalSizeVisible(true)}
                >
                    <Text style={styles.textInput}>{selectedSize?.name}</Text>
                    <Ionicons name="caret-down-outline" color='#fff' size={22} />
                </TouchableOpacity>
            </View>


            {product.length !== 0 && (//se meu array da product for diferente de 0
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={styles.textInput}>{selectedProduct?.name}</Text>
                    <Ionicons name="caret-down-outline" color='#fff' size={22} />
                </TouchableOpacity>
            )}


            {check && (
                <TouchableOpacity style={styles.input}>
                    {/* <Text style={styles.textInput}>{selectedProduct?.price}</Text> */}
                    <Text style={styles.textInput}>{selectedProduct?.name}</Text>
                    <Ionicons name="chevron-down-outline" color='#fff' size={22} />
                </TouchableOpacity>
            )}

            <View style={styles.areaQtd}>
                <Text style={styles.qtdText}>Quantidade: </Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.areaBtnPlus}>
                <TouchableOpacity style={styles.btnPlus} onPress={handleAdd}>
                    <Text style={styles.btnPlusText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btnAvancar, { opacity: items.length === 0 ? 0.3 : 1 }]}
                    disabled={items.length === 0 ? true : false}>
                    <Text style={styles.btnAvancarText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />



            {/* Modal category */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalCategoryVisible}
            >
                <ModalPicker
                    handleClose={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleCategorySelect}
                //dados trabalhados de dentro do comp. modalPicker
                />
            </Modal>

            {/* Modal Product */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalProductVisible}
            >
                <ModalPicker
                    handleClose={() => setModalProductVisible(false)}
                    options={product}
                    selectedItem={handleProductSelect}
                //dados trabalhados de dentro do comp. modalPicker
                />
            </Modal>

            {/* Modal Size */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalSizeVisible}
            >
                <ModalPicker
                    handleClose={() => setModalSizeVisible(false)}
                    options={size}
                    selectedItem={handleSizeSelect}
                //dados trabalhados de dentro do comp. modalPicker
                />
            </Modal>

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
        justifyContent: 'flex-end'

    },
    tableNumber: {
        color: '#fff',
        fontSize: 25,
        marginRight: 15,
        fontWeight: '500'
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#101026',
        height: 45,
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
        maxHeight: 100,
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
        height: 40,
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