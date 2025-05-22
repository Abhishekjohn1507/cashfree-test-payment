import React, { Suspense } from 'react';
import PaymentPage from './_components/PaymentClientComponent';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading payment details...</p>}>
        <PaymentPage />
      </Suspense>
    </div>
  );
}
