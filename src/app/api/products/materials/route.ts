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
      `SELECT DISTINCT m.name FROM handcrafted_haven.materials m
        JOIN handcrafted_haven.product_materials pm ON pm.material_id = m.id
        JOIN handcrafted_haven.products p ON p.id = pm.product_id
        WHERE p.is_available = true`
    );
    const materials = result.rows.map(r => r.name).filter(Boolean);
    client.release();
    return NextResponse.json(materials);
  } catch (err) {
    console.error("Error fetching materials:", err);
    return NextResponse.json({ error: "Error fetching materials" }, { status: 500 });
  }
}
