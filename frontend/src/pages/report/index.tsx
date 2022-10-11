import React, { useState } from "react";
import styles from './styles.module.scss'
import {format} from 'date-fns'

import Header from "../components/Header";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';

import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
registerLocale('pt', pt)

export default function Report() {
    const [startDate, setStartDate] = useState(new Date());

    setDefaultLocale('pt');


    return (
        <>
            <Header />

            <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                // dateFormat="yyyy/MM/dd"
                dateFormat="dd/MM/yyyy"
            />
            <button onClick={()=> console.log(format(startDate,'dd/MM/yyyy'))}>teste</button>
        </>
    )
}
