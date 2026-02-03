import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recipientName,
      relationship,
      backgroundId,
      cardMessage,
      instantDelivery,
    } = body;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Custom Virtual Date Space',
          },
          unit_amount: 1699,
        },
        quantity: 1,
      },
    ];

    if (instantDelivery) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Instant Delivery',
            description: 'Skip the ~2 hour wait — get your date space immediately',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      metadata: {
        recipientName: recipientName || '',
        relationship: relationship || '',
        backgroundId: backgroundId || '',
        cardMessage: (cardMessage || '').slice(0, 500),
        priority_tier: instantDelivery ? 'instant' : 'standard',
      },
      success_url: `${baseUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/order/survey`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
