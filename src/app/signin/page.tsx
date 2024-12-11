// src/app/sign-in/page.tsx
"use client"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { SigninMessage } from "@/utils/SignInMessage";
import bs58 from "bs58";
import { getCsrfToken, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from 'next/navigation'

const SignInPage = () => {
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("session", session);
    if(status === "authenticated"){
      redirect("/coatcheck/dashboard");
    }
  }, [session]);

  const handleSignIn = async () => {
    console.log("handleSignIn");

    try {
      if (!wallet.connected) {
        walletModal.setVisible(true);
      }

      const csrf = await getCsrfToken();
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        nonce: csrf,
      });

      console.log(message)


      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      const serializedSignature = bs58.encode(signature);
      console.log("serializedSignature", serializedSignature);
     signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature: serializedSignature,
      });
    } catch (error) {
      console.log(error);
    }
  };


    return (
      <div>


        <h1>SignInPage</h1>

         <button className='button btn-primary btn-sm btn-outline' onClick={handleSignIn}>
            Sign in
         </button>
      

        
      </div>
    );
  };
  
  export default SignInPage;