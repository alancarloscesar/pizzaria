import prismaClient from "../../prisma";

interface productRequest{
    name: string
    price: string
    description: string
    banner: string
    category_id: string
    tamanho: string
}

class CreateProductService{
    async execute({name, price, description, banner, category_id, tamanho}: productRequest){

        if(name === '' || price === ''){
            throw new Error("os campos são obrigatorios");
        }else{

            const verifyNameProduct = await prismaClient.product.findFirst({
                where:{
                    name:name,
                    tamanho:tamanho
                }
            })
            if(verifyNameProduct){//se o nome e o tamanho do produto forem os mesmos dará a msg abaixo
                throw new Error("Esse produto já foi cadastrado!!!");
            }

            const product = await prismaClient.product.create({
                data:{
                    name: name,
                    price: price,
                    description: description,
                    banner: banner,
                    category_id: category_id,
                    tamanho: tamanho
                }
            })
            return product;
        }
    }
}

export {CreateProductService}