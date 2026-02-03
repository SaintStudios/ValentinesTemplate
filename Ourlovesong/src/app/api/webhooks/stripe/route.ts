import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log('Payment completed:', {
      sessionId: session.id,
      customerEmail: session.customer_details?.email,
      amountTotal: session.amount_total,
      currency: session.currency,
      metadata: session.metadata,
    });

    // TODO: Insert order into Supabase when DB is integrated
    // const { recipientName, relationship, backgroundId, cardMessage, priority_tier } = session.metadata || {};
    // await supabase.from('orders').insert({
    //   stripe_session_id: session.id,
    //   customer_email: session.customer_details?.email,
    //   recipient_name: recipientName,
    //   relationship,
    //   background_id: backgroundId,
    //   card_message: cardMessage,
    //   priority_tier,
    //   amount_total: session.amount_total,
    //   currency: session.currency,
    //   status: 'paid',
    // });
  }

  return NextResponse.json({ received: true });
}
