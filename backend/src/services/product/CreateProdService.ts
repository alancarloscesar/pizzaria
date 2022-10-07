import prismaClient from "../../prisma";


interface ProductRequest {
    name: string
    price: string
    banner: string
    category_id: string
    tamanho: string
}

class CreateProdService {
    async execute({ name, price, banner, category_id, tamanho }: ProductRequest) {

        if (name === '' || price === '') {
            throw new Error("Preencha todos os campos!")
        } else {
            const verifyNameProduct = await prismaClient.product.findFirst({
                where: {
                    name: name,
                    tamanho: tamanho
                }
            })
            if (verifyNameProduct) {//se o nome e o tamanho do produto forem os mesmos dará a msg abaixo
                throw new Error("Esse produto já foi cadastrado!!!");
            } else {


                const product = await prismaClient.product.create({

                    data: {
                        name: name,
                        price: price,
                        banner: banner,
                        category_id: category_id,
                        tamanho: tamanho
                    }
                })
                return product;
            }
        }
    }

}

export { CreateProdService }