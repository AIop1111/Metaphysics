/** Guanxiang's original preference exercise; not the official MBTI instrument. */
export type Copy = readonly [string, string];
export type AxisId = "EI" | "SN" | "TF" | "JP";
export type Answer = -2 | -1 | 0 | 1 | 2;
export type Answers = Record<string, Answer>;
export const MBTI_STORAGE_KEY = "guanxiang.mbti.v1";
export const TYPE_CODES = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"] as const;
export type TypeCode = typeof TYPE_CODES[number];

export const AXES: readonly { id: AxisId; title: Copy; left: Copy; right: Copy; prompt: Copy }[] = [
  { id: "EI", title: ["精力取向", "Energy"], left: ["外向 · 向外联结", "Extraversion · Outward engagement"], right: ["内向 · 向内整理", "Introversion · Inward reflection"], prompt: ["什么样的交流节奏，让你更有余力？", "What pace of interaction leaves you with energy to spare?"] },
  { id: "SN", title: ["信息关注", "Information"], left: ["实感 · 具体经验", "Sensing · Concrete experience"], right: ["直觉 · 可能与联系", "Intuition · Possibilities and connections"], prompt: ["这次需要先补事实，还是先打开可能？", "Does this situation call for more facts or more possibilities first?"] },
  { id: "TF", title: ["判断重心", "Decisions"], left: ["思考 · 原则与逻辑", "Thinking · Principles and logic"], right: ["情感 · 价值与影响", "Feeling · Values and impact"], prompt: ["做这个决定时，规则与人的处境都看到了吗？", "Have you considered both the criteria and the people affected?"] },
  { id: "JP", title: ["安排方式", "Approach"], left: ["判断 · 计划与确定", "Judging · Plans and closure"], right: ["知觉 · 开放与调整", "Perceiving · Openness and adaptation"], prompt: ["哪些事适合先定下来，哪些可以留一点空间？", "What would benefit from a plan, and what could stay open?"] },
];

