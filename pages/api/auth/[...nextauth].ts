import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth/next';
import { NextApiRequest } from 'next';

export default NextAuth({
  // Configure the providers you want to enable.
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  debug: true,
  providers: [
    CredentialsProvider({
      name: 'list it',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      // @ts-ignore
      async authorize(credentials: any, req: any) {
        // call localhost:3001/api/auth/login and save the jwt token
        const host = `${process.env.NEXTAUTH_URL}/api/auth/login`;
        const res = await fetch(host, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.exception);
        }

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      if (user && token) {
        console.log('user', user);
        return {
          ...user,
          accessToken: user.access_token,
        };
      }
      return token;
    },

    // @ts-ignore
    async session({ session, token }) {
      console.log('session', session);
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
