// billing/page.jsx (No changes needed here for the immediate issue, but including for context)
'use client';

import React from 'react';
import CashfreeButton from './_components/CashfreeCheckoutButton';

// Hardcoded user for sandbox testing
const user = {
  id: 'u7832283',
  name: 'John',
  email: 'abhishekjohn@gmail.com',
  phone: '8840029225', // Added phone number for Cashfree customer_details
};

export const creditPlans = [
  { id: 1, name: 'Basic', price: 1, credits: 10, description: 'Basic plan with 10 credits', icon: '🔹' },
  { id: 2, name: 'Standard', price: 150, credits: 50, description: 'Standard plan with 50 credits', icon: '🔸' },
  { id: 3, name: 'Premium', price: 400, credits: 100, description: 'Premium plan with 100 credits', icon: '⭐' },
  { id: 4, name: 'Premium +', price: 1000, credits: 200, description: 'Professional plan with 200 credits', icon: '🚀' },
  { id: 5, name: 'Enterprise', price: 2000, credits: 500, description: 'Enterprise plan with 500 credits', icon: '🏢' },
  { id: 6, name: 'Ultimate', price: 4500, credits: 1000, description: 'Ultimate plan with 1000 credits', icon: '💎' },
  { id: 7, name: 'Custom', price: 8000, credits: 2000, description: 'Custom plan with 2000 credits', icon: '🛠️' },
  { id: 8, name: 'Pro', price: 16000, credits: 5000, description: 'Pro plan with 5000 credits', icon: '👑' },
];

function Billing() {
  return (
    <div>
      <h2 className="font-bold text-3xl">Credits</h2>

      <div className="p-4 border rounded-xl flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl">Total Credits</h2>
          <p className="text-sm">1 credit = 1 Generation</p>
        </div>
        <h2 className="font-bold text-3xl"> credits</h2> {/* You'll need to fetch and display the actual credit balance here */}
      </div>

      <p className="text-sm mt-3 text-gray-500 max-w-2xl">
        When your credit balance reaches 0, your video generation will stop working. Add more credits to continue.
      </p>

      <div>
        <h2 className="font-bold text-xl mt-6">Credit Plans</h2>

        <div className="grid grid-cols-1 gap-4 mt-4">
          {creditPlans.map((plan) => (
            <div key={plan.id} className="p-4 border rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{plan.icon}</span>
                <div>
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                  <p className="text-sm">{plan.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <h4 className="font-bold text-2xl">
                  ₹{plan.price} <span className="text-sm font-normal">for {plan.credits} credits</span>
                </h4>
                <CashfreeButton plan={plan} user={user} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Billing;