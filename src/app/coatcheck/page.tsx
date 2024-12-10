import Link from 'next/link';
import React from 'react'
import { redirect } from 'next/navigation';

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import SignIn from '@/components/ui/signIn';
import {getToken} from "next-auth/jwt"
import { getServerSession } from "next-auth/next"


// Add server-side props check
// export async function getServerSideProps(context: any) {
//   const token = await getToken({ req: context.req });
  
//   if (!token) {
//     return {
//       redirect: { 
//         destination: '/signin',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { token },
//   };
// }
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function Page({ token }: { token: any }) {
  const session = await getServerSession(authOptions)
 
  return <div>
    
    <h1 className='text-2xl my-10 font-bold'>Coat Check {session?'session'+JSON.stringify(session.user) :'no session'}</h1>  

    <div className='flex justify-center'>

      { session && (
        //logged in
        <div>
          <Link href='/coatcheck/dashboard'>
            <button className='bg-blue-500 text-white p-2 rounded-md' > Dashboard</button>
          </Link>
        </div>

      ) }
      { !session &&   (
        <div>
          <Link href='/coatcheck/create'>
            <button className='bg-blue-500 text-white p-2 rounded-md' > Sign In </button>
          </Link>
        </div>
      )}
     

    </div>


  </div>;
}


