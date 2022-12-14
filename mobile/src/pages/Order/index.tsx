import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    View, Text, StyleSheet, SafeAreaView,
    TouchableOpacity, TextInput, Modal, FlatList, Alert
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
    price: string;

}

export type ProductProps = {//tipagem de produtos
    id: string;
    name: string;
    price: string;
    estoque: string;
    quantidade: number;
    pertencente: string;
}
export type Product2Props = {//tipagem de produtos
    id: string;
    name: string;
    price: string;
}

export type SizeProps = {
    id: string;
    name: string;
    price: string;
}
export type ItemsProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
    size: string;
    price: string;
    pertencente: string;
}
export type ItemsPropsConta = {
    price: string | number;
    amount: string | number;
    name: string;

}

type itemExist = {
    amount: number;
    price: string;
    name: string;
    // tamanho
}

type OrderTypeProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {

    const [check, setCheck] = useState(false)
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([])//passando a typagem
    const [selectedCategory, setSelectedCategory] = useState<CategoryProps | undefined>()//passando a typagem

    const [product, setProduct] = useState<ProductProps[] | []>([])
    const [selectedProduct, setSelectedProduct] = useState<ProductProps | undefined>()

    const [productItem, setProductItem] = useState<ItemsPropsConta[]>([])

    const [product2, setProduct2] = useState<Product2Props[] | []>([])
    const [selectedProduct2, setSelectedProduct2] = useState<Product2Props | undefined>()

    const [size, setSize] = useState<SizeProps[] | []>([])
    const [selectedSize, setSelectedSize] = useState<SizeProps | undefined>()
    const [sizeLoad, setSizeLoad] = useState('')

    const [amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemsProps[]>([])
    const [itemConta, setItemConta] = useState<ItemsPropsConta[]>([])

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)
    const [modalProductVisible, setModalProductVisible] = useState(false)
    const [modalProductVisible2, setModalProductVisible2] = useState(false)
    const [modalSizeVisible, setModalSizeVisible] = useState(false)

    const [itemExist, setItemsExist] = useState<itemExist[]>()

    const [getTextBtnNext, setgetTextBtnNext] = useState('Avançar')
    const [pegaQtdProduct, setPegaQtdProduct] = useState('')
    const [count, setCount] = useState(0)

    const route = useRoute<OrderTypeProps>()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        async function loadOrderExist() {//função para verificar se a mesa é uma existente para mostrar items
            const response = await api.post('/order/exist', {
                table: Number(route.params.number)
            })
            setItemsExist(response.data)
            // console.log('=============')
            // console.log(route.params.number)
            // console.log(response.data)
        }

        loadOrderExist()
    }, [])


    useEffect(() => {//BUSCA CATEGORIAS
        async function loadCategory() {
            const response = await api.get('/category')

            setCategory(response.data)//passando reponse para o state 
            setSelectedCategory(response.data[0])
        }
        loadCategory();
    }, [])

    useEffect(() => {//BUSCA TAMANHOS POR CATEGORIA
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

    useEffect(() => {//BUSCA PRODUTOS POR CATEGORIA E TAMANHO
        async function loadProducts() {
            const response = await api.get('/product/category', {
                params: {
                    category_id: selectedCategory?.id,
                    tamanho: selectedSize?.name
                }
            })

            setProduct(response.data)
            setSelectedProduct(response.data[0])

            setProduct2(response.data)
            setSelectedProduct2(response.data[0])

        }
        loadProducts();
    }, [selectedCategory, selectedSize])//ação do effect ao selecionar uma categoria

    async function listItems() {//listar os item para calcular o amount
        const response = await api.get('/item/list', {
            params: {
                order_id: route.params.order_id,
                product_id: selectedProduct?.id
            }
        })
        setProductItem(response.data)
    }



    async function handleDeleteTable() {
        if (itemExist) {//se a mesa existir so volta e não deleta
            navigation.goBack();
        } else {
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
    }

    function handleCategorySelect(item: CategoryProps) {//seleciona o item do modal
        setSelectedCategory(item)//jogando o item no state

    }

    function handleProductSelect(item: ProductProps) {
        setSelectedProduct(item)
    }

    function handleProductSelect2(item: Product2Props) {
        setSelectedProduct2(item)
    }

    function handleSizeSelect(item: SizeProps) {
        setSelectedSize(item)
    }

    // adcionando um produto nessa mesa
    async function handleAdd() {

        if (itemExist) {//se a rota /order/exist do effect identificar que a mesa é igual e ainda não foi fechada vai mostrar o que já foi pedido
            if (check) {//se for 2 sabores

                if (selectedProduct?.estoque === "true") {//SE O O PRODUTO TIVER CONTROL DE ESTOQUE

                    const calc = Number(selectedProduct.quantidade) - Number(amount)

                    if (Number(amount) > Number(selectedProduct?.quantidade)) {
                        Alert.alert("Ops...",
                            `Não temos mais essa quantidade para este Item! - ESTOQUE - ${selectedProduct?.quantidade}`)
                        return;
                    }

                    await api.put('/product/estock', {//ATUALIZA A QUANTIDADE
                        name: selectedProduct?.name,
                        tamanho: selectedSize?.name,
                        quantidade: Number(calc)
                    })

                    const itemPrice = Number(selectedProduct?.price) * Number(amount)
                    const itemPrice2 = Number(selectedProduct2?.price) * Number(amount)

                    const response = await api.post('/order/add', {
                        order_id: route.params?.order_id,
                        product_id: selectedProduct?.id,
                        amount: Number(amount),
                        price: itemPrice >= itemPrice2 ? itemPrice.toString() : itemPrice2.toString(),
                        name: "2 sabores - " + selectedProduct?.name as string + " - " + selectedProduct2?.name as string,
                        pertencente: "cozinha"
                    })

                    let data = {
                        id: response.data.id,
                        product_id: selectedProduct?.id as string,
                        name: "2 sabores - " + selectedProduct?.name as string + " - " + selectedProduct2?.name as string,
                        amount: amount,
                        size: selectedSize?.name as string,
                        price: itemPrice >= itemPrice2 ? itemPrice.toString() : itemPrice2.toString(),
                        pertencente: "cozinha"
                    }

                    setItems(oldArray => [...oldArray, data])

                } else {
                    const itemPrice = Number(selectedProduct?.price) * Number(amount)
                    const itemPrice2 = Number(selectedProduct2?.price) * Number(amount)

                    const response = await api.post('/order/add', {
                        order_id: route.params?.order_id,
                        product_id: selectedProduct?.id,
                        amount: Number(amount),
                        price: itemPrice >= itemPrice2 ? itemPrice.toString() : itemPrice2.toString(),
                        name: "2 sabores - " + selectedProduct?.name as string + " - " + selectedProduct2?.name as string,
                        pertencente: "cozinha"
                    })

                    let data = {
                        id: response.data.id,
                        product_id: selectedProduct?.id as string,
                        name: "2 sabores - " + selectedProduct?.name as string + " - " + selectedProduct2?.name as string,
                        amount: amount,
                        size: selectedSize?.name as string,
                        price: itemPrice >= itemPrice2 ? itemPrice.toString() : itemPrice2.toString(),
                        pertencente: "cozinha"
                    }

                    setItems(oldArray => [...oldArray, data])
                }



            } else {
                if (selectedProduct?.estoque === "true") {//SE O O PRODUTO TIVER CONTROL DE ESTOQUE

                    const calc = Number(selectedProduct.quantidade) - Number(amount)

                    if (Number(amount) > Number(selectedProduct?.quantidade)) {
                        Alert.alert("Ops...",
                            `Não temos mais essa quantidade para este Item! - ESTOQUE - ${selectedProduct?.quantidade}`)
                        return;
                    }
                    await api.put('/product/estock', {//ATUALIZA A QUANTIDADE
                        name: selectedProduct?.name,
                        tamanho: selectedSize?.name,
                        quantidade: Number(calc)
                    })

                    const itemPrice = Number(selectedProduct?.price) * Number(amount)

                    const response = await api.post('/order/add', {
                        order_id: route.params?.order_id,
                        product_id: selectedProduct?.id,
                        amount: Number(amount),
                        price: itemPrice.toString(),
                        name: selectedProduct?.name,
                        pertencente: selectedProduct?.pertencente
                    })

                    let data = {
                        id: response.data.id,
                        product_id: selectedProduct?.id as string,
                        name: selectedProduct?.name as string,
                        amount: amount,
                        size: selectedSize?.name as string,
                        price: itemPrice.toString(),
                        pertencente: selectedProduct?.pertencente
                    }

                    setItems(oldArray => [...oldArray, data])
                } else {

                    const itemPrice = Number(selectedProduct?.price) * Number(amount)

                    const response = await api.post('/order/add', {
                        order_id: route.params?.order_id,
                        product_id: selectedProduct?.id,
                        amount: Number(amount),
                        price: itemPrice.toString(),
                        name: selectedProduct?.name,
                        pertencente: selectedProduct?.pertencente
                    })

                    let data = {
                        id: response.data.id,
                        product_id: selectedProduct?.id as string,
                        name: selectedProduct?.name as string,
                        amount: amount,
                        size: selectedSize?.name as string,
                        price: itemPrice.toString(),
                        pertencente: selectedProduct?.pertencente as string
                    }

                    setItems(oldArray => [...oldArray, data])
                }
            }

        } else {//se for mesa nova

            if (check) {

                if (selectedProduct?.estoque === "true") {//SE O O PRODUTO TIVER CONTROL DE ESTOQUE

                    const calc = Number(selectedProduct.quantidade) - Number(amount)

                    if (Number(amount) > Number(selectedProduct?.quantidade)) {
                        Alert.alert("Ops...",
                            `Não temos mais essa quantidade para este Item! - ESTOQUE - ${selectedProduct?.quantidade}`)
                        return;
                    }
                    await api.put('/product/estock', {//ATUALIZA A QUANTIDADE
                        name: selectedProduct?.name,
                        tamanho: selectedSize?.name,
                        quantidade: Number(calc)
                    })

                    const itemPrice = Number(selectedProduct?.price) * Number(amount)
                    const itemPrice2 = Number(selectedProduct2?.price) * Number(amount)

                    const response = await api.post('/order/add', {
                        order_id: route.params?.order_id,
                        product_id: selectedProduct?.id,
                        amount: Number(amount),
                        price: itemPrice >= itemPrice2 ? itemPrice.toString() : itemPrice2.toString(),
                        name: "2 sabores - " + selectedProduct?.name as string + " - " + selectedProduct2?.name as string,
                        pertencente: "cozinha"
                    })

                    let data = {
                        id: response.data.id,
                        product_id: selectedProduct?.id as string,
                        name: "2 sabores - " + selectedProduct?.name as string + " - " + selectedProduct2?.name as string,
                        amount: amount,
                        size: selectedSize?.name as string,
                        price: itemPrice >= itemPrice2 ? itemPrice.toString() : itemPrice2.toString(),
                        pertencente: "cozinha"
                    }

                    setItems(oldArray => [...oldArray, data])

                } else {

                    const itemPrice = Number(selectedProduct?.price) * Number(amount)
                    const itemPrice2 = Number(selectedProduct2?.price) * Number(amount)

                    const response = await api.post('/order/add', {
                        order_id: route.params?.order_id,
                        product_id: selectedProduct?.id,
                        amount: Number(amount),
                        price: itemPrice >= itemPrice2 ? itemPrice.toString() : itemPrice2.toString(),
                        name: "2 sabores - " + selectedProduct?.name as string + " - " + selectedProduct2?.name as string,
                        pertencente: "cozinha"
                    })

                    let data = {
                        id: response.data.id,
                        product_id: selectedProduct?.id as string,
                        name: "2 sabores - " + selectedProduct?.name as string + " - " + selectedProduct2?.name as string,
                        amount: amount,
                        size: selectedSize?.name as string,
                        price: itemPrice >= itemPrice2 ? itemPrice.toString() : itemPrice2.toString(),
                        pertencente: "cozinha"
                    }

                    setItems(oldArray => [...oldArray, data])
                }

            } else {

                if (selectedProduct?.estoque === "true") {//SE O O PRODUTO TIVER CONTROL DE ESTOQUE

                    const calc = Number(selectedProduct.quantidade) - Number(amount)

                    if (Number(amount) > Number(selectedProduct?.quantidade)) {
                        Alert.alert("Ops...",
                            `Não temos mais essa quantidade para este Item! - ESTOQUE - ${selectedProduct?.quantidade}`)
                        return;
                    }
                    await api.put('/product/estock', {//ATUALIZA A QUANTIDADE
                        name: selectedProduct?.name,
                        tamanho: selectedSize?.name,
                        quantidade: Number(calc)
                    })

                    const itemPrice = Number(selectedProduct?.price) * Number(amount)

                    const response = await api.post('/order/add', {
                        order_id: route.params?.order_id,
                        product_id: selectedProduct?.id,
                        amount: Number(amount),
                        price: itemPrice.toString(),
                        name: selectedProduct?.name,
                        pertencente: selectedProduct?.pertencente
                    })

                    let data = {
                        id: response.data.id,
                        product_id: selectedProduct?.id as string,
                        name: selectedProduct?.name as string,
                        amount: amount,
                        size: selectedSize?.name as string,
                        price: itemPrice.toString(),
                        pertencente: selectedProduct?.pertencente
                    }

                    setItems(oldArray => [...oldArray, data])
                } else {

                    //TENTATIVA DE PEGAR OS ITEM IGUAIS E SOMAR

                    //ESSA PORRA NÃO SAI DO ZERO QUANDO CADASTRA ALGO
                    // if (route.params?.order_id === route.params?.order_id &&
                    //     selectedProduct?.id === selectedProduct?.id) {
                    //     alert("estou aqui")
                    //     // }
                    //     listItems();
                    //     // console.log(productItem)

                    // if (productItem.length === 0 && count === 0) {
                    //     alert('estou dentro do 0')
                    const itemPrice = Number(selectedProduct?.price) * Number(amount)

                    const response = await api.post('/order/add', {
                        order_id: route.params?.order_id,
                        product_id: selectedProduct?.id,
                        amount: Number(amount),
                        price: itemPrice.toString(),
                        name: selectedProduct?.name,
                        pertencente: selectedProduct?.pertencente
                    })

                    let data = {
                        id: response.data.id,
                        product_id: selectedProduct?.id as string,
                        name: selectedProduct?.name as string,
                        amount: amount,
                        size: selectedSize?.name as string,
                        price: itemPrice.toString(),
                        pertencente: selectedProduct?.pertencente as string
                    }

                    setItems(oldArray => [...oldArray, data])
                    //     setCount(1)


                    // } else {
                    //     alert('naoooooo')


                    //     //if (productItem.length === 1) {
                    //         alert('estou dentro do === 1')
                    //         const amountCount1 = productItem.reduce((a, b) => a + (Number(b.amount) + Number(amount)), 0);
                    //         alert(amountCount1)
                    //         setPegaQtdProduct(amountCount1.toString())

                    //         await api.put('/order/update', {
                    //             order_id: route.params?.order_id,
                    //             product_id: selectedProduct?.id,
                    //             amount: Number(pegaQtdProduct),
                    //             price: "444"
                    //         })
                    //         setCount(2)



                    //     //}
                    //     if (productItem.length > 1) {

                    //         alert('estou dentro do > 1')
                    //         const values = Number(pegaQtdProduct) + Number(amount)
                    //         alert(">1 - " + values)
                    //         setPegaQtdProduct(values.toString())

                    //         await api.put('/order/update', {
                    //             order_id: route.params?.order_id,
                    //             product_id: selectedProduct?.id,
                    //             amount: Number(values),
                    //             price: "444"
                    //         })


                    //     }

                    //     }


                    // }
                }
            }
        }
    }

    //função para deletar o item da flatlist e bd
    async function handleDeleteItem(item_idd: string) {
        const response = await api.delete('/order/item', {
            params: {
                item_id: item_idd
            }
        })

        //DEVOLVENDO A QTD AO PRODUTO JÁ QUE FOI CANCELADO O ITEM
        const calc = Number(selectedProduct?.quantidade) + (Number(amount) - Number(amount))
        await api.put('/product/estock', {//ATUALIZA A QUANTIDADE
            name: selectedProduct?.name,
            tamanho: selectedSize?.name,
            quantidade: Number(calc)
        })

        //apos remover da api removemos da flatlis com filter
        let removeItem = items.filter(item => {
            return (item.id !== item_idd)//retorna tudo menos o removido
        })

        setItems(removeItem)//atualiza flatlist
    }

    async function handleNext() {
        const response = await api.get('/price/name/size', {
            params: {
                order_id: route.params?.order_id
            }
        })

        setItemConta(response.data)//passano response para o state

        //calculando a soma dos items
        const somaItems = itemConta.reduce((a, b) => a + Number(b.price), 0);

        const comissao = itemConta.reduce((a, b) => a + Number(b.price) * 0.1, 0);

        const comissaoConta = itemConta.reduce((a, b) => a + Number(b.price) + Number(b.price) * 0.1, 0);

        if (somaItems === 0) {
            Alert.alert(
                "Confira o pedido e pressione 'FINALIZAR",
                "",
                [
                    {
                        text: "cancelar",
                        style: "cancel"
                    },
                    {
                        text: "ok",
                        onPress: () => setgetTextBtnNext('Finalizar')
                    }
                ]
            );


        } else {

            Alert.alert(
                "Deseja finalizar o pedido?",
                `MESA: ${route.params.number}`,
                [
                    {
                        text: "NÃO",
                        style: "cancel"
                    },
                    {
                        text: "SIM",
                        onPress: () => handleAddAcount(somaItems, comissao, comissaoConta)
                    }
                ]
            );
        }
    }

    async function handleAddAcount(somaItems: number, comissao: number, comissaoConta: number) {
        if (itemExist) {
            try {
                const response = await api.put('/account', {
                    order_id: route.params.order_id,

                    valor_conta: somaItems.toFixed(2).toString(),
                    conta_comissao: comissaoConta.toFixed(2).toString(),
                    valor_comissao: comissao.toFixed(2).toString()

                })

                navigation.goBack();//voltar uma pagina

            } catch (error) {
                console.log("Erro ao avançar: " + error)
            }
        } else {
            try {
                const response = await api.post('/order/account', {
                    valor_conta: somaItems.toFixed(2).toString(),
                    conta_comissao: comissaoConta.toFixed(2).toString(),
                    valor_comissao: comissao.toFixed(2).toString(),
                    garcom: user.name.toString(),
                    order_id: route.params.order_id,
                    user_id: user.id

                })

                await api.put('/order/send', {

                    order_id: route.params.order_id

                })

                navigation.goBack();//voltar uma pagina

            } catch (error) {
                console.log("Erro ao avançar: " + error)
            }
        }
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


            {/* {product.length !== 0 && (//se meu array da product for diferente de 0 */}
            <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                <Text style={styles.textInput}>{selectedProduct?.name}</Text>
                <Ionicons name="caret-down-outline" color='#fff' size={22} />
            </TouchableOpacity>
            {/* )} */}


            {check && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible2(true)}>
                    <Text style={styles.textInput}>{selectedProduct2?.name}</Text>
                    <Ionicons name="caret-down-outline" color='#fff' size={22} />
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
                    disabled={items.length === 0 ? true : false}
                    onPress={handleNext}
                >
                    <Text style={styles.btnAvancarText}>{getTextBtnNext}</Text>
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
                    selectedItem={() => handleProductSelect}
                //dados trabalhados de dentro do comp. modalPicker
                />
            </Modal>

            {/* Modal Product 2 */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalProductVisible2}
            >
                <ModalPicker
                    handleClose={() => setModalProductVisible2(false)}
                    options={product2}
                    selectedItem={handleProductSelect2}
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