import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// GET: Get product reviews
export async function GET(
    req: NextRequest, 
    props: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT r.id,u.email as "user", r.rating, r.comment, r.created_at
       FROM handcrafted_haven.reviews r
         INNER JOIN handcrafted_haven.users u ON r.user_id = u.id
       WHERE product_id = $1
       ORDER BY created_at`,
      [id]
    );
    client.release();
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json({ error: "Error fetching reviews" }, { status: 500 });
  }
}

// POST: Save a new review and update the average rating
export async function POST(
    req: NextRequest, 
    context: { 
       readonly params: Promise<{ id: string }>;
}) {
  const { id } = await context.params;
  try {
    const { user, rating, comment } = await req.json();
    const client = await pool.connect();
    await client.query(
      `INSERT INTO handcrafted_haven.reviews (product_id, user_id, rating, comment, created_at) VALUES ($1, $2, $3, $4, NOW())`,
      [id, user, rating, comment]
    );
  // Calculate the new average
    const avgRes = await client.query(
      `SELECT AVG(rating)::float as avg FROM handcrafted_haven.reviews WHERE product_id = $1`,
      [id]
    );
    const avg = avgRes.rows[0]?.avg || 0;
  // Update the product rating
    await client.query(
      `UPDATE handcrafted_haven.products SET rating = $1 WHERE id = $2`,
      [avg, id]
    );
    client.release();
    return NextResponse.json({ success: true, avg });
  } catch (err) {
    console.error("Error saving review:", err);
    return NextResponse.json({ error: "Error saving review" }, { status: 500 });
  }
}
