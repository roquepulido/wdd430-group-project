import { NextRequest, NextResponse } from "next/server";
import { del, put } from '@vercel/blob';

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const url = searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'No url provided' }, { status: 400 });
  try {
    await del(url);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Error deleting blob' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const filename = searchParams.get('filename');
  if (!filename) return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
  const blob = await req.blob();
  if (!blob) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  try {
    const uploaded = await put(filename, blob, { access: 'public' });
    return NextResponse.json({ url: uploaded.url });
  } catch (err) {
    return NextResponse.json({ error: 'Error uploading blob' }, { status: 500 });
  }
}
