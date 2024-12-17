import React from "react";

type Props = {};

const Method = (props: Props) => {
  return (
    <div className="px-5 md:px-0 mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
      <div className="p-5 rounded-3xl border border-border space-y-2">
        <h1 className="text-lg font-semibold">List Your Court for FREE</h1>
        <div>
          With our platform, you can list your sports court or turf quickly and easily, 
          and it's completely free. No upfront costs or hidden fees.
        </div>
      </div>
      <div className="p-5 rounded-3xl border border-border space-y-2">
        <h1 className="text-lg font-semibold">Manage Your Schedule</h1>
        <div>
          You're in control. Set your own availability and rental rates. Host players 
          when it works best for you and maximize your court's utilization.
        </div>
      </div>
      <div className="p-5 rounded-3xl border border-border space-y-2">
        <h1 className="text-lg font-semibold">Get Paid Securely</h1>
        <div>
          Receive your earnings promptly through secure weekly payouts. Renting out your 
          court has never been simpler or more rewarding.
        </div>
      </div>
    </div>
  );
};

export default Method;
