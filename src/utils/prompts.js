export const PROMPT_CYCLE = [
  "When the beep hits, describe the last thing you saw on your feed today, then keep talking.",
  "Say a phrase you’ve heard too much this week, then don’t explain it.",
  "Start by talking about something you keep almost clicking on.",
  "Say the name of something everyone seems to be watching or sharing.",
  "Describe how this week feels so far. No backstory.",
  "Start by describing the last ad you remember seeing today.",
  "Talk about something you’ve been scrolling past on purpose.",
  "Say something you’ve seen repeated everywhere lately.",
  "Describe your energy level right now without explaining why.",
  "Repeat a phrase you don’t fully believe anymore.",
  "Start by saying what you wish you were paying more attention to.",
  "Talk until you forget what you were originally going to say.",
];

export function getISOWeek(date = new Date()) {
  const temp = new Date(date.valueOf());
  const dayNum = (date.getUTCDay() + 6) % 7;
  temp.setUTCDate(temp.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(temp.getUTCFullYear(), 0, 4));
  return 1 + Math.round(((temp - firstThursday) / 86400000 - 3) / 7);
}

export function getCurrentPrompt() {
  const index = getISOWeek() % PROMPT_CYCLE.length;
  return PROMPT_CYCLE[index];
}
