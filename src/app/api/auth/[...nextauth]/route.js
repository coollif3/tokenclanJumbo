import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret:  process.env.NEXTAUTH_SECRET ,
  pages: {
    signIn: '/auth/login-1',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Username',
          type: 'email',
          placeholder: 'demo@example.com',
          value: 'demo@example.com',
        },
        password: { label: 'Password', type: 'password', value: 'zab#987' },
      },
      async authorize(credentials) {
        const user = credentials
          ? {
              id: 1,
              name: 'David Tim',
              email: credentials.email,
              accessToken: 'Wxh7ucB6n1ZpL2uSInvk/5Hl5WzgFFuPBhVfy0x6G0U=',
              role: 'admin',
            }
          : null;

        if (user) {
          return await new Promise((resolve, reject) => resolve(user));
        }
        return null;
      },
    }),
  ]
});

export { handler as GET, handler as POST };
