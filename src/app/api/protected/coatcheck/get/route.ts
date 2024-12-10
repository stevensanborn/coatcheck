import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

//get a single coatcheck by id

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    console.log("id", id, req.nextUrl.searchParams);
    const coatCheck = await prisma.coatCheck.findUnique({
        where: {
            id: id as string,
        },
    });

    return NextResponse.json(coatCheck);
}