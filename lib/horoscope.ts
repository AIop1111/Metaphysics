export type ZodiacId = "aries" | "taurus" | "gemini" | "cancer" | "leo" | "virgo" | "libra" | "scorpio" | "sagittarius" | "capricorn" | "aquarius" | "pisces";
export type Bilingual = readonly [string, string];
export type ZodiacSign = {
  id: ZodiacId;
  name: Bilingual;
  glyph: string;
  dates: Bilingual;
  element: Bilingual;
  overall: Bilingual;
  work: Bilingual;
  relationships: Bilingual;
  money: Bilingual;
  reminder: Bilingual;
};

// Conventional tropical sun-sign date ranges, not a birth-chart calculator.
// Date references: horoscope.com/horoscope-dates/ and
// cafeastrology.com/articles/signsofthezodiac.html (boundary-date caveat).
// All readings below are original entertainment copy; no live ephemeris is used.
export const ZODIAC_SIGNS: readonly ZodiacSign[] = [
  {
    id: "aries", name: ["白羊座", "Aries"], glyph: "♈", dates: ["3.21–4.19", "Mar 21–Apr 19"], element: ["火象", "Fire"],
    overall: ["白羊座，今天的关键词是把热情用在合适的地方。与其一口气接下所有事情，不如选一件真正想推进的事，把第一步做扎实。", "Aries, channel your enthusiasm into something that matters. Choose one thing you genuinely want to move forward, and give its first step your full attention."],
    work: ["主动表达想法会比等待更有帮助。开始之前，确认目标和分工，让速度与方向一起向前。", "Taking initiative can help. Before you begin, clarify the goal and who is doing what so that your energy has a direction."],
    relationships: ["直率可以很温暖。表达自己的感受时，也给对方留一点把话说完的时间。", "Directness can be warm. Share how you feel, and give the other person room to finish their thoughts."],
    money: ["把“想要”和“今天必须买”分开。新鲜感很吸引人，实际用途也值得多看一眼。", "Separate something you want from something you need to buy today. Look beyond novelty to how you will actually use it."],
    reminder: ["把开始的勇气，也分一点给耐心。", "Bring a little patience along with your courage to begin."],
  },
  {
    id: "taurus", name: ["金牛座", "Taurus"], glyph: "♉", dates: ["4.20–5.20", "Apr 20–May 20"], element: ["土象", "Earth"],
    overall: ["金牛座，今天适合找到舒服而可靠的节奏。熟悉的事情能给你支撑，也可以为一个小变化留位置，让日常多一点新鲜感。", "Taurus, find a rhythm that feels comfortable and dependable. Familiar routines can support you while leaving space for one small change."],
    work: ["稳定的推进比临时冲刺更适合今天的主题。先完成已有任务，再评估新的安排。", "Steady progress suits today’s theme. Finish a task already underway before evaluating a new commitment."],
    relationships: ["关心不一定要说很多话。一件记得对方喜好的小事，也能让相处更舒服。", "Care does not always need many words. A small gesture that reflects someone’s preferences can make time together feel warmer."],
    money: ["适合整理日常支出，看看哪些东西在持续使用。便宜与值得买，有时是两回事。", "Review everyday expenses and notice what you actually use. A low price and good value are not always the same."],
    reminder: ["踏实，也可以容得下一点尝试。", "Being grounded can leave room for a little experimentation."],
  },
  {
    id: "gemini", name: ["双子座", "Gemini"], glyph: "♊", dates: ["5.21–6.20", "May 21–Jun 20"], element: ["风象", "Air"],
    overall: ["双子座，今天把好奇心带回一个具体问题，会比同时追着许多消息更有收获。一个值得聊的人、一段安静的阅读，都可以成为新的起点。", "Gemini, bring your curiosity to one specific question instead of following every new message. A good conversation or a quiet stretch of reading can offer a fresh starting point."],
    work: ["想法多的时候，先记下来，再选一个展开。重要信息最好用一句清楚的话确认。", "Capture your ideas, then choose one to develop. Confirm important information in a clear sentence."],
    relationships: ["聊天的轻松感很可贵，也可以多问一句真实的近况。听见细节，会让交流更靠近。", "Keep the ease in a conversation, but ask one sincere question about how someone is doing. Listening to details can build connection."],
    money: ["做比较之前，先定下真正需要的条件。浏览越多，不一定越容易做出合适的选择。", "Define what you actually need before comparing options. More browsing does not always make a choice easier."],
    reminder: ["让一个好想法，有机会走到下一步。", "Give one good idea a chance to become a next step."],
  },
  {
    id: "cancer", name: ["巨蟹座", "Cancer"], glyph: "♋", dates: ["6.21–7.22", "Jun 21–Jul 22"], element: ["水象", "Water"],
    overall: ["巨蟹座，今天可以先照顾自己的感受，再决定把精力放在哪里。给熟悉的空间一点整理，让需要做的事和需要休息的时刻都有位置。", "Cancer, notice how you feel before deciding where your energy goes. Make a little room in a familiar space for both things to do and moments to pause."],
    work: ["遇到让你犹豫的安排，先把需求问清楚。具体的说明，往往比反复猜测更省力。", "If an arrangement leaves you unsure, ask what is needed. A concrete explanation can save more energy than repeated guessing."],
    relationships: ["关心别人时，也可以说出自己的需要。亲近不必靠默默承担来证明。", "You can care for others and still express your needs. You do not have to carry everything silently to show closeness."],
    money: ["家庭与日常相关的支出，可以先列出优先顺序。小小的预算安排会让心里更有底。", "Put household and everyday expenses in order of priority. A simple plan can help you feel more settled."],
    reminder: ["温柔也包括对自己说一句实话。", "Gentleness includes being honest with yourself."],
  },
  {
    id: "leo", name: ["狮子座", "Leo"], glyph: "♌", dates: ["7.23–8.22", "Jul 23–Aug 22"], element: ["火象", "Fire"],
    overall: ["狮子座，今天适合让热情有一个清楚的表达。拿出你在意的作品或想法，同时给真实的反馈留位置，努力会因此更有方向。", "Leo, give your enthusiasm a clear expression. Share a piece of work or an idea you care about, and leave room for honest feedback to guide your effort."],
    work: ["把成果讲清楚，也记得提到合作中的帮助。自信与认可他人，可以同时出现。", "Explain what you have achieved and acknowledge the help behind it. Confidence and appreciation can share the same space."],
    relationships: ["用一件具体的小事表达重视，比等待对方猜到更直接。赞美也尽量说得真切。", "Show that someone matters through a specific gesture rather than waiting for them to guess. Make a compliment sincere and concrete."],
    money: ["为喜欢的东西花钱之前，给自己一个合适的范围。好看的选择，也可以兼顾实际用途。", "Set a comfortable limit before spending on something you love. An appealing choice can still earn its place through practical use."],
    reminder: ["被看见之外，也留一点时间看见别人。", "Alongside being seen, make time to notice others."],
  },
  {
    id: "virgo", name: ["处女座", "Virgo"], glyph: "♍", dates: ["8.23–9.22", "Aug 23–Sep 22"], element: ["土象", "Earth"],
    overall: ["处女座，今天可以把注意力放在真正有用的细节上。先分清必须完成与可以再改的部分，给事情一个能够落地的版本。", "Virgo, focus on details that make a real difference. Separate what must be finished from what can be refined later, and let a workable version take shape."],
    work: ["检查一处关键细节，再推进整体进度。并不是每一部分都需要花同样多的时间。", "Check one important detail, then keep the whole task moving. Not every part needs the same amount of time."],
    relationships: ["想帮忙时，可以先问对方需要什么。被理解，有时比立刻得到改进建议更重要。", "Before helping, ask what the other person needs. Sometimes being understood matters more than receiving an immediate suggestion."],
    money: ["订阅、账单与重复购买值得看一遍。整理好信息，再决定是否调整。", "Review subscriptions, bills, and repeat purchases. Get the information in order before deciding what to change."],
    reminder: ["让“已经够用”也成为一种完成。", "Let good enough to use count as a kind of completion."],
  },
  {
    id: "libra", name: ["天秤座", "Libra"], glyph: "♎", dates: ["9.23–10.22", "Sep 23–Oct 22"], element: ["风象", "Air"],
    overall: ["天秤座，今天把自己的立场放进选择里，会让事情更清楚。听取意见之后，不妨回到一个简单的问题：哪一个安排更符合你现在的需要？", "Libra, include your own needs in the choices you make. After hearing other perspectives, return to a simple question: which arrangement fits what you need now?"],
    work: ["合作中可以把标准提前说清楚。需要做决定时，选两个最重要的条件比较就好。", "Clarify shared expectations early. When a decision is needed, compare the two criteria that matter most."],
    relationships: ["体谅对方，也别把自己的感受省略掉。一次平静的表达，比勉强答应更有帮助。", "Consider the other person without leaving out your feelings. A calm, honest response can help more than a reluctant yes."],
    money: ["共同支出先把分配方式谈明白。个人购买则可以留一点时间，看看是否还同样喜欢。", "Discuss how shared costs will be divided. For a personal purchase, give yourself a little time to see whether it still appeals."],
    reminder: ["平衡里，也应有你自己的位置。", "Balance should leave a place for you, too."],
  },
  {
    id: "scorpio", name: ["天蝎座", "Scorpio"], glyph: "♏", dates: ["10.23–11.21", "Oct 23–Nov 21"], element: ["水象", "Water"],
    overall: ["天蝎座，今天适合把深入的注意力放在一件值得理解的事上。先确认眼前的信息，再决定要走多远，不必让所有疑问一次都有答案。", "Scorpio, give your focused attention to something worth understanding. Confirm the information in front of you before deciding how far to go. Every question need not be settled at once."],
    work: ["集中处理一个难点，会比来回切换更有帮助。重要的假设，尽量找到实际证据。", "Work through one difficult point instead of switching repeatedly. Look for concrete evidence behind important assumptions."],
    relationships: ["想了解对方时，问一个清楚的问题。坦诚的交流，可以少一些试探。", "If you want to understand someone, ask a clear question. An honest exchange can leave less room for testing and guessing."],
    money: ["不熟悉的支出与条款，先了解清楚再考虑。给自己保留退出和重新评估的余地。", "Understand unfamiliar costs and terms before considering a commitment. Leave room to step back and reassess."],
    reminder: ["深入之前，先确认脚下的事实。", "Before going deeper, check the facts under your feet."],
  },
  {
    id: "sagittarius", name: ["射手座", "Sagittarius"], glyph: "♐", dates: ["11.22–12.21", "Nov 22–Dec 21"], element: ["火象", "Fire"],
    overall: ["射手座，今天可以把远处的想象，变成眼前的一次尝试。学一点新东西，换一个角度看熟悉的问题，同时给已有承诺留出时间。", "Sagittarius, turn a distant possibility into a small experiment today. Learn something new or revisit a familiar question from another angle, while keeping time for existing commitments."],
    work: ["新方向值得记录，也需要一个能完成的起点。先做短小的尝试，再决定是否扩展。", "A new direction deserves a note and a manageable starting point. Try something small before deciding to expand it."],
    relationships: ["分享见闻时，也问问对方最近在意的事。共同的兴趣，往往从这样的来回开始。", "When sharing what you have discovered, ask what has mattered to the other person lately. Shared interests can grow from that exchange."],
    money: ["旅行、课程或体验相关的购买，记得看看完整费用。让期待与现有安排相互配合。", "For a trip, course, or experience, look at the complete cost. Let your excitement work alongside your existing plans."],
    reminder: ["好奇心向外走，承诺也带在身边。", "Take your commitments along when curiosity leads you outward."],
  },
  {
    id: "capricorn", name: ["摩羯座", "Capricorn"], glyph: "♑", dates: ["12.22–1.19", "Dec 22–Jan 19"], element: ["土象", "Earth"],
    overall: ["摩羯座，今天适合把长远目标拆成一个看得见的进度。除了继续承担，也看看哪些事情可以协作完成，让节奏更容易持续。", "Capricorn, translate a long-term goal into visible progress. Alongside taking responsibility, notice what can be shared so that your pace is easier to sustain."],
    work: ["先处理最重要的节点，再安排次要任务。把需要的支持说出来，有助于稳步推进。", "Handle the most important milestone first, then arrange secondary tasks. Say what support you need to keep moving steadily."],
    relationships: ["可靠的行动很有分量，也可以补一句真实的关心。别让忙碌代替所有表达。", "Reliable actions matter, and a sincere word of care can add to them. Let being busy leave some room for expression."],
    money: ["核对固定支出与近期计划，给临时需要留出空间。能持续的安排，比一时的用力更实在。", "Check regular expenses against near-term plans, leaving room for unexpected needs. A sustainable arrangement can serve you better than a brief push."],
    reminder: ["完成一段之后，给自己一个停下来的理由。", "When a stretch of work is done, give yourself permission to pause."],
  },
  {
    id: "aquarius", name: ["水瓶座", "Aquarius"], glyph: "♒", dates: ["1.20–2.18", "Jan 20–Feb 18"], element: ["风象", "Air"],
    overall: ["水瓶座，今天适合让一个不同的想法接受小范围检验。把概念说得具体一点，让别人能参与进来，也让你看见它在日常里的样子。", "Aquarius, give an unconventional idea a small, practical test. Make it concrete enough for someone else to join in and for you to see how it works in everyday life."],
    work: ["换一种做法之前，先想清楚它要解决的问题。简单的试验，比完整的大计划更容易开始。", "Before trying a different approach, identify the problem it should solve. A simple experiment is easier to begin than a complete grand plan."],
    relationships: ["交流观点之外，也可以聊聊感受。不同意见不妨先听完，再寻找共同关心的部分。", "Alongside exchanging ideas, make space for feelings. Hear a different view fully before looking for shared concerns."],
    money: ["新工具或新服务很吸引人，先看看使用场景。能够解决真实问题，才容易用得久。", "A new tool or service can be appealing. Check where it fits in your life; solving a real problem gives it a better chance of lasting."],
    reminder: ["让新想法有一个简单的入口。", "Give a new idea a simple way into real life."],
  },
  {
    id: "pisces", name: ["双鱼座", "Pisces"], glyph: "♓", dates: ["2.19–3.20", "Feb 19–Mar 20"], element: ["水象", "Water"],
    overall: ["双鱼座，今天可以给感受找一个具体的出口。写几句话、完成一段创作，或与信任的人聊一聊，让心里的想象慢慢有了形状。", "Pisces, give your feelings a concrete outlet. Write a few lines, finish a small piece of creative work, or talk with someone you trust, letting an inner idea take shape."],
    work: ["有灵感的时候，先保存下来，再补上时间与步骤。把任务写清楚，可以帮助你开始。", "Capture inspiration when it comes, then add a time and a next step. A clearly written task can help you begin."],
    relationships: ["愿意体谅是一件好事，也可以核实自己有没有理解准确。温柔与清楚，并不冲突。", "Being understanding is valuable, and it helps to check that you have understood correctly. Kindness and clarity can work together."],
    money: ["情绪与购买可以隔开一点距离。先看看现有的东西，再决定是否需要添一件。", "Leave a little distance between a feeling and a purchase. Look at what you already have before deciding to add something."],
    reminder: ["把想到的美好，落成一件做得到的小事。", "Turn something you imagine into one small thing you can do."],
  },
];

