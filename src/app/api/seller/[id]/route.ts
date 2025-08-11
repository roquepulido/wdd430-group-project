import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// GET /api/seller/[id]?byUser=true - Get seller info by seller id or user id
export async function GET(
  req: NextRequest, 
  props: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const { searchParams } = new URL(req.url!);
  const byUser = searchParams.get('byUser');
  try {
    const client = await pool.connect();
    let result;
    if (byUser === 'true') {
      // get seller by user id
      result = await client.query(
        `SELECT s.*, u.email FROM handcrafted_haven.sellers s JOIN handcrafted_haven.users u ON s.user_id = u.id WHERE s.user_id = $1`,
        [id]
      );
    } else {
      // get seller by seller id
      result = await client.query(
        `SELECT s.*, u.email FROM handcrafted_haven.sellers s JOIN handcrafted_haven.users u ON s.user_id = u.id WHERE s.id = $1`,
        [id]
      );
    }
    client.release();
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (err) {
      console.log("Error fetching seller info:", err);
    return NextResponse.json({ error: "Error fetching seller info" }, { status: 500 });
  }
}

// PUT /api/seller/[id] - Update seller info
export async function PUT(
  req: NextRequest, 
  props: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const { fullName, shopName, description, image } = await req.json();
  try {
    const client = await pool.connect();
    await client.query(
      `UPDATE handcrafted_haven.sellers SET full_name = $1, shop_name = $2, description = $3, image = $4, updated_at = NOW() WHERE id = $5`,
      [fullName, shopName, description, image, id]
    );
    client.release();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error updating seller info:", err);
    return NextResponse.json({ error: "Error updating seller info" }, { status: 500 });
  }
}
