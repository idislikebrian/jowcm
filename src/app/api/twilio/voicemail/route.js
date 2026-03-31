import { twiml } from 'twilio';

export async function POST() {
  const response = new twiml.VoiceResponse();

  response.play('https://yourdomain.com/media/voicemail-prompt.mp3'); // replace with your actual file URL

  response.record({
    maxLength: 180,
    action: '/api/twilio/route-recording',
    method: 'POST',
    transcribe: false,
    trim: 'do-not-trim',
  });

  response.hangup();

  return new Response(response.toString(), {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  });
}
