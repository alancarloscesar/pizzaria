import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { api } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>//com props
    loading: boolean,
    loadingAuth: boolean,
    signOut: () => Promise<void>//sem props
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string
}

type SignInProps = {
    email: string;
    password: string;
}


type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({//state inicia vazio com tipagem UserProps
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)//passamos o loading true, e false apos finalizar o if

    const isAuthenticated = !!user.name;//transformando em boolean
    
    useEffect(() => {//pega o token no asyncStorage ao carregar o componente
        async function getUser() {
            const userInfo = await AsyncStorage.getItem('@smartMenu')//pegando a chave do async
            let hashUser: UserProps = JSON.parse(userInfo || '{}')//transf. string em objeto ou objeto vazio
            
            // verificar se tem algo la dentro
            if (Object.keys(hashUser).length > 0) {//se tiver algo na chave
                api.defaults.headers.common['Authorization'] = `Bearer ${hashUser.token}`//deixa como default no app o token
                
                //passamos os dados para o state user
                setUser({
                    id: hashUser.id,
                    email: hashUser.email,
                    name: hashUser.name,
                    token: hashUser.token
                })

                setLoading(false)
                
            }
            
        }
        setLoading(false)
        
        getUser();
    }, [])

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true)

        try {
            const response = await api.post('/session', {//acessando rota de login
                email, password
            })

            const { id, name, token } = response.data//desconstruindo do response.data

            const data = {
                ...response.data//pega tudo do response: id, name e token e guarda no data
            }

            await AsyncStorage.setItem('@smartMenu', JSON.stringify(data))//ceia chave e converte o objeto

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`//deixa como default no app o token

            setUser({//passando os dados desconstruidos para o state user que estava vazio ''
                id,
                name,
                email,
                token
            })
            //no index.tsx que seria nosso controle de rotas repassamos o isAuthenticated via contexto
            
            setLoadingAuth(false) 

        } catch (error) {
            console.log("Erro ao ecessar rota: " + error)
            setLoadingAuth(false) 
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: ''
                })
            })
            .catch((err) => {
                console.log('Erro ao deslogar: ' + err)
            })
    }


    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            loading,
            loadingAuth,
            signOut
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}