export interface PreferenceQuestion { id: string; axis: AxisId; direction: 1 | -1; context: Copy; a: Copy; b: Copy }
export const QUESTIONS: readonly PreferenceQuestion[] = [
  { id: "q01", axis: "EI", direction: 1, context: ["忙碌一天后，你更常怎样恢复？", "After a busy day, how do you usually recharge?"], a: ["找熟悉的人聊聊，边交流边放松。", "Talk with familiar people and unwind through conversation."], b: ["留一段独处时间，安静地整理自己。", "Take some time alone and settle your thoughts quietly."] },
  { id: "q02", axis: "SN", direction: 1, context: ["学习一个新工具时，你倾向于……", "When learning a new tool, you tend to…"], a: ["先跟着具体步骤做一遍。", "Start by following a concrete, worked example."], b: ["先弄懂整体思路和它能带来的可能。", "Start with the overall idea and what it could make possible."] },
  { id: "q03", axis: "TF", direction: 1, context: ["团队在两个方案间犹豫，你先看……", "When a team is choosing between two plans, you first consider…"], a: ["比较标准是否一致，推理是否站得住。", "Whether the comparison is consistent and the reasoning holds."], b: ["方案是否符合重视的价值，会怎样影响大家。", "Whether the plan fits shared values and how it affects people."] },
  { id: "q04", axis: "JP", direction: 1, context: ["安排一个周末，你更喜欢……", "When arranging a weekend, you prefer…"], a: ["先定好主要活动，心里有个安排。", "Set the main activities ahead of time."], b: ["留些空白，到了当天再看想做什么。", "Leave room to decide what feels right on the day."] },
  { id: "q05", axis: "EI", direction: -1, context: ["遇到一个新想法，你通常……", "When a new idea occurs to you, you usually…"], a: ["先自己想清楚，再找人讨论。", "Think it through privately before discussing it."], b: ["先说出来，在讨论中慢慢理清。", "Talk it through and clarify it as the conversation develops."] },
  { id: "q06", axis: "SN", direction: -1, context: ["听别人描述一件事，你容易注意……", "When someone describes an event, you tend to notice…"], a: ["它与其他事情的联系，以及背后的模式。", "Connections with other events and the pattern behind them."], b: ["发生的细节、顺序与可以确认的事实。", "The details, sequence, and facts that can be checked."] },
  { id: "q07", axis: "TF", direction: -1, context: ["朋友请你评价一个选择，你会先……", "When a friend asks about a choice, you first…"], a: ["了解这对他意味着什么、在意什么。", "Explore what it means to them and what they value."], b: ["一起分析条件、取舍和理由。", "Analyze the conditions, trade-offs, and reasons together."] },
  { id: "q08", axis: "JP", direction: -1, context: ["开始一个有截止日期的任务，你倾向于……", "When starting a task with a deadline, you tend to…"], a: ["保留几种做法，边推进边调整。", "Keep several approaches open and adapt as you go."], b: ["先拆出步骤与时间点，再按计划推进。", "Map out steps and milestones before proceeding."] },
  { id: "q09", axis: "EI", direction: 1, context: ["参加一个熟悉的聚会时，你更享受……", "At a gathering with people you know, you enjoy…"], a: ["和不同的人互动，感受交流的热闹。", "Moving between conversations and enjoying the shared energy."], b: ["和一两个人深入聊，中间留点安静时间。", "Having a deeper conversation with one or two people, with quiet breaks."] },
  { id: "q10", axis: "SN", direction: 1, context: ["解释一个复杂问题时，你自然会……", "When explaining a complex issue, you naturally…"], a: ["从真实例子和具体细节说起。", "Begin with actual examples and specific details."], b: ["从一个概念、类比或整体框架说起。", "Begin with a concept, analogy, or overall framework."] },
  { id: "q11", axis: "TF", direction: 1, context: ["分配有限资源时，你较先考虑……", "When allocating limited resources, you first consider…"], a: ["建立统一标准，并用同样的方式比较。", "Establishing a common standard and applying it consistently."], b: ["理解各人的需要，以及不同安排的影响。", "Understanding individual needs and the effects of each arrangement."] },
  { id: "q12", axis: "JP", direction: 1, context: ["行程临近时，你感觉更舒服的状态是……", "As a trip approaches, you feel more comfortable when…"], a: ["主要事项已经确定，只剩细节。", "The main arrangements are settled and only details remain."], b: ["还有一些可选空间，能根据情况改变。", "Some options remain open so you can respond to circumstances."] },
  { id: "q13", axis: "EI", direction: -1, context: ["想通一件难事时，对你更有帮助的是……", "To work through a difficult issue, it helps you more to…"], a: ["独自写写想想，先形成自己的看法。", "Write and reflect alone to form your own view first."], b: ["找人来回讨论，让思路在交流中成形。", "Discuss it back and forth and let your view take shape together."] },
  { id: "q14", axis: "SN", direction: -1, context: ["面对一项新提议，你最先想问……", "When considering a new proposal, you first want to ask…"], a: ["它还能怎样发展？有没有别的可能？", "Where could it lead, and what other possibilities exist?"], b: ["目前具体是什么？已有的证据有哪些？", "What exactly is it now, and what evidence is already available?"] },
  { id: "q15", axis: "TF", direction: -1, context: ["必须给出不同意见时，你更先关注……", "When you need to disagree, your first concern is…"], a: ["表达是否照顾关系，是否理解对方在意的事。", "Whether your words respect the relationship and the other person's values."], b: ["论点是否清楚，理由是否有一致的依据。", "Whether your point is clear and your reasons have a consistent basis."] },
  { id: "q16", axis: "JP", direction: -1, context: ["手上有几件事情时，你偏好的节奏是……", "With several things to do, your preferred rhythm is…"], a: ["允许来回切换，根据新信息调整顺序。", "Switch between them and reorder them as new information arrives."], b: ["明确顺序，逐一完成和收尾。", "Set an order and finish them one by one."] },
  { id: "q17", axis: "EI", direction: 1, context: ["有一段空闲时间，你较常想……", "With some free time, you more often want to…"], a: ["主动约人一起做点什么。", "Reach out and arrange something with others."], b: ["投入自己的兴趣，保持独处的空间。", "Spend time on your own interests and keep some space to yourself."] },
  { id: "q18", axis: "SN", direction: 1, context: ["回顾一次经历，你更自然地记住……", "Looking back on an experience, you more naturally recall…"], a: ["当时做了什么、看到了什么具体变化。", "What happened and the specific changes you observed."], b: ["它让你想到的含义、联系与后续可能。", "Its meaning, connections, and what it might lead to."] },
  { id: "q19", axis: "TF", direction: 1, context: ["当两个决定都可行时，你更依赖……", "When two decisions are both workable, you rely more on…"], a: ["逐项权衡的理由，以及能说明的原则。", "A reasoned comparison and principles you can explain."], b: ["内心重视的价值，以及对他人的影响。", "The values you care about and the impact on others."] },
  { id: "q20", axis: "JP", direction: 1, context: ["一个选择已有足够信息时，你通常……", "Once you have enough information for a choice, you usually…"], a: ["希望把决定定下来，开始执行。", "Want to settle the decision and start acting."], b: ["愿意再留一点时间，看有没有新的选项。", "Prefer to leave some time for another option to emerge."] },
  { id: "q21", axis: "EI", direction: -1, context: ["连续交流了很久之后，你通常需要……", "After a long stretch of interaction, you usually need…"], a: ["暂停交流，留一段不被打扰的时间。", "A pause and some uninterrupted time alone."], b: ["换个话题或伙伴，继续在互动中放松。", "A change of topic or company, continuing to unwind through interaction."] },
  { id: "q22", axis: "SN", direction: -1, context: ["读一份新材料，你更常先做的是……", "When reading new material, you more often start by…"], a: ["把它放进更大的图景，寻找潜在联系。", "Placing it in a larger picture and looking for connections."], b: ["逐项理解写明的内容，核对具体信息。", "Understanding what is stated and checking the specific information."] },
  { id: "q23", axis: "TF", direction: -1, context: ["评估一条建议时，你更先问自己……", "When evaluating advice, you first ask yourself…"], a: ["它是否符合我重视的事，也照顾人的处境？", "Does it fit my values and account for people's circumstances?"], b: ["它的理由是否充分，在类似情况下能否成立？", "Are its reasons sound, and would they hold in similar situations?"] },
  { id: "q24", axis: "JP", direction: -1, context: ["面对一个开放任务，你更享受……", "With an open-ended task, you enjoy…"], a: ["边探索边发现方向，保持可调整的空间。", "Discovering the direction as you explore and keeping room to adapt."], b: ["先明确目标与安排，看着进度逐渐完成。", "Defining goals and a plan, then watching progress toward completion."] },
];

