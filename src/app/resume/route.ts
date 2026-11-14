import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'Rishaan_Kumar_CV.pdf');
    if (!fs.existsSync(filePath)) {
      return new NextResponse('CV file not found on server', { status: 404 });
    }
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Rishaan_Kumar_CV.pdf"',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return new NextResponse('Internal error loading resume', { status: 500 });
  }
}
