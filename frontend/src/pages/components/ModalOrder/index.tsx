import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { OrderItemProps } from '../../../pages/dashboard'
import { setupAPIClient } from '../../../services/api'

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[];

    handleFinishOrder: (id: string) => void;//para finalizar o pedido
}

interface AccountProps {
    conta_comissao: string;
    valor_comissao: string;
    valor_conta: string;
    garcom: string;
}

interface ItemProps {
    name: string;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder }: ModalOrderProps) {

    const setupApi = setupAPIClient()

    const [dataOrder, setDataOrder] = useState<OrderItemProps[]>()
    const [dataAccount, setDataAccount] = useState<AccountProps>()
    const [dataItems, setDataItem] = useState<ItemProps>()


    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    };

    useEffect(() => {

        async function handleLoad() {

            const response = await setupApi.get('/order/account', {
                params: {
                    order_id: order[0].order_id
                }
            })

            const resp = await setupApi.get('/order/detail', {
                params: {
                    order_id: order[0].order_id
                }
            })


            setDataItem(resp.data)
            setDataAccount(response.data)
        }

        handleLoad()

    }, [])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color="#f34748" />
            </button>

            <div className={styles.container}>

                <h2 className={styles.detalhes}>Detalhes do pedido</h2>
                <span className={styles.table}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>

                <main className='main'>

                    {order.map((item, index) => (

                        <section key={item.id} className={styles.containerItem}>
                            <span>{item.amount}x - <strong>{dataItems ? dataItems[index].name : "erro"} </strong>- {item.product.tamanho}</span>
                        </section>

                    ))}

                    <section className={styles.footer}>
                        <h2 style={{ fontWeight: 100 }}>Total: <strong>{dataAccount?.conta_comissao}</strong></h2>
                    </section>

                </main>

                <button className={styles.finishedOrder} onClick={() => { handleFinishOrder(order[0].order_id) }}>
                    Concluir Pedido
                </button>

            </div>

        </Modal>
    )
}