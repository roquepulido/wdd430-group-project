import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {Pool} from 'pg';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "email@test.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const pool = new Pool({
                    connectionString: process.env.DATABASE_URL,
                    ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : false,
                });
                const client = await pool.connect();
                try {
                    const result = await client.query(
                        'SELECT u.*, s.id as seller_id FROM handcrafted_haven.users u LEFT JOIN handcrafted_haven.sellers s ON u.id = s.user_id WHERE u.email = $1',
                        [credentials.email]
                    );
                    if (result.rows.length === 0) return null;
                    const user = result.rows[0];
                    const valid = await bcrypt.compare(credentials.password, user.password_hash);
                    if (!valid) return null;

                    return {
                        id: String(user.id),
                        name: user.email,
                        email: user.email,
                        sellerId: user.seller_id ? String(user.seller_id) : null
                    };
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
    },
    callbacks: {
        async session({session, token}) {

            if (!session.user) session.user = {} as any;

            if (token) {
                (session.user as any).id = token.id || null;
                (session.user as any).sellerId = token.sellerId || null;
            }
            return session;
        },
        async jwt({token, user}) {

            if (user && 'id' in user) {
                token.id = user.id;
            }
            if (user && 'sellerId' in user) {
                token.sellerId = user.sellerId;
            }
            return token;
        }
    }
});

export {handler as GET, handler as POST};
