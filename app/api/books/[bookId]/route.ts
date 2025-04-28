import { NextResponse } from 'next/server';
import { getBookData } from '@/app/lib/book';

export async function GET(request: Request, { params }: { params: { bookId: string } }) {
  try {
    const bookId = decodeURIComponent(params.bookId);
    const book = await getBookData(bookId);

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'Failed to fetch book data' }, { status: 500 });
  }
}
