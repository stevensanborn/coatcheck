import prisma from "@/libs/prisma";


export default async function createCoatCheck(name: string, description: string, publicKey: string) {
    const coatCheck = await prisma.coatCheck.create({
        data: {
            name: name,
            description: description,
            authorityKey: publicKey,
        }
    });

    return coatCheck;
}