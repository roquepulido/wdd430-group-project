import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function POST() {
  try {
    const client = await pool.connect();
    try {
  // Create a sample admin user
      const passwordHash = await bcrypt.hash('admin123', 10);
      
      const userResult = await client.query(
        `INSERT INTO handcrafted_haven.users (email, password_hash, role)
         VALUES ($1, $2, $3)
         ON CONFLICT (email) DO UPDATE SET email=EXCLUDED.email
         RETURNING id`,
        ['admin@handcrafted.com', passwordHash, 'admin']
      );
      const userId = userResult.rows[0].id;
      await client.query(
        `INSERT INTO handcrafted_haven.sellers (user_id, full_name, shop_name, description, image)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (user_id) DO NOTHING`,
        [userId, 'Admin User', 'Admin Shop', 'Admin seller for handcrafted haven', 'https://grxdvpjrcjozr7ce.public.blob.vercel-storage.com/4b1065df-b32a-48ba-ba0d-f5a40b13d324.webp']
      );
      return NextResponse.json({ message: 'Sample admin user and seller created.' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating sample data:', error);
    return NextResponse.json({ error: 'Error creating sample data.' }, { status: 500 });
  }
}
