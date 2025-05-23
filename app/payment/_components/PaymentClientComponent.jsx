'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PaymentClientComponent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const verifyPayment = async () => {
      try {
        const response = await axios.post('/api/verify-order', { orderId });
        const data = response.data;

        console.log('Full Payment Response:', data);

        const status = data?.order_status;
        setStatusText(status);
        setOrderDetails(data); // Store the whole order

      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatusText('⚠️ Error checking payment status.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [orderId]);

  const renderStatusMessage = (status) => {
    switch (status) {
      case 'PAID':
        return '✅ Payment successful! Credits will be added.';
      case 'ACTIVE':
        return '🕒 Payment pending...';
      case 'FAILED':
      case 'EXPIRED':
        return '❌ Payment failed or expired.';
      default:
        return `❓ Unknown status: ${status || 'No status returned'}`;
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center border rounded-xl shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
      {loading ? (
        <p>⏳ Checking...</p>
      ) : (
        <>
          <p className="mb-4">{renderStatusMessage(statusText)}</p>
          
          {orderDetails && (
            <div className="text-left text-sm bg-gray-50 p-4 rounded">
              <p><strong>Order ID:</strong> {orderDetails.cf_order_id}</p>
              <p><strong>Status:</strong> {orderDetails.order_status}</p>
              <p><strong>Created At:</strong> {new Date(orderDetails.created_at).toLocaleString()}</p>
              
              {orderDetails.customer_details && (
                <>
                  <p><strong>Customer Name:</strong> {orderDetails.customer_details.customer_name}</p>
                  <p><strong>Email:</strong> {orderDetails.customer_details.customer_email}</p>
                  <p><strong>Phone:</strong> {orderDetails.customer_details.customer_phone}</p>
                </>
              )}
            </div>
          )}
        </>
      )}
      <div>
        <Button asChild>
  <Link href="/">Back to Home</Link>
</Button>
      </div>
    </div>
  );
}
