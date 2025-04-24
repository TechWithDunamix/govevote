import { NextResponse } from "next/server"

const API_HOST = process.env.EXTERNAL_API_HOST || "http://localhost:5400"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Check for required fields
    if (!body.username || !body.password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Forward the request to the external login API
    const res = await fetch(`${API_HOST}/api/admins/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Forward the login data to the external API
    })

    const data = await res.json()

    // Handle potential errors from the external API
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    // Return the response from the external API
    return NextResponse.json(data)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
