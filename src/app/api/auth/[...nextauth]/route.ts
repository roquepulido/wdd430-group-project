import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@test.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
          //TODO Cambiar a base de datos
        if (
          credentials?.email === "email@test.com" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "Jane Doe", email: "email@test.com" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login"
  }
});

export { handler as GET, handler as POST };
