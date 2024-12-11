
import prisma from "@/libs/prisma";


export default async function createAuthority(name: string, email: string, publicKey: string) {

    //see if there are any entries are already in the database
    const existingEntry = await prisma.coatCheckAuthorityAccount.findFirst({
        where: {
            publicKey: publicKey,
        }
    });

    if (existingEntry) {
        return existingEntry;
    }

    const coatCheckAuthorityAccount = await prisma.coatCheckAuthorityAccount.create({
        data: {
            name: name,
            email: email,
            publicKey: publicKey,
        }
    });

    return coatCheckAuthorityAccount;
}