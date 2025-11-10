import { NextResponse, NextRequest } from 'next/server';

const todoListApi = process.env.NEXT_PUBLIC_TODO_LIST_API_URL;;

export async function POST(req: NextRequest) {
    const requestBody = await req.json();

    const response = await fetch(`${todoListApi}/${requestBody.taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return NextResponse.json(response.status);
}