import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    console.log("id", id);

    //delete from db
    prisma.coatCheck.delete({
        where: {
            id: id
        }
    });

    return NextResponse.json({ message: "Coat check deleted" });
}