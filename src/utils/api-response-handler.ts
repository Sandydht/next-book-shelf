import { NextResponse } from "next/server"

export const badRequest = (data: any) => {
  return NextResponse.json({ ...data }, {
    status: 400,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const notFound = (data: any) => {
  return NextResponse.json({ ...data }, {
    status: 404,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const successHandler = (data: any) => {
  return NextResponse.json({ ...data }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const createdHandler = (data: any) => {
  return NextResponse.json({ ...data }, {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}