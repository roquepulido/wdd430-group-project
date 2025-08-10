import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(Req: Request) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  // Elimina primero las tablas dependientes para reconstrucción limpia
  await client.query(`
    DROP TABLE IF EXISTS handcrafted_haven.product_dimensions CASCADE;
    DROP TABLE IF EXISTS handcrafted_haven.product_materials CASCADE;
    DROP TABLE IF EXISTS handcrafted_haven.materials CASCADE;
    DROP TABLE IF EXISTS handcrafted_haven.product_tags CASCADE;
    DROP TABLE IF EXISTS handcrafted_haven.tags CASCADE;
    DROP TABLE IF EXISTS handcrafted_haven.reviews CASCADE;
    DROP TABLE IF EXISTS handcrafted_haven.products CASCADE;
    DROP TABLE IF EXISTS handcrafted_haven.sellers CASCADE;
    DROP TABLE IF EXISTS handcrafted_haven.users CASCADE;
  `);

  // Crea la tabla de usuarios para autenticación
  await client.query(`
    CREATE TABLE IF NOT EXISTS handcrafted_haven.users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role VARCHAR(20) DEFAULT 'user', -- 'user' or 'admin'
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Crea la tabla de sellers relacionada con users
  await client.query(`
    CREATE TABLE IF NOT EXISTS handcrafted_haven.sellers (
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES handcrafted_haven.users(id) ON DELETE CASCADE,
      full_name VARCHAR(100) NOT NULL,
      shop_name VARCHAR(100) NOT NULL,
      description TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Crea la tabla de products
  await client.query(`
    CREATE TABLE IF NOT EXISTS handcrafted_haven.products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      image TEXT,
      description TEXT,
      category VARCHAR(50),
      rating NUMERIC(2,1) DEFAULT 0,
      stock INT DEFAULT 0,
      is_available BOOLEAN DEFAULT true,
      seller_id INT REFERENCES handcrafted_haven.sellers(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Crea la tabla de reviews relacionada con users
  await client.query(`
    CREATE TABLE IF NOT EXISTS handcrafted_haven.reviews (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES handcrafted_haven.products(id) ON DELETE CASCADE,
      user_id INT REFERENCES handcrafted_haven.users(id) ON DELETE SET NULL,
      rating INT CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Crea la tabla de tags
  await client.query(`
    CREATE TABLE IF NOT EXISTS handcrafted_haven.tags (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );
  `);

  // Relación muchos a muchos: products <-> tags
  await client.query(`
    CREATE TABLE IF NOT EXISTS handcrafted_haven.product_tags (
      product_id INT REFERENCES handcrafted_haven.products(id) ON DELETE CASCADE,
      tag_id INT REFERENCES handcrafted_haven.tags(id) ON DELETE CASCADE,
      PRIMARY KEY (product_id, tag_id)
    );
  `);

  // Crea la tabla de materiales
  await client.query(`
    CREATE TABLE IF NOT EXISTS handcrafted_haven.materials (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );
  `);

  // Relación muchos a muchos: products <-> materials
  await client.query(`
    CREATE TABLE IF NOT EXISTS handcrafted_haven.product_materials (
      product_id INT REFERENCES handcrafted_haven.products(id) ON DELETE CASCADE,
      material_id INT REFERENCES handcrafted_haven.materials(id) ON DELETE CASCADE,
      PRIMARY KEY (product_id, material_id)
    );
  `);

  // Crea la tabla de dimensiones
  await client.query(`
    CREATE TABLE IF NOT EXISTS handcrafted_haven.product_dimensions (
      product_id INT PRIMARY KEY REFERENCES handcrafted_haven.products(id) ON DELETE CASCADE,
      width NUMERIC(6,2),
      height NUMERIC(6,2),
      depth NUMERIC(6,2)
    );
  `);

  await client.end();
  return NextResponse.json({ ok: true, message: "Tablas creadas correctamente en handcrafted_haven" });
}
