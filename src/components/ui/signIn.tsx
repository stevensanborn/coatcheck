import Link from "next/link";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
// import styles from "./header.module.css";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { SigninMessage } from "@/utils/SignInMessage";
import bs58 from "bs58";
// import { useEffect } from "react";
import {getSession} from "next-auth/react"

export default function SignInOut() {
  const { data: session, status } = useSession();
  
//   useEffect(()=>{
//     console.log("session",session,status)
    
//   },[session,status])
  const loading = status === "loading";

  const wallet = useWallet();
  const walletModal = useWalletModal();

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

     signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature: serializedSignature,
      });
    } catch (error) {
      console.log(error);
    }
  };

//   useEffect(() => {
//     if (wallet.connected && status === "unauthenticated") {
//     //   handleSignIn();
//     }
//   }, [wallet.connected]);

  return (

      <div className=''>
        <div
          className={`nojs-show ${
            !session && loading ? 'loading' : 'loaded'
          }`}
        >
          {!session && (
            
              <button className='btn btn-primary rounded-btn ' onClick={handleSignIn}>
                Sign in
              </button>
            
          )}
          {session?.user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-primary rounded-btn flex items-center gap-2">
                {session.user.image && (
                  <img 
                    src={session.user.image} 
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                )}
                Profile
              </label>
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li>
                  <a href="/profile">My Profile</a>
                </li>
                <li>
                  <a href="/settings">Settings</a>
                </li>
                <li>
                  <button
                    className="text-error"
                    onClick={e => {
                      e.preventDefault();
                      signOut({callbackUrl: "/"});
                    }}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
     
  );
}