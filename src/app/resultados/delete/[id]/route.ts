import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultados/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Basic ' + Buffer.from('admin:admin123').toString('base64'),
    },
  });

  return NextResponse.redirect(new URL('/resultados', req.nextUrl));
}
