import { NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const adminNumbers = [
  '+12012181047',
  '+17727421283',
];

export async function POST(req) {
  const formData = await req.formData();

  const recordingUrl = formData.get('RecordingUrl');
  const caller = formData.get('From');
  const timestamp = new Date().toISOString();

  const message = `New voicemail from ${caller}:\n${recordingUrl}.mp3`;

  const results = await Promise.allSettled(
    adminNumbers.map((to) =>
      client.messages.create({
        body: message,
        from: fromNumber,
        to,
      })
    )
  );

  return NextResponse.json({
    status: 'received',
    recordingUrl,
    smsSuccess: results.filter(r => r.status === 'fulfilled').length,
    smsFail: results.filter(r => r.status === 'rejected').length,
  });
}