type DailyTheme = { title: Bilingual; overall: Bilingual; work: Bilingual; relationships: Bilingual; money: Bilingual; action: Bilingual };
const DAILY_THEMES: readonly DailyTheme[] = [
  { title: ["把一步走稳", "One steady step"], overall: ["今日的主题是稳住节奏：把一个小进展看清楚，留一点时间消化它。", "Today’s theme is a steady pace: notice one small piece of progress and give yourself time to absorb it."], work: ["可以先完成一件拖着的小事。", "Finish one small task you have been putting off."], relationships: ["今天可以向一个关心的人问候近况。", "Check in with someone you care about today."], money: ["花几分钟核对一笔近期支出。", "Take a few minutes to check a recent expense."], action: ["选一件十分钟内能够开始的事，先动手。", "Choose something you can start in ten minutes, and begin."] },
  { title: ["把话说清楚", "Make room for clarity"], overall: ["今日的主题是清楚表达：需要确认的事情，尽量用具体的话问出来。", "Today’s theme is clear expression: put what needs confirming into a specific question."], work: ["一个简短的确认，可以减少来回修改。", "A brief confirmation can reduce repeated revisions."], relationships: ["先听完，再回应，会让交流更从容。", "Hear the thought fully before responding."], money: ["遇到不清楚的费用，先问清楚细项。", "Ask for the details of a cost you do not understand."], action: ["找一个尚不清楚的地方，写下你真正想问的一句话。", "Find one unclear point and write the question you actually want to ask."] },
  { title: ["给新意一点位置", "A little space for something new"], overall: ["今日的主题是小小尝试：变化不必很大，一个新的角度就足够。", "Today’s theme is a small experiment. A change does not have to be big; a new perspective is enough."], work: ["可以用新的顺序试做一个熟悉的任务。", "Try a different order for a familiar task."], relationships: ["分享一件最近注意到的小事。", "Share a small thing you have noticed recently."], money: ["新选择可以先了解，暂时不急着付款。", "Explore a new option without rushing to pay for it."], action: ["用一个小实验，试试你最近的一个想法。", "Test a recent idea with one small experiment."] },
  { title: ["整理身边的事", "Put a few things in order"], overall: ["今日的主题是整理：把手头的事情放回合适的位置，给注意力留出空间。", "Today’s theme is putting things in order. Find a place for a few loose ends and make space for your attention."], work: ["先列出三个优先事项，其他的稍后再看。", "List three priorities, and return to the rest later."], relationships: ["把已经答应的小事记下来。", "Write down a small promise you have made."], money: ["整理一处记录，让收支更容易看清。", "Organize one record so that costs are easier to see."], action: ["整理桌面、清单或日程中的一小处。", "Put one small part of your desk, list, or calendar in order."] },
  { title: ["留一点慢下来的时间", "Leave room to slow down"], overall: ["今日的主题是留白：不必把每一个空隙都填满，也给自己的想法一点安静。", "Today’s theme is leaving space. Every gap need not be filled; give your thoughts a little quiet."], work: ["两件任务之间，可以留一个短暂停顿。", "Leave a brief pause between two tasks."], relationships: ["陪伴可以很简单，不必急着安排很多事情。", "Time together can be simple; it need not be filled with plans."], money: ["暂缓一笔非必要购买，看看过后是否仍然需要。", "Pause a non-essential purchase and revisit whether you still need it."], action: ["给自己留十分钟，不安排新的任务。", "Leave ten minutes for yourself without adding a new task."] },
  { title: ["让协作更轻松", "Make collaboration easier"], overall: ["今日的主题是相互配合：把能独立做的与需要帮助的分开，事情会更清楚。", "Today’s theme is working together. Separate what you can do independently from where help would be useful."], work: ["把分工与完成时间确认一次。", "Confirm who is doing what and when it is needed."], relationships: ["可以问一句：我怎样帮你比较合适？", "Ask how you could help in a way that is useful."], money: ["共同的购买先谈需要，再谈怎样分担。", "Discuss the need for a shared purchase before dividing its cost."], action: ["把一个需要协作的任务，说成清楚的请求。", "Turn a task that needs collaboration into a clear request."] },
  { title: ["回看一点进展", "Notice a little progress"], overall: ["今日的主题是回看：看看已经走过的一段，再挑一个值得继续的方向。", "Today’s theme is looking back. Notice a stretch you have already covered, then choose a direction worth continuing."], work: ["记录一个已经完成的部分，再安排下一步。", "Note something you have finished before planning the next step."], relationships: ["想起一次得到的帮助，可以表达一句感谢。", "Remember a moment of help and offer a word of thanks."], money: ["看看最近买过的东西，哪些真正派上了用场。", "Look at recent purchases and notice which have been useful."], action: ["写下今天的一点进展，以及明天想继续的一件事。", "Write down a little progress from today and one thing to continue tomorrow."] },
];

