import Header from "../components/Header"
import Head from "next/head"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"
import Category from "../category"

type ItemProps = {
    id: string;
    name: string;
}
type SizeProps = {
    id: string;
    name: string;
}
interface CategoryProps {
    categoryList: ItemProps[]
    sizeList: SizeProps[]
}

export default function Product({ categoryList, sizeList }: CategoryProps) {
    const apiClient = setupAPIClient();

    const [name, setName] = useState('')
    const [preco, setPreco] = useState('')
    const [tamanho, setTamanho] = useState('')
    const [descricao, setDescricao] = useState('')

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null)

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    const [sizes, setSizes] = useState(sizeList || [])
    const [sizeResponse, setSizeResponse] = useState(0)

    useEffect(() => {
        loadSizeCategory()
    }, [])

    //selecionando categoria
    function handleChangeCategory(event) {
        setCategorySelected(event.target.value)
    }

    //selecionando categoria
    function handleSize(event) {
        setSizeResponse(event.target.value)
    }

    //upload
    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {//se não fizer file
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            if (name === '' || preco === '') {
                toast.warning("Preencha todos os campos!!!")
                return;
            }

            const data = new FormData();//para trabalhar quando usa multipart no insomnia

            data.append('name', name.toUpperCase())
            data.append('price', preco)
            data.append('description', descricao)
            data.append('file', imageAvatar)
            data.append('category_id', categories[categorySelected].id)
            data.append('tamanho', sizes[sizeResponse].name)//sempre maiuscula

            await apiClient.post('/product', data);

            //console.log(categories[categorySelected].name)
            // setgetCategoryId(categorySelected[0])


            toast.success("Produto cadastrado com sucesso!")
        } catch (error) {
            toast.error(`${error.response.data.error}`)
        }

    }

    async function loadSizeCategory() {

        const response = await apiClient.get('/category/size', {
            params: {
                category_id: categories[categorySelected].id
            }
        })
        //console.log(response.data)
        setSizes(response.data)
    }

    return (
        <>
            <Head>
                <title>Cadastro de produtos</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <section className={styles.sectionData}>
                    <h1>Novo Produto</h1>

                    <form className={styles.formData} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>

                            <span>
                                <FiUpload color="#fff" size={30} />
                            </span>

                            <input type='file' accept="image/jpeg, image/jpg"
                                onChange={handleFile}
                            />

                            {avatarUrl && (
                                <img src={avatarUrl} alt="Foto do produto"
                                    className={styles.preview}
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory} onClick={loadSizeCategory}>
                            {
                                categories.map((item, index) => {

                                    return (
                                        <option key={item.id} value={index}>
                                            {item.name}
                                        </option>
                                    )
                                })
                            }

                        </select>

                        <input
                            className={styles.inputsData}
                            placeholder="Digite o nome do produto..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            className={styles.inputsData}
                            placeholder="Preço do produto..."
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                        />

                        <select value={sizeResponse} onChange={handleSize}>
                            {
                                sizes.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.name}
                                        </option>
                                    )
                                })
                            }

                        </select>

                        <textarea
                            placeholder="Descrição do produto..."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <button type="submit">
                            Cadastrar
                        </button>
                    </form>
                </section>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient('/category')
    return {
        props: {
            categoryList: response.data
        }
    }
})