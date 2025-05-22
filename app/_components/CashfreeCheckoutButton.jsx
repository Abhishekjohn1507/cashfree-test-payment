'use client';

import { Button } from '@/components/ui/button';
import { load } from '@cashfreepayments/cashfree-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CashfreeButton = ({ plan, user }) => {
  const [cashfree, setCashfree] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const cf = await load({ mode: 'sandbox' });
        setCashfree(cf);
        console.log('✅ Cashfree Sandbox SDK loaded');
      } catch (err) {
        console.error('❌ Cashfree SDK Load Error:', err);
      }
    };

    initializeSDK();
  }, []);

  const initiatePayment = async () => {
    if (!cashfree) {
      alert('Cashfree SDK not ready yet. Please wait...');
      return;
    }

    setIsProcessing(true);
    const orderId = `order_${Date.now()}`;

    try {
      const res = await axios.post('/api/create-order', {
        order_amount: plan.price,
        order_id: orderId,
        customer_details: {
          customer_id: user.id || 'guest_user',
          customer_email: user.email || 'guest@example.com',
          customer_phone: user.phone || '9999999999',
          customer_name: user.name || 'Guest User',
        },
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment?order_id=${orderId}&uid=${user.id}&credits=${plan.credits}`,
      });

      const sessionId = res?.data?.payment_session_id;

      if (sessionId) {
        await cashfree.checkout({
          paymentSessionId: sessionId,
          redirectTarget: '_blank',
        });
      } else {
        throw new Error('Missing payment_session_id in response from your API');
      }
    } catch (err) {
      console.error('❌ Payment Error:', err);
      alert('Could not initiate payment session. Check console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={initiatePayment}
      disabled={!cashfree || isProcessing}
      className="px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isProcessing ? 'Processing...' : `Buy ${plan.name}`}
    </Button>
  );
};

export default CashfreeButton;
