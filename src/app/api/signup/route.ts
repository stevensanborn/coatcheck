import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    return NextResponse.json({ message: "Hello, world!" });
}