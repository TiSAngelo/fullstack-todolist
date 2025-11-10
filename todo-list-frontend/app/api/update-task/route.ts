import { NextResponse, NextRequest } from 'next/server';

const todoListApi = process.env.NEXT_PUBLIC_TODO_LIST_API_URL;;

export async function POST(req: NextRequest) {
    const requestBody = await req.json();
    const body = {
        typeId: requestBody.typeId,
        name: requestBody.name,
        description: requestBody.description
    }

    const response = await fetch(`${todoListApi}/${requestBody.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const responseData = await response.json();

    return NextResponse.json({
        response: responseData
    }, {
        status: response.status
    });
}