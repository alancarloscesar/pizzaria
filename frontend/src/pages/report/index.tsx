import React, { useState, useContext, useEffect } from "react";
import styles from './styles.module.scss'
import style from './styleCard.module.scss'
import { format, add } from 'date-fns'
import { toast } from "react-toastify";

import Header from "../components/Header";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
registerLocale('pt', pt)

import { setupAPIClient } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

interface contaProps {
    id: string;
    valor_comissao: string | number;
}


export default function Report() {
    const [dataInicial, setDataInicial] = useState(new Date());
    const [dataFinal, setDataFinal] = useState(new Date());
    const [userList, setUserList] = useState([]);
    const [userSelected, setUserSelected] = useState(0)
    const [comissao, setComissao] = useState<contaProps[]>([])

    setDefaultLocale('pt');

    const api = setupAPIClient();
    const { user } = useContext(AuthContext)


    useEffect(() => {


        loadUser();

    }, [])

    async function loadUser() {
        const response = await api.get('/user/name');
        setUserList(response.data)
    }

    async function handleComissao() {

        const dataInicialFormat = (format(dataInicial, 'yyyy-MM-dd'))//formatação para fazer a req

        const dayPlus = add(dataFinal, { days: 1 })
        const dayPlusFormat = (format(dayPlus, 'yyyy-MM-dd'))

        const response = await api.post('/report', {
            dataInicial: dataInicialFormat,
            dataFinal: dayPlusFormat,
            garcom: userSelected
        })
        const somaItems = response.data.reduce((a, b) => a + Number(b.valor_comissao), 0);
        setComissao(somaItems)
        console.log("+++++++++++ " + comissao)


        console.log(response.data)

        console.log("Data inicial: " + dataInicialFormat)
        console.log("Data final + 1 dia: " + dayPlusFormat)
        console.log("Garçom: " + userSelected)

        
        
    }
    //selecionando categoria
    function handleChangeGarcom(event) {
        setUserSelected(event.target.value)
    }

    return (
        <>
            <Header />

            <main className={styles.container}>

                <section className={styles.areaPicker}>

                    <article>
                        <h3 onClick={() => alert(userSelected)}>Data Inicial:</h3>
                        <DatePicker
                            selected={dataInicial}
                            onChange={(date: Date) => setDataInicial(date)}
                            dateFormat="dd/MM/yyyy"
                            className={styles.datePicker}
                        />
                    </article>

                    <article>
                        <h3>Data Final:</h3>
                        <DatePicker
                            selected={dataFinal}
                            onChange={(date: Date) => setDataFinal(date)}
                            dateFormat="dd/MM/yyyy"
                            className={styles.datePicker}
                        //para pegar certinho a data final tem que ser um 1 a mais que o desejado 
                        // ea inicial normal no dia exato
                        />
                    </article>


                    <article>
                        <h3>Garçom:</h3>
                        <select value={userSelected} onChange={handleChangeGarcom} onClick={loadUser}
                           >
                            {
                                userList.map((item) => (
                                    <option onClick={loadUser} key={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                        
                    </article>

                    <button
                        className={styles.btnGerar}
                        onClick={handleComissao}>
                        Gerar comissão
                    </button>

                </section>

                <section className={styles.areaCard}>
                    <div className={style.card}>
                        <header>
                            <img src="/user.png" alt="minha img" width={100} height={100} />
                        </header>

                        <main>
                            <h3 className={style.name}>{userSelected}</h3>
                            <section className={style.areaDate}>
                                <h3>{format(dataInicial, 'dd/MM/yyyy')}</h3>
                                <h3>à</h3>
                                <h3>{format(dataFinal, 'dd/MM/yyyy')}</h3>
                            </section>
                            <hr />
                            <div className={style.areaPrice}>
                                <p className={style.price}>{comissao.toString()}</p>
                                <span className={style.rs}>R$</span>
                            </div>
                        </main>

                        <footer>
                            {
                                comissao.toString() !== '' && (
                                    <button>Imprimir</button>
                                )
                            }
                        </footer>

                    </div>
                </section>

            </main>
        </>
    )
}