export interface TypeProfile { code: TypeCode; name: Copy; overview: Copy; growth: Copy }
const PROFILES: Record<TypeCode, Omit<TypeProfile, "code">> = {
  ISTJ: { name: ["务实组织", "Practical organization"], overview: ["你可以从经验、依据和清晰安排入手，让事情一步步落地。读这张卡时，留意它是否贴近你最近的实际选择。", "Experience, evidence, and a clear plan can provide a useful starting point. Compare this card with your recent choices rather than treating it as a fixed identity."], growth: ["下一次计划改变时，先找一个仍能推进的小步骤。", "When a plan changes, find one small step that still moves things forward."] },
  ISFJ: { name: ["细致照应", "Attentive support"], overview: ["具体经验、细致照应和有序安排，可以成为你理解事情的线索。也给自己的需要留一个明确的位置。", "Concrete experience, attentive support, and orderly arrangements may be useful themes to explore. Give your own needs an explicit place as well."], growth: ["在答应一项请求前，先确认自己能投入多少时间。", "Before accepting a request, decide how much time you can realistically give."] },
  INFJ: { name: ["远景关怀", "Thoughtful vision"], overview: ["你可以把内在思考、长远联系和对人的关切放在一起，寻找一件事的意义。再用具体反馈校准这个图景。", "Private reflection, long-range connections, and concern for people can help you explore meaning. Check that picture against concrete feedback."], growth: ["把一个长远想法变成今天可以核实的小问题。", "Turn a long-range idea into a small question you can check today."] },
  INTJ: { name: ["系统构想", "Systems and strategy"], overview: ["整体构想、逻辑比较与明确方向，可以帮助你组织复杂问题。把推理过程说出来，也能让别人更容易参与。", "An overall model, logical comparison, and a clear direction can help organize a complex issue. Sharing your reasoning gives others a way to contribute."], growth: ["展示方案时，补上一句你如何走到这个结论。", "When presenting a plan, add a sentence explaining how you reached it."] },
  ISTP: { name: ["现场拆解", "Practical analysis"], overview: ["你可以在安静观察、具体证据和灵活尝试之间找到节奏。把眼前问题拆开，也为后续交接留一点说明。", "Quiet observation, concrete evidence, and flexible experiments can offer a useful rhythm. Break down the immediate problem and leave a note for whoever follows."], growth: ["一次尝试结束后，写下有效的条件与下一步。", "After an experiment, note what made it work and what comes next."] },
  ISFP: { name: ["温柔实践", "Quiet expression"], overview: ["亲身体验、内在价值与开放空间，可以帮你看清自己的选择。试着把重要的感受说得具体一些。", "First-hand experience, personal values, and room to adapt can help clarify your choices. Try expressing an important feeling in specific terms."], growth: ["把一个在意的感受，写成可以沟通的具体需要。", "Translate a feeling you care about into a need you can communicate."] },
  INFP: { name: ["价值探索", "Values and possibilities"], overview: ["内在价值与多种可能，可以为思考提供丰富材料。给一个重要想法安排小小的试验，让它与现实相遇。", "Personal values and multiple possibilities can provide rich material for reflection. Give one meaningful idea a small real-world experiment."], growth: ["选一个最在意的想法，用十五分钟做个开始。", "Choose one meaningful idea and spend fifteen minutes making a start."] },
  INTP: { name: ["逻辑推演", "Logical exploration"], overview: ["你可以在独立思考、概念联系与逻辑检验中探索问题。暂时选一个可验证的解释，也能为后续讨论打开入口。", "Independent reflection, conceptual connections, and logical checks can help explore a problem. A provisional, testable explanation gives discussion a starting point."], growth: ["为一个假设设定最小验证，不必等到框架完美。", "Set up the smallest useful test for a hypothesis before the framework feels complete."] },
  ESTP: { name: ["即时行动", "Action and adaptation"], overview: ["外部互动、现场信息与灵活判断，可以帮助你快速接触问题。行动之后，留一点时间检查影响和收尾。", "Interaction, immediate information, and flexible judgment can help you engage with a problem. After acting, make time to check the effects and finish the loose ends."], growth: ["行动前停一下，确认最需要照顾的一项后果。", "Before acting, pause to identify one consequence that deserves attention."] },
  ESFP: { name: ["体验分享", "Shared experience"], overview: ["你可以从真实体验和人与人的互动中寻找方向，同时保持调整空间。把当下的感受连到一个具体约定上。", "Shared experiences and interaction can help you find a direction while keeping room to adapt. Connect a present feeling with a concrete commitment."], growth: ["为一件想继续的事，约定下一次具体时间。", "For something you want to continue, agree on a specific next time."] },
  ENFP: { name: ["可能联结", "Connecting possibilities"], overview: ["交流、可能性与个人价值，可以让你看见不同事情之间的联系。选一个方向试走一段，再决定是否扩展。", "Conversation, possibilities, and personal values can reveal connections between different things. Try one direction for a while before expanding it."], growth: ["把三个好想法缩成一个本周可以完成的尝试。", "Narrow three good ideas to one experiment you can finish this week."] },
  ENTP: { name: ["概念试验", "Ideas and experiments"], overview: ["你可以通过讨论、逻辑挑战和开放尝试，检查一个概念有哪些可能。讨论结束时，把共同确认的部分留下来。", "Discussion, logical challenges, and open experiments can reveal what an idea makes possible. At the end, record the parts everyone has agreed on."], growth: ["一次讨论结束时，明确一项决定与它的负责人。", "End a discussion by identifying one decision and who will act on it."] },
  ESTJ: { name: ["推进组织", "Organized action"], overview: ["明确标准、具体信息与可执行安排，可以帮助你组织协作。检查计划时，也听听参与者的实际处境。", "Clear criteria, concrete information, and actionable plans can help coordinate a group. When checking the plan, listen to the circumstances of those involved."], growth: ["推进任务之前，问一句大家还缺什么条件。", "Before moving a task forward, ask what conditions people still need."] },
  ESFJ: { name: ["协作照应", "Cooperative support"], overview: ["具体照应、共同价值与清晰约定，可以成为协作的起点。把关心与边界一起表达，能让安排更可持续。", "Practical support, shared values, and clear agreements can provide a starting point for cooperation. Express care and boundaries together to make arrangements sustainable."], growth: ["帮助别人时，同时说明自己可以做到的范围。", "When helping someone, state the limits of what you can provide."] },
  ENFJ: { name: ["共同成长", "Shared growth"], overview: ["交流、共同愿景与对人的关注，可以帮助你组织一段合作。给不同意见留空间，让目标由大家一起确认。", "Conversation, a shared vision, and attention to people can help organize cooperation. Leave room for different views and confirm the goal together."], growth: ["邀请一个不同意见，并先完整听完它的理由。", "Invite a different view and listen to its full reasoning before responding."] },
  ENTJ: { name: ["目标统筹", "Goals and coordination"], overview: ["整体方向、逻辑比较与明确安排，可以帮助你把想法推向行动。为执行者保留反馈入口，方向也能随事实修正。", "An overall direction, logical comparison, and clear arrangements can turn an idea into action. Keep a feedback channel open so facts can refine the direction."], growth: ["为一个明确目标，设定一次允许调整的回顾。", "Set a review point where a clear goal can be adjusted in light of feedback."] },
};
export const TYPES: readonly TypeProfile[] = TYPE_CODES.map(code => ({ code, ...PROFILES[code] }));
export const WORK_PROMPTS: Record<"J" | "P", Copy> = {
  J: ["先写下目标与下一步，再为意外留一段缓冲。", "Write down the goal and next step, then allow a buffer for the unexpected."],
  P: ["保留探索空间，也为关键步骤设定一个时间点。", "Keep room to explore and set a time for one essential step."],
};
export const RELATIONSHIP_PROMPTS: Record<"T" | "F", Copy> = {
  T: ["解释理由时，也问问这件事对对方意味着什么。", "Alongside your reasons, ask what the situation means to the other person."],
  F: ["表达关心时，把自己的需要与具体理由一起说清楚。", "When expressing care, make your own needs and specific reasons clear as well."],
};

