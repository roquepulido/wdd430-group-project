import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// GET /api/products - Obtener todos los productos disponibles
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const sellerId = searchParams.get('sellerId');
  try {
    const client = await pool.connect();
    let result;
    if (sellerId) {
      // Obtener productos de un seller específico
      result = await client.query(
        `SELECT * FROM handcrafted_haven.products WHERE seller_id = $1`,
        [sellerId]
      );
    } else {
      // Obtener todos los productos disponibles
      result = await client.query(
        `SELECT * FROM handcrafted_haven.products WHERE is_available = true`
      );
    }
    client.release();
    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}

// POST /api/products - Crear un nuevo producto
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO handcrafted_haven.products (name, price, image, description, category, rating, stock, is_available, seller_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *`,
      [body.name, body.price, body.image, body.description, body.category, body.rating || 0, body.stock || 0, body.is_available ?? true, body.seller_id]
    );
    client.release();
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}

// PUT /api/products?id= - Actualizar producto por id
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Product id required' }, { status: 400 });
  const body = await req.json();
  try {
    const client = await pool.connect();
    await client.query(
      `UPDATE handcrafted_haven.products SET name = $1, price = $2, image = $3, description = $4, category = $5, rating = $6, stock = $7, is_available = $8, updated_at = NOW() WHERE id = $9`,
      [body.name, body.price, body.image, body.description, body.category, body.rating, body.stock, body.is_available, id]
    );
    client.release();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}

// DELETE /api/products?id= - Eliminar producto por id
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Product id required' }, { status: 400 });
  try {
    const client = await pool.connect();
    await client.query(
      `DELETE FROM handcrafted_haven.products WHERE id = $1`,
      [id]
    );
    client.release();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
  }
}
