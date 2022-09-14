import React, { useState, createContext, ReactNode } from 'react';
import { api } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
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

    const isAuthenticated = !!user.name;//transformando em boolean

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true)

        try {
            const response = await api.post('/session', {//acessando rota de login
                email, password
            })

            const { id, name, token } = response.data//desconstruindo do response.data

            const data = {
                ... response.data//pega tudo do response: id, name e token e guarda no data
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

            
        } catch (error) {
            console.log("Erro ao ecessar rota: " + error)
            setLoadingAuth(false)
        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}