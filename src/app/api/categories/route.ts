import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://newspapercms.mariosanchez.store/api/categories?limit=0'
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
