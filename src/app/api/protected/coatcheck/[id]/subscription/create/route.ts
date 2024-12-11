
//create a subscription for a coatcheck

import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const {name, duration, price} = body;

    const subscription = await prisma.subscription.create({
        data: {
            name,
            duration,
            price,
            coatCheckId: id,
        },
    });

    console.log(subscription);

    return NextResponse.json({
        subscription: JSON.stringify(subscription)
    });
}