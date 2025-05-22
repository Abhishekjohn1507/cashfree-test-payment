
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get('order_id');
  const paymentStatus = searchParams.get('payment_status');
  const userId = searchParams.get('uid');
  const credits = searchParams.get('credits');

  useEffect(() => {
    if (paymentStatus === 'CANCELLED') {
      // Redirect back to billing page or show a message
      alert('Payment was cancelled. You were not charged.');
      router.push('/');
    } else if (paymentStatus === 'SUCCESS') {
      // Handle success - maybe credit the user here
      alert('Payment successful! Credits will be added.');
      router.push('/payment');  // Redirect to a dedicated success page
    } else if (paymentStatus === 'FAILED') {
      alert('Payment failed. Please try again.');
      router.push('/');
    }
  }, [paymentStatus]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Processing Payment...</h1>
      <p>Order ID: {orderId}</p>
      <p>Status: {paymentStatus}</p>
    </div>
  );
}
