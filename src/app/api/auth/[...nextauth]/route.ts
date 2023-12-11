import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../../../shared/services/auth.service";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "email", type: "email" },
        contrasena: { label: "email", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;
        const response = await loginUser({
          email,
          password,
        });
        if (response.success) {
          return { ...response, id: response.token };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
