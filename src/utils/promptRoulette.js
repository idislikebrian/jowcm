export const PROMPT_ROULETTE = [
  "If you had to fight one hundred duck-sized horses or one big-ass horse-sized duck, which would you take down first and why?",
  "If animals could talk, which one do you think would be the rudest little shit and why?",
  "You’ve been hired to rebrand Hell. What’s the first thing you’d change to make it less (or more)... Hell?",
  "If you could steal one damn thing without ever getting caught, what the hell would it be, and how would you use it?",
  "If your life had a soundtrack, which badass song would play during your most chaotic moments?",
  "Would you rather time travel to the past and be a legendary badass, or to the future where nobody knows who the f*** you are?",
  "You just won a lifetime supply of something, but it’s completely f***ing useless. What is it?",
  "If you could erase one moment from history, but some equally wild-ass chaos would replace it, what would you get rid of?",
  "If you were an ice cream flavor, what flavor would you be and why would people be too scared to try it?",
  "What’s the weirdest conspiracy theory you’ve heard that made you go, 'Damn, maybe these crazy f***ers are onto something'?",
  "If you had to swap lives with a fictional character, but only for their worst f***ing day, who would it be?",
  "Would you rather speak every language or communicate with animals, but only the annoying little bastards?",
  "You get the power to create a new law that everyone must follow—what’s the most ridiculous law you’d make just to f*** with people?",
  "If you could trade places with a historical figure for a day, who would it be, and what kind of glorious chaos would you start?",
  "What’s the most insane 'what if' scenario that’s kept you up at night like, 'Oh hell no, that would be wild'?",
  "If you had to live in any TV show universe, which one would it be and how the hell would you survive?",
  "Would you rather have a rewind button for life or a pause button, and what would you use it on to stop some serious bullsh**?",
  "If you could start a secret society, what the hell would its purpose be, and what kind of crazy initiation would you have?",
  "If you could only wear one outfit for the rest of your life, what would it be, and why does it scream 'I don’t give a damn'?",
  "If you had an unlimited budget to make the most unnecessary invention ever, what the f*** would it be?",
  "What’s the weirdest thing you’ve Googled at 3 a.m. when you couldn’t sleep, and don’t lie—‘cause it was weird as hell?",
  "If you could add one pointless-ass skill to your resume just for kicks, what would it be?",
  "What’s your most 'this could only happen to me' moment that made you go, 'You’ve gotta be f***ing kidding me'?",
  "If you were given $1,000,000 but had to spend it in one hour, how the hell would you blow it?",
  "What’s the craziest dare you’ve ever accepted that made you immediately think, 'Oh sh**, what did I just agree to?'",
];

export function spinPromptRoulette() {
  return PROMPT_ROULETTE[
    Math.floor(Math.random() * PROMPT_ROULETTE.length)
  ];
}
