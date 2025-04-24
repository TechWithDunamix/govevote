import { NextResponse } from "next/server"

const API_HOST = process.env.EXTERNAL_API_HOST || "http://localhost:5400"

export async function GET(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Forward the request to external API
    const res = await fetch(`${API_HOST}/api/admins/voters`, {
      headers: {
        Authorization: authHeader,
      },
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error("Error fetching voters:", error)
    return NextResponse.json({ error: "Failed to fetch voters" }, { status: 500 })
  }
}
