import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json({
        version: "1.0.0",
        description: "API version 1.0.0",
        timestamp: new Date().toISOString()
    });
}