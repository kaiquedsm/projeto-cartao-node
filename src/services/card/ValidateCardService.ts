import { PrismaClient } from "@prisma/client"
import prismaClient from "../../prisma"

interface CardRequest {
    numero: number,
    seguranca: number,
    usuario: string
}

class ValidateCardService {

    async execute({numero, seguranca, usuario}: CardRequest) {

        if(!numero) {
            throw new Error("Número do cartão não enviado!")
        }

        const bigNumber = BigInt(numero)

        const cardExist = await prismaClient.cartao.findFirst({
            where: {
                numero: bigNumber
            }
        })

        if(!cardExist || cardExist.seguranca !== seguranca) {
            return "Dados do cartão estão incorretos"
        }

        if (cardExist.id_usuario !== usuario) {
            return "O cartão não foi encontrado para o usuário atual!";
        }

        return "O cartão é o mesmo do usuário autenticado, COMPRA APROVADA!"

    }

}

export {ValidateCardService}