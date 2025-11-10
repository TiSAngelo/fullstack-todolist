import { NextResponse } from 'next/server';

const todoListApi = process.env.NEXT_PUBLIC_TODO_LIST_API_URL;

export async function GET() {
    const response = await fetch(`${todoListApi}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const responseData = await response.json();
    return NextResponse.json(responseData, {status: response.status});
}