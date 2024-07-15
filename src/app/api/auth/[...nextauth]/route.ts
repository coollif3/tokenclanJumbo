import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
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
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = {
          email: credentials?.email,
          password: credentials?.password,
        };
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
