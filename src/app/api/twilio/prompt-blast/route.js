import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const subscribers = [
  '+18057010195',
  '+12078314915',
  '+15127855748',
];

const unsubs = [
  '+12019379638',
  '+14012612865',
];

export async function POST(req) {
  const body = await req.json();
  const { message } = body;

  const activeSubscribers = subscribers.filter((num) => !unsubs.includes(num));

  const results = await Promise.allSettled(
    activeSubscribers.map((to) =>
      client.messages.create({ body: message, from: fromNumber, to })
    )
  );

  return NextResponse.json({
    sentTo: activeSubscribers.length,
    successCount: results.filter(r => r.status === 'fulfilled').length,
    errorCount: results.filter(r => r.status === 'rejected').length,
  });
}
