import { Task } from '@/app/types/task';
import { NextResponse } from 'next/server';

const todoListApi = process.env.NEXT_PUBLIC_TODO_LIST_API_URL;

export async function GET() {
    const response = await fetch(`${todoListApi}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let responseData: Task[] | [] = []
    if(response.ok) {
        responseData = await response.json();
    } else {
        responseData = []
    }
    return NextResponse.json(responseData, {status: response.status});
}