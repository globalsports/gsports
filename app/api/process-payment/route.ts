import { NextResponse } from "next/server";
import { Client, Environment } from "square";

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

// Helper function to convert BigInt to string in nested objects
function convertBigIntToString(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'bigint') {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }

  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = convertBigIntToString(obj[key]);
    }
    return newObj;
  }

  return obj;
}

export async function POST(request: Request) {
  try {
    const { sourceId, amount, slots } = await request.json();
    
    const amountMoney = {
      amount: BigInt(Math.round(amount * 100)),
      currency: 'AUD',
    };

    // Create payment with Square API in AUD
    const payment = await client.paymentsApi.createPayment({
      sourceId,
      amountMoney,
      idempotencyKey: `${Date.now()}-${Math.random().toString(36).substring(2)}`,
      note: `Booking for ${slots.map((s: { court: string; time: string }) => `${s.court} at ${s.time}`).join(', ')}`,
    });

    // Convert the payment result to a serializable object
    const paymentResponse = convertBigIntToString(payment.result);
    console.log('Payment created:', paymentResponse);
    return NextResponse.json({ 
      success: true, 
      payment: paymentResponse 
    });

  } catch (error: unknown) {
    console.error('Payment processing failed:', error);

    const errorDetail = (error as any).body?.errors?.[0]?.detail || 'Payment processing failed';
    const errorCode = (error as any).body?.errors?.[0]?.code;

    let userMessage = 'Payment processing failed.';
    if (errorCode === 'CARD_DECLINED_VERIFICATION_REQUIRED') {
      userMessage = 'Your card was declined due to verification requirements. Please try another card or contact your bank.';
    }

    return NextResponse.json(
      { success: false, error: userMessage, detail: errorDetail },
      { status: 500 }
    );
  }
}