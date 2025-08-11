import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json({
        version: "1.0.1",
        description: "API version 1.0.1 of Handcrafted Haven",
        timestamp: new Date().toISOString()
    });
}