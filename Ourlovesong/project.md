# OurLoveSong.co

A custom song platform that creates personalized songs for any occasion—weddings, birthdays, anniversaries, memorials, and more. Built with faith and love to honor relationships through music.

## Inspiration

Inspired by [PrayerSong.com](https://prayersong.com/), OurLoveSong.co brings the gift of personalized music to everyone. While PrayerSong focuses on Christian themes, OurLoveSong celebrates all love stories—romantic partnerships, family bonds, friendships, and personal milestones.

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (not needed)
- **Storage**: Supabase Storage (for audio files)
- **Edge Functions**: Supabase Functions (Deno)

### Payments
- **Processor**: Stripe
- **Webhooks**: Stripe Webhooks via Supabase Functions

## Core Features

### Customer-Facing
- [ ] Landing page with examples and testimonials
- [ ] Song creation survey (multi-step form)
- [ ] Stripe checkout integration
- [ ] Email delivery of finished song / 5 day delivery
- [ ] Order tracking dashboard
- [ ] Share functionality for social media
- [ ] addons for fast delivery for 150€

### Admin-Facing
- [ ] Order management dashboard
- [ ] Survey response viewer
- [ ] Audio file upload system
- [ ] Customer communication tools
- [ ] Analytics overview

## Database Schema

### Tables

```sql
-- Customers (optional, for repeat orders)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  status TEXT NOT NULL DEFAULT 'pending',
  -- Survey data (JSON for flexibility)
  survey_responses JSONB NOT NULL,
  -- Payment
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  amount_cents INTEGER NOT NULL DEFAULT 0,
  -- Delivery
  delivery_email TEXT NOT NULL,
  priority_tier TEXT DEFAULT 'standard', -- 'standard' | 'rush'
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE
);

-- Order Status Enum
-- pending → paid → in_progress → review → completed → delivered

-- Song Files
CREATE TABLE song_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  file_path TEXT NOT NULL,
  file_size_bytes INTEGER,
  mime_type TEXT,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Log (for tracking delivery)
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  email_type TEXT NOT NULL, -- 'confirmation' | 'progress_update' | 'delivery'
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'sent' -- 'sent' | 'failed'
);

-- Reviews/Testimonials (public)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  customer_name TEXT NOT NULL,
  song_title TEXT,
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
-- Orders: customers can view their own, admins view all
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own orders"
  ON orders FOR SELECT
  USING (customer_id = auth.uid() OR auth.jwt() ->> 'email' = 'admin@ourlovesong.co');

-- Only service role can insert/update orders
CREATE POLICY "Service role can manage orders"
  ON orders FOR ALL
  USING (auth.role() = 'service_role');
```

## Workflow

### Customer Flow

```
1. Landing Page
   → Browse examples, read testimonials
   → Click "Create Your Song"

2. Survey Form (Multi-step)
   Step 1: Recipient & Relationship
   Step 2: Occasion & Timing
   Step 3: Story & Memories (free text)
   Step 4: Musical Preferences (style, tempo, mood)
   Step 5: Delivery Details (email, urgency)

3. Preview & Checkout
   → Generate preview (AI-assisted or placeholder)
   → Display pricing ($XX base + $XX rush option)
   → Proceed to Stripe Checkout

4. Confirmation
   → Payment success webhook triggers:
      - Order status → 'paid'
      - Send confirmation email
      - Notify admin (Slack/discord/email)

5. Creation Process (Internal)
   → Admin views survey responses
   → Lyricist creates custom lyrics
   → Producer creates final track
   → Upload to Supabase Storage
   → Update order status

6. Delivery
   → Send email with secure playback link
   → Update order status → 'delivered'
```

### Admin Flow

```
1. Receive notification of new paid order
2. Review survey responses in dashboard
3. Create custom song (manual or assisted)
4. Upload final audio file
5. Mark order complete
6. Customer receives email automatically
```

## API Routes

### Public
- `GET /api/songs/preview` — Generate short preview clip
- `GET /api/testimonials` — Fetch approved reviews

### Protected (Admin)
- `GET /api/admin/orders` — List all orders (with filters)
- `GET /api/admin/orders/:id` — Order details + survey
- `PATCH /api/admin/orders/:id/status` — Update status
- `POST /api/admin/orders/:id/deliver` — Trigger delivery email

### Webhooks
- `POST /api/webhooks/stripe` — Handle payment events

## Email Templates

1. **Order Confirmation** — "Your song journey begins!"
2. **In Progress Update** — "Your song is being crafted with love"
3. **Delivery Email** — "Your custom song is ready!"
4. **Review Request** — "Would you like to share your experience?"

## Success Metrics

- Conversion rate (survey → checkout)
- Average order value
- Delivery time (standard vs rush)
- Customer satisfaction (review ratings)
- Repeat customer rate

## Phases

### Phase 1: MVP
- [ ] Landing page
- [ ] Survey form
- [ ] Stripe checkout
- [ ] Admin order viewing
- [ ] Manual song creation + delivery
- [ ] Email notifications

### Phase 2: Polish
- [ ] Order tracking dashboard
- [ ] Improved preview generation
- [ ] Analytics dashboard
- [ ] Automated review requests
- [ ] SEO optimization

### Phase 3: Scale
- [ ] Multiple creator accounts
- [ ] Queue management
- [ ] AI-assisted lyrics/music
- [ ] Mobile app
- [ ] API for partners

## Team (Future)

- **Lyricists** — Write custom lyrics based on surveys
- **Producers** — Create final audio tracks
- **QC** — Quality check before delivery
- **Support** — Handle customer inquiries

## Costs (Monthly)

| Service | Free Tier | Paid (Growth) |
|---------|-----------|---------------|
| Vercel | $0 | ~$20 |
| Supabase | $0 | ~$25 |
| Stripe | 2.9% + $0.30 | 2.9% + $0.30 |
| Email (Resend/SendGrid) | ~$0 | ~$20 |
| **Total** | **~$0** | **~$65** |

## Key Differentiators

1. **Universal Appeal** — Celebrates all love, not just religious
2. **Fast Turnaround** — Standard 7 days, rush 24 hours
3. **Radio Quality** — Professional production values
4. **Personal Touch** — Human-crafted, not fully AI
5. **Secure Delivery** — Private share links, not public

## Competition

- PrayerSong.com — Christian focus
- Songly — AI-focused, lower quality
- Custom song services — Expensive, slow

## Unique Value Proposition

> "A radio-quality, custom song crafted with love in 7 days—delivered to your inbox."

## Next Steps

1. [ ] Set up Supabase project + tables
2. [ ] Initialize Next.js project with Tailwind
3. [ ] Create landing page components
4. [ ] Build multi-step survey form
5. [ ] Integrate Stripe checkout
6. [ ] Set up webhook handler
7. [ ] Build admin dashboard
8. [ ] Test end-to-end flow
9. [ ] Launch beta
10. [ ] Iterate based on feedback