export interface DimensionResult { axis: AxisId; leftPoints: number; rightPoints: number; neutral: number; letter: string; close: boolean }
export interface PreferenceResult { pattern: string; dimensions: DimensionResult[]; candidates: TypeCode[] }
export function validateAnswers(value: unknown): Answers {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid answers");
  const result: Answers = {};
  for (const [id, answer] of Object.entries(value)) {
    if (!QUESTIONS.some(q => q.id === id) || !Number.isInteger(answer) || ![-2, -1, 0, 1, 2].includes(answer as number)) throw new Error("Invalid answer");
    result[id] = answer as Answer;
  }
  return result;
}
export function scoreAnswers(input: unknown): PreferenceResult {
  const answers = validateAnswers(input);
  if (Object.keys(answers).length !== QUESTIONS.length) throw new Error("Complete all questions first");
  const dimensions = AXES.map(axis => {
    let leftPoints = 0, rightPoints = 0, neutral = 0;
    for (const q of QUESTIONS.filter(q => q.axis === axis.id)) {
      const score = answers[q.id] * q.direction;
      if (score > 0) leftPoints += score;
      else if (score < 0) rightPoints -= score;
      else neutral++;
    }
    const difference = leftPoints - rightPoints;
    return { axis: axis.id, leftPoints, rightPoints, neutral, letter: difference === 0 ? "X" : axis.id[difference > 0 ? 0 : 1], close: difference !== 0 && Math.abs(difference) <= 2 };
  });
  const pattern = dimensions.map(d => d.letter).join("");
  const candidates = TYPE_CODES.filter(code => [...pattern].every((letter, i) => letter === "X" || code[i] === letter));
  return { pattern, dimensions, candidates };
}

export interface MbtiSession { version: 1; answers: Answers; step: number; finished: boolean; selectedType: TypeCode }
export const emptySession = (): MbtiSession => ({ version: 1, answers: {}, step: 0, finished: false, selectedType: "ISTJ" });
export function parseSession(raw: string | null): MbtiSession {
  if (raw === null) return emptySession();
  const value = JSON.parse(raw);
  if (!value || typeof value !== "object" || Array.isArray(value) || value.version !== 1 || !Number.isInteger(value.step) || value.step < 0 || value.step > 5 || typeof value.finished !== "boolean" || !TYPE_CODES.includes(value.selectedType)) throw new Error("Invalid session");
  const answers = validateAnswers(value.answers);
  if (value.finished && Object.keys(answers).length !== QUESTIONS.length) throw new Error("Incomplete result");
  return { version: 1, answers, step: value.step, finished: value.finished, selectedType: value.selectedType };
}
