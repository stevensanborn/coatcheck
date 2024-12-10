
//get the subscription for a coatcheck

import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string, subid: string } }) {
    const { id, subid } = params;
    console.log("id", id, "subid", subid);
    const subscription = await prisma.subscription.findUnique({
            where: { id: subid },
    });

    return NextResponse.json({
        subscription: JSON.stringify(subscription)
    });
}

