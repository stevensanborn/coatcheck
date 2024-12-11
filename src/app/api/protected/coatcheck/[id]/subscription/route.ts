
//get all subscriptions for a coatcheck

import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const subscriptions = await prisma.subscription.findMany({
        where: { coatCheckId: id },
    });
    console.log(subscriptions);

    return NextResponse.json({
        subscriptions: subscriptions
    });
}

