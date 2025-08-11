import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password, role = "user", fullName, shopName, description } = await req.json();
  if (!email || !password || !fullName || !shopName || !description) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    const exists = await client.query(
      `SELECT id FROM handcrafted_haven.users WHERE email = $1`,
      [email]
    );
    if (exists.rows.length > 0) {
      await client.end();
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const userResult = await client.query(
      `INSERT INTO handcrafted_haven.users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id`,
      [email, password_hash, role]
    );
    const userId = userResult.rows[0].id;
    await client.query(
      `INSERT INTO handcrafted_haven.sellers (user_id, full_name, shop_name, description) VALUES ($1, $2, $3, $4)`,
      [userId, fullName, shopName, description]
    );
    await client.end();
    return NextResponse.json({ ok: true, message: "User and seller registered successfully" });
  } catch (err) {
    await client.end();
    return NextResponse.json({ error: "Registration failed", details: String(err) }, { status: 500 });
  }
}
