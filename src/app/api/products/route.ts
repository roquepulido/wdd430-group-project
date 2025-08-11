// GET /api/products/categories - Obtener todas las categorías únicas de productos
export async function GET_CATEGORIES() {
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

// GET /api/products/materials - Obtener todos los materiales únicos
export async function GET_MATERIALS() {
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

// GET /api/products/tags - Obtener todos los tags únicos
export async function GET_TAGS() {
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
import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import {ProductDB} from "@/types";
import {del} from "@vercel/blob";

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
      // Obtener productos de un seller específico, incluyendo shopName
      result = await client.query(
        `SELECT p.*, s.shop_name as "shopName" FROM handcrafted_haven.products p
         JOIN handcrafted_haven.sellers s ON s.id = p.seller_id
         WHERE p.seller_id = $1`,
        [sellerId]
      );
    } else {
      // Obtener todos los productos disponibles, incluyendo shopName
      result = await client.query(
        `SELECT p.*, s.shop_name as "shopName" FROM handcrafted_haven.products p
         JOIN handcrafted_haven.sellers s ON s.id = p.seller_id
         WHERE p.is_available = true`
      );
    }
    const products = result.rows;
    // Obtener detalles adicionales para cada producto
    for (const product of products) {
      // Dimensiones
      const dimRes = await client.query(
        `SELECT width, height, depth FROM handcrafted_haven.product_dimensions WHERE product_id = $1`,
        [product.id]
      );
      product.dimensions = dimRes.rows[0] || null;
      // Tags
      const tagRes = await client.query(
        `SELECT t.name FROM handcrafted_haven.tags t
         JOIN handcrafted_haven.product_tags pt ON pt.tag_id = t.id
         WHERE pt.product_id = $1`,
        [product.id]
      );
      product.tags = tagRes.rows.map(r => r.name);
      // Materiales
      const matRes = await client.query(
        `SELECT m.name FROM handcrafted_haven.materials m
         JOIN handcrafted_haven.product_materials pm ON pm.material_id = m.id
         WHERE pm.product_id = $1`,
        [product.id]
      );
      product.materials = matRes.rows.map(r => r.name);
    }
    client.release();
    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}

// POST /api/products - Crear un nuevo producto
export async function POST(req: NextRequest) {
  const body: ProductDB = await req.json();
  try {
    const client = await pool.connect();
    await client.query('BEGIN');
    // Insertar producto principal
    const result = await client.query(
      `INSERT INTO handcrafted_haven.products (name, price, image, description, category, rating, stock, is_available, seller_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *`,
      [body.name, body.price, body.image, body.description, body.category, 0, body.stock || 0, body.is_available ?? false, body.seller_id]
    );
    const product = result.rows[0];
    console.log("Product created:", product);
    const productId = product.id;
    // Dimensiones
    if (body.dimensions) {
      await client.query(
        `INSERT INTO handcrafted_haven.product_dimensions (product_id, width, height, depth)
         VALUES ($1, $2, $3, $4)`,
        [productId, body.dimensions.width, body.dimensions.height, body.dimensions.depth]
      );
      console.log("Dimensions added:", body.dimensions);
    }
    // Tags
    if (body.tags && Array.isArray(body.tags)) {
        console.log("Tags to add:", body.tags);
      for (const tag of body.tags) {
        // Inserta tag si no existe
        const tagRes = await client.query(
          `INSERT INTO handcrafted_haven.tags (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
          [tag]
        );
        const tagId = tagRes.rows[0].id;
        await client.query(
          `INSERT INTO handcrafted_haven.product_tags (product_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [productId, tagId]
        );
        console.log("Tag added:", tag, " with ID:", tagId, " for product ID:", productId);
      }
    }
    // Materials
    if (body.materials && Array.isArray(body.materials)) {
        console.log("Materials to add:", body.materials);
      for (const mat of body.materials) {
        // Inserta material si no existe
        const matRes = await client.query(
          `INSERT INTO handcrafted_haven.materials (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
          [mat]
        );
        const matId = matRes.rows[0].id;
        await client.query(
          `INSERT INTO handcrafted_haven.product_materials (product_id, material_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [productId, matId]
        );
        console.log("Material added:", mat, " with ID:", matId, " for product ID:", productId);
      }
    }
    await client.query('COMMIT');
    client.release();
    return NextResponse.json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}

// PUT /api/products?id= - Actualizar producto por id
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Product id required' }, { status: 400 });
  const body: ProductDB = await req.json();
  try {
    const client = await pool.connect();
    await client.query('BEGIN');
    await client.query(
      `UPDATE handcrafted_haven.products SET name = $1, price = $2, image = $3, description = $4, category = $5, rating = $6, stock = $7, is_available = $8, updated_at = NOW() WHERE id = $9`,
      [body.name, body.price, body.image, body.description, body.category, body.rating, body.stock, body.is_available, id]
    );
    // Dimensiones
    if (body.dimensions) {
      await client.query(
        `INSERT INTO handcrafted_haven.product_dimensions (product_id, width, height, depth)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (product_id) DO UPDATE SET width=EXCLUDED.width, height=EXCLUDED.height, depth=EXCLUDED.depth`,
        [id, body.dimensions.width, body.dimensions.height, body.dimensions.depth]
      );
    }
    // Tags
    if (body.tags && Array.isArray(body.tags)) {
      // Borra tags actuales
      await client.query(`DELETE FROM handcrafted_haven.product_tags WHERE product_id = $1`, [id]);
      for (const tag of body.tags) {
        const tagRes = await client.query(
          `INSERT INTO handcrafted_haven.tags (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
          [tag]
        );
        const tagId = tagRes.rows[0].id;
        await client.query(
          `INSERT INTO handcrafted_haven.product_tags (product_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [id, tagId]
        );
      }
    }
    // Materials
    if (body.materials && Array.isArray(body.materials)) {
      await client.query(`DELETE FROM handcrafted_haven.product_materials WHERE product_id = $1`, [id]);
      for (const mat of body.materials) {
        const matRes = await client.query(
          `INSERT INTO handcrafted_haven.materials (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
          [mat]
        );
        const matId = matRes.rows[0].id;
        await client.query(
          `INSERT INTO handcrafted_haven.product_materials (product_id, material_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [id, matId]
        );
      }
    }
    await client.query('COMMIT');
    client.release();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error updating product:", err);
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
    // Obtener la URL de la imagen antes de borrar el producto
    const imgRes = await client.query(
      `SELECT image FROM handcrafted_haven.products WHERE id = $1`,
      [id]
    );
    const imageUrl = imgRes.rows[0]?.image;
    // Eliminar el producto
    await client.query(
      `DELETE FROM handcrafted_haven.products WHERE id = $1`,
      [id]
    );
    client.release();
    // Si hay imagen, eliminarla del blobStorage
    if (imageUrl) {
        await del(imageUrl);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error deleting product:", err);
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
  }
}
