import { PrismaClient } from "@prisma/client"
import prismaClient from "../../prisma"

import { hash } from 'bcryptjs'

interface CardRequest {
    numero: number,
    proprietario: string,
    validade: string,
    seguranca: number,
    usuario: string
}

class CreateCardService {

    async execute({numero, proprietario, validade, seguranca, usuario}: CardRequest) {

        // Verifica se foi enviado o valor do email
        if(!numero) {
            throw new Error("Número do cartão não enviado!")
        }

        const bigNumber = BigInt(numero)

        const CardAlreadyExists = await prismaClient.cartao.findFirst({
            where: {
                numero: bigNumber
            }
        })

        if(CardAlreadyExists) {
            throw new Error("Cartão já cadastrado")
        }



        const card = await prismaClient.cartao.create({
            data: {
                numero: bigNumber,
                proprietario: proprietario,
                validade: validade,
                seguranca: seguranca,
                usuario: {
                    connect: {
                        id: usuario
                    }
                }
            },
            select: {
                id: true,
                numero: true,
                proprietario: true
            }
        })
    
    }

}

export {CreateCardService}