import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SquarePaymentProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSuccess: () => void;
  selectedSlots: { court: string; time: string; cost: number }[];
}

declare global {
  interface Window {
    Square: any;
  }
}

export function SquarePayment({
  isOpen,
  onClose,
  amount,
  onPaymentSuccess,
  selectedSlots,
}: SquarePaymentProps) {
  const [paymentForm, setPaymentForm] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const script = document.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.onload = initializePaymentForm;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isOpen]);

  const initializePaymentForm = async () => {
    if (!window.Square) return;

    try {
      const payments = window.Square.payments(process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID, process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID);
      const card = await payments.card();
      await card.attach('#card-container');

      setPaymentForm(card);
    } catch (e) {
      console.error('Failed to initialize Square payment form:', e);
    }
  };

  const handlePaymentSubmit = async () => {
      if (!paymentForm) return;
      console.log('Payment form initialized');
    setIsLoading(true);
    try {
      const result = await paymentForm.tokenize();
      if (result.status === 'OK') {
        // Send the token to your server to complete the payment
        const response = await fetch('/api/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount,
            slots: selectedSlots,
          }),
        });

        const data = await response.json();
        if (data.success) {
          onPaymentSuccess();
          onClose();
        } else {
          throw new Error(data.error);
        }
      }
    } catch (e) {
      console.error('Payment failed:', e);
      // Handle payment error (show error message to user)
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            {selectedSlots.map((slot, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{`${slot.court} - ${slot.time}`}</span>
                <span>${slot.cost}</span>
              </div>
            ))}
            <div className="mt-2 pt-2 border-t flex justify-between font-bold">
              <span>Total</span>
              <span>${amount}</span>
            </div>
          </Card>

          <div className="space-y-4">
            <div id="card-container" className="min-h-[100px] border rounded p-4"></div>
            <Button
              onClick={handlePaymentSubmit}
              disabled={isLoading}
              className="w-full bg-teal-500 hover:bg-teal-700"
            >
              {isLoading ? "Processing..." : `Pay $${amount}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}