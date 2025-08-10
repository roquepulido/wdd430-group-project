import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@test.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        });
        const client = await pool.connect();
        try {
          const result = await client.query(
            'SELECT * FROM handcrafted_haven.users WHERE email = $1',
            [credentials.email]
          );
          if (result.rows.length === 0) return null;
          const user:any = result.rows[0];
          const valid = await bcrypt.compare(credentials.password, user.password_hash);
          if (!valid) return null;
          return { id: user.id, name: user.email, email: user.email };
        } finally {
          client.release();
        }
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
