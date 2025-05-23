import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { orderId } = await request.json();

  try {
    const res = await axios.get(`https://sandbox.cashfree.com/pg/orders/${orderId}`, {
      headers: {
         'x-client-id': process.env.CASHFREE_SANDBOX_APP_ID,
        'x-client-secret': process.env.CASHFREE_SANDBOX_SECRET_KEY,
        'x-api-version': '2023-08-01',
      }
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Error from Cashfree API:', error?.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to verify payment', details: error?.response?.data || error.message },
      { status: 500 }
    );
  }
}
