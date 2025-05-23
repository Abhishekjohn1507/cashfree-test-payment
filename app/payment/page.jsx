// app/payment/page.jsx
'use client';

import dynamic from 'next/dynamic';

const PaymentClientComponent = dynamic(() => import('./_components/PaymentClientComponent'), {
  ssr: false, // Client-side only
});

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <PaymentClientComponent />
    </div>
  );
}
