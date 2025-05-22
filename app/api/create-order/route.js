import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      order_amount,
      order_id,
      customer_details,
      return_url,
      user_id,
      credits,
    } = body;

    // Validate required fields
    if (
      !order_amount ||
      !order_id ||
      !customer_details?.customer_email ||
      !customer_details?.customer_id
    ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const orderData = {
      order_amount,
      order_currency: 'INR',
      order_id,
      customer_details,
      order_meta: {
        return_url:
          return_url ||
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment?uid=${user_id}&credits=${credits}`,
        notify_url: 'https://webhook.site/your-webhook-url', // Replace with your actual webhook URL
      },
    };

    // Log the order data for debugging
    console.log('Sending to Cashfree:', JSON.stringify(orderData, null, 2));

    const response = await fetch('https://sandbox.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_SANDBOX_APP_ID,
        'x-client-secret': process.env.CASHFREE_SANDBOX_SECRET_KEY,
        'x-api-version': '2023-08-01',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    // Log the response from Cashfree for debugging
    console.log('Received from Cashfree:', JSON.stringify(data, null, 2));

    if (!data.payment_session_id) {
      console.error('Cashfree response missing payment_session_id:', data);
      return NextResponse.json(
        { message: 'Cashfree API error', details: data },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
