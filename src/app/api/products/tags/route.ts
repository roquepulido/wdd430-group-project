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
      `SELECT DISTINCT t.name FROM handcrafted_haven.tags t
        JOIN handcrafted_haven.product_tags pt ON pt.tag_id = t.id
        JOIN handcrafted_haven.products p ON p.id = pt.product_id
        WHERE p.is_available = true`
    );
    const tags = result.rows.map(r => r.name).filter(Boolean);
    client.release();
    return NextResponse.json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    return NextResponse.json({ error: "Error fetching tags" }, { status: 500 });
  }
}
