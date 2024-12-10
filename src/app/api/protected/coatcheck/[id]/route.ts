import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from 'next/navigation';
//get a single coatcheck by id

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    console.log("id", id, req.nextUrl.searchParams);
    const coatCheck = await prisma.coatCheck.findUnique({
        where: {
            id: id as string,
        },
    });

    return NextResponse.json(coatCheck);
}