//get all coatchecks for a given authority

import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    
    const { publicKey } = req.nextUrl.searchParams as any   ;

    console.log("publicKey", publicKey);

    const coatChecks = await prisma.coatCheck.findMany({
        where: {
            authorityKey: publicKey,
        },
    });

    return NextResponse.json(coatChecks);
}   