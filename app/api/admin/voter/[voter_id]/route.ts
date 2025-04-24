import { NextResponse } from "next/server"

const API_HOST = process.env.EXTERNAL_API_HOST || "http://localhost:5400"

export async function GET(request: Request, { params }: { params: { voter_id: string } }) {
  try {
    const { voter_id } = params
    const authHeader = request.headers.get("authorization")

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const res = await fetch(`${API_HOST}/api/voters/${voter_id}`, {
      headers: {
        Authorization: authHeader,
      },
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error("Error fetching voter:", error)
    return NextResponse.json({ error: "Failed to fetch voter" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { voter_id: string } }) {
  try {
    const { voter_id } = params
    const authHeader = request.headers.get("authorization")

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const res = await fetch(`${API_HOST}/api/admins/voter/${voter_id}`, {
      method: "PUT",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error("Error updating voter:", error)
    return NextResponse.json({ error: "Failed to update voter" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { voter_id: string } }) {
  try {
    const { voter_id } = params
    const authHeader = request.headers.get("authorization")

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const res = await fetch(`${API_HOST}/api/admins/voter/${voter_id}`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader,
      },
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error("Error deleting voter:", error)
    return NextResponse.json({ error: "Failed to delete voter" }, { status: 500 })
  }
}
