'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const credits = searchParams.get('credits');

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your payment.</p>
      {uid && <p>User ID: {uid}</p>}
      {credits && <p>Credits Purchased: {credits}</p>}
    </div>
  );
}

export default PaymentSuccessPage;
