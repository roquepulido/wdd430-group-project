import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT DISTINCT category FROM handcrafted_haven.products WHERE is_available = true`
    );
    const categories = result.rows.map(r => r.category).filter(Boolean);
    client.release();
    return NextResponse.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 });
  }
}
