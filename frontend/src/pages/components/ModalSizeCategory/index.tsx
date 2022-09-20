import Modal from 'react-modal';
import styles from './styles.module.scss';
import React, {useEffect} from 'react'

import { FiX } from 'react-icons/fi'

interface ModalSizeProps {
    isOpen: boolean;
    onRequestClose: () => void;
    getCaregoryName: string
    //category: Order
    // order: OrderItemProps[];

    // handleFinishOrder: (id: string) => void;//para finalizar o pedido
}

export type ModalProps = {
    id: string,
    name: string
}

export function ModalSizeCategory({ isOpen, onRequestClose, getCaregoryName/*, order, handleFinishOrder */}: ModalSizeProps) {

    useEffect(()=>{
        console.log(getCaregoryName)
        
    },[])

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

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            //getCaregoryName={getCaregoryName}
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

                <h2>Cadastro de Tamanho da categoria:</h2>
                <span className={styles.table}>
                    Categoria: <strong>{getCaregoryName}</strong>
                    {/* Mesa: <strong>{order[0].order.table}</strong> */}
                </span>

                {/* {order.map(item => (
                    <section key={item.id} className={styles.containerItem}>
                        <span>{item.amount} - <strong>{item.product.name}</strong></span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))} */}

                {/* <button className={styles.finishedOrder} onClick={() => {handleFinishOrder(order[0].order_id) }}> */}
                <button className={styles.finishedOrder} >
                    Cadastrar Tamanho
                </button>

            </div>

        </Modal>
    )
}