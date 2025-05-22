import React, { Suspense } from 'react';
import PaymentClientComponent from './PaymentClientComponent';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading payment details...</p>}>
        <PaymentClientComponent />
      </Suspense>
    </div>
  );
}
