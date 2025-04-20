/* eslint-disable @typescript-eslint/no-explicit-any */
// app/equipos/delete/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, context: any) {
  const id = context.params.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Basic ' + Buffer.from('admin:admin123').toString('base64'),
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Error al eliminar equipo' }, { status: 500 });
  }

  return NextResponse.redirect(new URL('/equipos', req.nextUrl));
}