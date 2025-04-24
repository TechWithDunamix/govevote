import { NextResponse } from "next/server"

const API_HOST = process.env.EXTERNAL_API_HOST || "http://localhost:5400"

export async function POST(request: Request) {
  try {
    const body = await request.json()

   

    const externalRes = await fetch(`${API_HOST}/api/voters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await externalRes.json()

    return NextResponse.json(data, { status: externalRes.status })
  } catch (error) {
    console.error("Proxy login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
