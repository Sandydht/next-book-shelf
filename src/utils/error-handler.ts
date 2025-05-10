import { NextResponse } from "next/server"

export const badRequest = (data: any) => {
  return NextResponse.json({ ...data }, {
    status: 400,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}