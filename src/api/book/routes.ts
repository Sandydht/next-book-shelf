export async function POST(request: Request) {
  const body = await request.json();
  const { title } = body;

  const newBook = {
    id: new Date(),
    title
  }

  return new Response(JSON.stringify(newBook), {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}