const COLOURS = [
  { name: ["松绿", "Pine green"] as Bilingual, hex: "#405d4c" },
  { name: ["朱砂", "Cinnabar"] as Bilingual, hex: "#9c3d32" },
  { name: ["靛蓝", "Indigo"] as Bilingual, hex: "#415672" },
  { name: ["琥珀", "Amber"] as Bilingual, hex: "#a37a32" },
  { name: ["墨灰", "Ink grey"] as Bilingual, hex: "#58645e" },
  { name: ["梅紫", "Plum"] as Bilingual, hex: "#755570" },
];

export const ZODIAC_PREFERENCE_KEY = "guanxiang.zodiac.v1";
export function isZodiacId(value: unknown): value is ZodiacId { return typeof value === "string" && ZODIAC_SIGNS.some(s => s.id === value); }
export function localDateKey(now = new Date()): string {
  if (!Number.isFinite(now.getTime())) throw new Error("Invalid date");
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export function getDailyHoroscope(signId: ZodiacId, dateKey: string) {
  const index = ZODIAC_SIGNS.findIndex(sign => sign.id === signId);
  if (index < 0 || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) throw new Error("Invalid horoscope selection");
  const timestamp = Date.parse(`${dateKey}T00:00:00.000Z`);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== dateKey) throw new Error("Invalid calendar date");
  const day = Math.floor(timestamp / 86400000);
  const modulo = (value: number, length: number) => ((value % length) + length) % length;
  const sign = ZODIAC_SIGNS[index];
  const theme = DAILY_THEMES[modulo(day + index * 3, DAILY_THEMES.length)];
  const merge = (first: Bilingual, second: Bilingual): Bilingual => [`${first[0]}${second[0]}`, `${first[1]} ${second[1]}`];
  return {
    signId, dateKey, theme: theme.title,
    overall: merge(sign.overall, theme.overall),
    work: merge(sign.work, theme.work),
    relationships: merge(sign.relationships, theme.relationships),
    money: merge(sign.money, theme.money),
    action: theme.action, reminder: sign.reminder,
    luckyColour: COLOURS[modulo(day + index, COLOURS.length)],
    luckyNumber: modulo(day * 7 + index * 11, 9) + 1,
    contentType: "original-entertainment-rotation" as const,
  };
}
