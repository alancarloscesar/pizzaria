import axios from "axios";

const api = axios.create({
    // baseURL: 'http://192.168.100.137:3333'
    baseURL: 'https://ufarwt.conteige.cloud/'
})

export { api }