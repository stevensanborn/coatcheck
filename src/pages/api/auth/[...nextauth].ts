import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SigninMessage } from '@/utils/SignInMessage';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Solana',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
        },
        signature: {
          label: 'Signature',
          type: 'text',
        },
      },
      
      async authorize(credentials, req) {
        console.log('authorize');
        try {
          const signinMessage = new SigninMessage(
            JSON.parse(credentials?.message || '{}')
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || '');
          if (signinMessage.domain !== nextAuthUrl.host) {
            return null;
          }

          const csrfToken = await getCsrfToken({ req: { ...req, body: null } });

          if (signinMessage.nonce !== csrfToken) {
            console.log("nonce", signinMessage.nonce, csrfToken);
            return null;
          }else{console.log("nonce match")}

          const validationResult = await signinMessage.validate(
            credentials?.signature || ''
          );
          if (!validationResult) console.log('Could not validate the signed message');
          if (!validationResult)  throw new Error('Could not validate the signed message');


          return {
            id: signinMessage.publicKey,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
    error: '/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
   
    async session({ session, token }) {
      session.user.publicKey = token.sub;
      if (session.user) {
        session.user.name = token.sub;
        session.user.image = `https://ui-avatars.com/api/?name=${token.sub}&background=random`;
      }
      return session;
    },
    async jwt({ token, user }) {
      token.publicKey = token.sub;
      return token;
    },
  },
};

// const getOptions = () => {
//   return authOptions;
// };

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const isDefaultSigninPage =
    req.method === 'GET' && req.query.nextauth?.includes('signinc');
  let options = authOptions;
  // Hides Sign-In with Solana from the default sign page
  if (isDefaultSigninPage) {
    options.providers.pop();
  }

  return await NextAuth(req, res, options);
}

export { authOptions };
