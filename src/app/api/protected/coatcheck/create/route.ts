// // This is an example of to protect an API route

import createAuthority from "@/libs/database/coatcheck/authority/create";
import createCoatCheck from "@/libs/database/create";
import create from "@/libs/database/create";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  let res = new NextResponse();
  
  const token = await getToken({ req, secret });
  console.log("token", token);
if (!token || !token.sub)
    return NextResponse.json({
      error: "Not authenticated",
    });
    
  if (token) {


    const body = await req.json();
    console.log("body", body);
    const {name, description} = body;


    let publicKey = token.sub;
    //create authority account is needed
    const authorityAccount = await createAuthority("", "", publicKey);

    console.log("authorityAccount", authorityAccount);
    
    const coatCheck = await createCoatCheck(name, description, publicKey);
    

    console.log("coatCheck", coatCheck);
    

    return NextResponse.json({
      ContentVisibilityAutoStateChangeEvent: "This is protected content. You can access this content because you are signed in.",
      publicKey: JSON.stringify(token),
      coatCheck: JSON.stringify(coatCheck)
    });
    
  }

return NextResponse.json({
    error: "You must be signed in to view the protected content on this page.",
  });
  

}