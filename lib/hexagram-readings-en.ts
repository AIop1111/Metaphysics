/**
 * Original English readings for the server-rendered hexagram pages: two short essay
 * paragraphs and one note per line (bottom to top), plus a note on 用九/用六 for 1 and 2.
 * Written by Guanxiang from the Chinese text; not a translation, and not derived from
 * any copyrighted English edition.
 */
export type ReadingEn = { essay: [string, string]; lines: [string, string, string, string, string, string]; extra?: string };

export const READINGS_EN: Record<number, ReadingEn> = {
  1: {
    essay: [
      "Qian doubles the trigram of heaven: six unbroken lines, nothing yielding anywhere. The ancient commentaries read it as pure initiative — the force that starts things and keeps them moving. Its judgment is only four words, 元亨利貞, which later tradition treated as four virtues: origin, growth, benefit and steadiness. Read more plainly, they say that a strong beginning still has to be carried through and kept on course.",
      "What makes the hexagram useful is its sequence. A single image, the dragon, moves from hidden in the deep, to visible in the field, to leaping, to flying, and finally to overreaching. The same strength is right or wrong depending on where it stands. Qian is less a promise of success than a study in timing: when to stay out of sight, when to show your work, and when you have gone far enough.",
    ],
    lines: [
      "The dragon is still underwater. The ability is real but the moment has not come; acting now would waste it.",
      "The dragon appears in the open field. Your work becomes visible, and it helps to find people who can recognise and guide it.",
      "Working hard all day and still alert at night. The position is exposed, but steady vigilance keeps it free of fault.",
      "A leap that may or may not leave the deep. This is a point of choice; testing your strength here is not a mistake.",
      "The dragon flies in the sky — strength at its fullest and in the right place. It helps to meet the great person.",
      "The dragon has gone too high. Strength that cannot stop turns into regret; this line is a reminder to know the limit.",
    ],
    extra: "When every line is moving, the text pictures a flock of dragons with no leader. Strength shared without anyone insisting on the front position is called fortunate.",
  },
  2: {
    essay: [
      "Kun doubles the trigram of earth: six broken lines, open throughout. Where Qian starts things, Kun receives and brings them to completion. Its image is the mare, an animal that is strong and can travel far, yet works by following. The judgment warns that taking the lead leads astray, while following finds direction — not as a call for passivity, but as a description of a role that supports and sustains.",
      "The line texts trace how such receptivity can go well or badly. Frost underfoot warns of ice to come; the straight, square and great second line acts without needing to rehearse; the bag tied shut keeps quiet in a risky place; the yellow skirt shows modest excellence; and at the top, two dragons fight in the wilds because yielding has turned into contest. Kun asks what you are carrying for others, and whether your support is chosen or merely assumed.",
    ],
    lines: [
      "Treading on frost means hard ice is coming. Small signs point to a larger trend; notice them early.",
      "Straight, square and great. Acting from what is natural and settled, nothing needs to be practised in advance.",
      "Holding talents in reserve, serving without claiming the result. Finishing the task matters more than the credit.",
      "A bag tied shut. Saying little in an uncertain position avoids both blame and praise.",
      "A yellow lower garment: excellence that stays modest and central. The text calls this greatly fortunate.",
      "Dragons fight in the open country and their blood is dark and yellow. Yielding has reached its limit and become conflict.",
    ],
    extra: "When every line is moving, the text advises lasting steadiness. Receptivity that endures over time is what makes it beneficial.",
  },
  3: {
    essay: [
      "Zhun places water above thunder. Movement is starting below, but it meets danger and difficulty above. The character itself pictures a sprout pushing through hard ground, bent as it emerges. This is the trouble of beginnings: the energy is there, the order is not yet in place.",
      "The judgment does not advise rushing ahead. It recommends establishing helpers — finding the people and structures a new undertaking needs before trying to go far. The lines show riders who circle and hesitate, a hunter without a guide who should give up the chase, and a final line in tears. Zhun treats confusion at the start as normal, and asks what support would make the next step possible.",
    ],
    lines: [
      "Circling, unable to move forward. It is right to stay put and steady, and to find people to help build the foundation.",
      "Horses circle back; what looks like a raid is a proposal. Do not commit too quickly — ten years may pass before the match is right.",
      "Chasing deer without a forester, deep into the woods. A wise person sees the risk and stops rather than pressing on.",
      "Horses circle again, but this time seeking a partnership is good. Accepting help now opens the way.",
      "Resources are held back. Small, careful steps go well; large, forceful ones bring trouble.",
      "Riders circle and tears flow. Staying stuck in the difficulty becomes a sorrow of its own.",
    ],
  },
  4: {
    essay: [
      "Meng sets mountain above water: a spring rising at the foot of a mountain, not yet knowing where it will flow. The theme is inexperience and learning. The judgment makes a point that still holds in any classroom: the teacher does not chase the student; the student comes with a question. Asking once is answered; asking the same thing over and over, hoping for a different reply, is disrespect.",
      "The lines move between learner and teacher. Discipline can help the young, but harshness should be dropped; being patient with the ignorant is fortunate; a learner who throws themselves at a wealthy man loses themselves; someone stuck in ignorance is lost; the child's openness is a strength; and in the last line, correction should guard against harm rather than inflict it. Meng invites honest questions and patience with not-yet-knowing.",
    ],
    lines: [
      "Breaking through ignorance may need some discipline, but keep it light. Shackles applied too long lead to regret.",
      "Being tolerant of the inexperienced, and taking a partner well — the son can manage the household.",
      "Do not take a partner who sees a rich man and loses herself. Nothing good comes from it.",
      "Trapped in ignorance, cut off from help. This is the regrettable place in the hexagram.",
      "Childlike openness to learning. A beginner's mind is fortunate here.",
      "Striking at ignorance. Do not act like a raider; act to keep raiders away.",
    ],
  },
  5: {
    essay: [
      "Xu puts water above heaven: clouds have gathered in the sky, but the rain has not yet fallen. Strength below faces danger ahead, and the right response is to wait. This is not idle waiting. The judgment ties it to trust — confidence that is well-founded brings light and success, and makes it possible to cross the great river when the time comes.",
      "The lines place the person at different distances from danger: out in the countryside, on the sand, in the mud, in blood, at a feast, and finally inside the pit with unexpected guests arriving. The further in, the more pressure. The fifth line, waiting with food and drink, is the hexagram's model: steady, nourished, unhurried. Xu asks what you are waiting for, and whether you are using the wait well.",
    ],
    lines: [
      "Waiting in the open country, far from trouble. Keep to a steady routine; there is no error.",
      "Waiting on the sand, closer to the water. A few words are said against you, but the end is good.",
      "Waiting in the mud invites the attackers. Getting too close to the problem draws it to you.",
      "Waiting in blood, but climbing out of the pit. Listening carefully lets you get free.",
      "Waiting with wine and food. Calm, nourished patience is fortunate.",
      "Inside the pit, three uninvited guests arrive. Treat them with respect and it ends well.",
    ],
  },
  6: {
    essay: [
      "Song places heaven above water. Heaven rises, water flows down; the two move apart. That divergence is the image of a dispute. The judgment is unusually cautious: there is sincerity, but it is blocked. Caution in the middle is fortunate; pushing the conflict to the end is not. It helps to see a great person — someone fair who can judge — but it does not help to cross the great river.",
      "The lines repeatedly favour stopping. Do not drag the matter out; withdraw to your home town; keep to your old virtue; turn back and accept the situation. Only the fifth line, the impartial judge, is called greatly fortunate. The last line wins a belt of honour that is taken away three times in a day. Song asks what the dispute is really about, and what a settlement worth having would look like.",
    ],
    lines: [
      "Do not prolong the matter. A few words are exchanged, but in the end it goes well.",
      "Unable to win the case, he goes home and slips away; his town of three hundred households escapes harm.",
      "Living on old virtue. Holding steady is risky but ends well; if serving a king, do not seek credit.",
      "Unable to win, he turns back and accepts what is right. Changing course brings peace.",
      "The dispute comes before a fair judge. This is greatly fortunate.",
      "A belt of honour is granted, then taken away three times in one morning. Victory in conflict does not hold.",
    ],
  },
  7: {
    essay: [
      "Shi sets earth above water: water hidden underground, as an army is drawn from the population and returns to it. The hexagram has one strong line, in the second place, leading five yielding lines — a capable leader in the field, entrusted by the ruler above. The judgment insists on steadiness and on an experienced person in charge.",
      "The lines read as a short manual on collective action. An army goes out in proper order; the commander in the midst receives repeated honours; carrying corpses in the wagon is a disaster; withdrawing to camp is no mistake; the right person should lead, not many competing ones; and when the campaign ends, those who did not deserve power should not be given it. Shi asks how a group is organised, led and held accountable.",
    ],
    lines: [
      "The army goes out according to discipline. Without good order, even success becomes misfortune.",
      "In the midst of the army, the leader is trusted by the king and honoured three times. Fortunate.",
      "Corpses carried in the wagons. Confused command brings disaster.",
      "The army withdraws and camps. Knowing when to step back is no mistake.",
      "There is game in the field; it is right to act. Let the eldest lead; if a junior takes over, the wagons carry the dead.",
      "The great ruler gives his orders, founding states and houses. Do not give lasting authority to petty people.",
    ],
  },
  8: {
    essay: [
      "Bi places water above earth: water lies close upon the ground and joins with it. The theme is holding together. One strong line, the fifth, is the centre around which the others gather. The judgment advises looking again — examining whether you are worthy, consistent and steady enough to be someone others join — and warns that those who come late will be unwelcome.",
      "The lines show different ways of joining: with sincerity from the start, from within, with the wrong people, outwardly toward a worthy leader, and through the king's hunt that drives game only from three sides, leaving an exit. The last line has no head — joining without a leader or a beginning — and ends badly. Bi asks whom you belong with, and on what basis the bond is made.",
    ],
    lines: [
      "Joining with sincerity, as full as an earthen jar. Trust given at the beginning brings unexpected good.",
      "Joining from within. Holding steady to your own inner conviction is fortunate.",
      "Joining with the wrong people. A bond with those who do not suit you brings harm.",
      "Joining outwardly with a worthy leader. Steadiness here is fortunate.",
      "Open union: the king hunts on three sides only and lets escaping game go. No one is forced to stay.",
      "Joining with no head. Without a clear beginning or leader, the union ends badly.",
    ],
  },
  9: {
    essay: [
      "Xiao Chu sets wind above heaven. Wind moves across the sky and gathers clouds, but cannot yet bring rain: dense clouds rise from the western border, and nothing falls. A single yielding line, the fourth, holds back five strong ones. The restraint is small and gentle — enough to slow things, not enough to stop them.",
      "The hexagram is about modest accumulation when large moves are not possible. The early lines return to their own path; the middle lines show a cart losing its axle-strap and a husband and wife quarrelling; sincerity eases bloodshed and fear; and in the last line the rain has finally come and things settle. Xiao Chu suggests building up in small ways — refining, saving, preparing — while a bigger change is still out of reach.",
    ],
    lines: [
      "Returning to one's own path. What fault could there be? This is fortunate.",
      "Drawn back along with others, staying centred. Fortunate.",
      "The cart loses its axle-strap; husband and wife turn their eyes away from each other. Small restraint has turned into friction.",
      "With sincerity, the bloodshed goes and fear departs. No fault.",
      "Sincerity binds people together, and the wealth is shared with the neighbour.",
      "The rain has come and things come to rest. Virtue has accumulated; but pushing on now, even the steady are at risk — the moon is almost full.",
    ],
  },
  10: {
    essay: [
      "Lü places heaven above lake: the strong above, the gentle and joyful below, and the gentle one must step carefully behind the strong. The judgment's image is memorable: treading on the tiger's tail, and the tiger does not bite. Careful, courteous conduct lets the weaker party walk safely beside power.",
      "The character 履 means both a shoe and a step, and by extension conduct. The lines range from plain, simple steps that go well, to a calm path walked by a recluse, to the one-eyed and lame person who overrates their sight and stride and is bitten. The last line looks back over the path walked and examines it. Lü asks how you are conducting yourself near something powerful, and whether your steps are honest about your own limits.",
    ],
    lines: [
      "Plain, simple steps. Going forward this way brings no fault.",
      "Walking a level, easy road; a quiet person who keeps steady is fortunate.",
      "The one-eyed thinks he can see, the lame thinks he can walk. Treading on the tiger's tail, he is bitten — overconfidence meets real danger.",
      "Treading on the tiger's tail, alert and cautious. In the end it goes well.",
      "Resolute conduct. Even when right, there is danger in being too decisive.",
      "Look back at the path you have walked and examine the signs. A full return is greatly fortunate.",
    ],
  },
  11: {
    essay: [
      "Tai puts earth above heaven. It looks upside down, but the logic is movement: heaven rises, earth sinks, so the two meet. The small departs and the great arrives. It is the image of communication working — between high and low, inside and outside, those who decide and those who are affected.",
      "The lines enjoy this openness but never forget it is temporary. Grass pulled up with its roots brings others along; tolerance can embrace even the wild; but nothing level stays level, nothing that goes fails to return; and at the top, the city wall falls back into the moat. Tai asks what is flowing well right now, and what would keep it from hardening into the opposite.",
    ],
    lines: [
      "Pull up a reed and its roots come with it. Going forward together with others is fortunate.",
      "Embracing the rough, wading the river, not neglecting the distant, not forming factions. This keeps to the centre.",
      "No plain without a slope, no going without a return. Steadiness under difficulty is no fault; do not worry about trust.",
      "Fluttering down without relying on wealth, joining neighbours without suspicion, out of real trust.",
      "King Di Yi gives his younger sister in marriage. Blessing and great good fortune.",
      "The city wall falls back into the moat. Do not use armies now; give orders within your own town. Even holding firm brings regret.",
    ],
  },
  12: {
    essay: [
      "Pi reverses Tai: heaven above, earth below, each moving away from the other. Communication stops. The judgment says that wrong-minded people prevail and that the steadiness of the noble person does not pay off for now: the great departs and the small arrives. It is a picture of blocked times — in an organisation, a relationship or a society.",
      "The lines treat stagnation as something that can be endured and eventually ended. Holding together with others is steadying; the great person accepts obstruction without bending; shame is held quietly; in the fourth line there is a mandate to act; in the fifth, stagnation begins to end, though one still says 'it may be lost, it may be lost'; and at the top it is overturned. Pi asks what is blocked, and what part of the block you can still work with.",
    ],
    lines: [
      "Pulling up the reed with its roots: staying with those of like mind in a hard time is steadying and fortunate.",
      "Enduring and obedient. Petty people do well; the great person accepts the obstruction and gets through.",
      "Bearing shame. Something wrong is being held inside.",
      "With a mandate, there is no fault. Companions share in the blessing.",
      "Stagnation begins to lift. The great person prospers, but stays alert: 'it could still be lost' — tied to a mulberry tree.",
      "The obstruction is overturned. First blocked, then joy.",
    ],
  },
  13: {
    essay: [
      "Tong Ren places heaven above fire. Fire rises toward the sky, and both share an upward direction. The single yielding line in the second place joins with the strong fifth line across the hexagram. The judgment speaks of fellowship 'in the open country' — not a closed circle of relatives but a wide, public common ground, strong enough to cross the great river.",
      "The lines measure how wide or narrow that fellowship is. At the gate it is open; within the clan it becomes regrettable; then come concealed troops, a wall climbed but not attacked, people who weep before they laugh, and fellowship at the suburbs, still at a distance. Tong Ren asks what a shared purpose actually includes, and whom it quietly leaves out.",
    ],
    lines: [
      "Fellowship at the gate, in the open. No fault.",
      "Fellowship only within the clan. A closed circle brings regret.",
      "Troops hidden in the thicket, watching from the high hill; for three years they do not rise. Suspicion prevents real union.",
      "Climbing the wall but not attacking. Recognising when to stop is fortunate.",
      "People in fellowship first weep and cry out, and later laugh. The great armies succeed in meeting.",
      "Fellowship in the suburbs. Not complete, but no regret.",
    ],
  },
  14: {
    essay: [
      "Da You sets fire above heaven: the sun high in the sky, lighting everything. The one yielding line holds the place of honour in the fifth position, and all the strong lines respond to it. That is the image of great possession — abundance held by someone humble enough to share it. The judgment is simply: supreme success.",
      "The interest lies in how the lines handle abundance. Avoiding contact with what harms; a great wagon to carry the load; a prince who offers his wealth to the Son of Heaven, which a petty person cannot do; not flaunting; trust that is both open and dignified; and blessing from heaven at the top. Da You asks what you have — resources, ability, attention — and what having it requires of you.",
    ],
    lines: [
      "No contact with harm, so no fault. Remember the difficulty, and there will be none.",
      "A great wagon for loading. There is somewhere to go, and no fault.",
      "A prince offers his wealth to the Son of Heaven; a petty person cannot do this.",
      "Not making a show of abundance. No fault.",
      "Trust that is mutual, and also dignified. Fortunate.",
      "Blessed from heaven. Fortunate, and nothing that does not go well.",
    ],
  },
  15: {
    essay: [
      "Qian, modesty, places a mountain beneath the earth. The highest thing is set lower than the ground: something substantial that does not display itself. The commentaries describe the noble person taking from the excess and adding to the lack, weighing things and making them even. It is one of the few hexagrams whose six lines are all favourable.",
      "The lines show modesty in different settings: in a humble person crossing the great river, in modesty that becomes known, in modesty with real achievement behind it, in modesty that is active rather than passive, and in the fifth and sixth lines, modesty that can still act firmly when it must. Qian suggests modesty is not self-erasure but accurate self-measure, which leaves room for others.",
    ],
    lines: [
      "Modest about one's modesty. Such a person can cross the great river. Fortunate.",
      "Modesty that has become known. Steadiness is fortunate.",
      "Modesty with real accomplishment. The noble person carries things through to the end. Fortunate.",
      "Nothing that does not go well: modesty shown in action.",
      "Not using wealth to win over neighbours. Even firm action is beneficial; nothing fails.",
      "Modesty that becomes known allows firm action — setting one's own town in order.",
    ],
  },
  16: {
    essay: [
      "Yu places thunder above earth: thunder bursting out of the ground in spring, and everything stirred into movement. The theme is enthusiasm and readiness — a mood that can rally people, and the music that ancient kings used to move hearts. The judgment says it favours establishing helpers and setting armies in motion.",
      "But the lines are wary of enthusiasm that runs ahead of itself. Boasting about it is unlucky; firm as a rock, the second line sees things before the day is out; looking up for approval brings regret; the fourth line is the true source of the joy; the fifth is chronically ill but does not die; and the last is enthusiasm in the dark, which can still change. Yu asks what is genuinely energising you, and whether it can carry others with it.",
    ],
    lines: [
      "Announcing one's enthusiasm aloud. Unfortunate.",
      "Firm as a rock, not waiting for the end of the day. Steadiness is fortunate.",
      "Looking upward for approval. Delay brings regret.",
      "The source of enthusiasm: great gains. Do not doubt — friends gather like hair in a clasp.",
      "Persistently ill, yet not dying.",
      "Enthusiasm in the dark. Even if it has gone this far, changing course brings no fault.",
    ],
  },
  17: {
    essay: [
      "Sui places lake above thunder. Thunder has withdrawn into the lake, as at the end of autumn; the commentary pictures the noble person going indoors to rest at nightfall. To follow, in this sense, is to move with the time rather than against it. The judgment adds a condition: following brings success only with steadiness, and then there is no fault.",
      "The lines ask whom one follows and why. Changing one's post and going out to meet others is good; clinging to the young boy means losing the grown man, and the reverse; following for gain is dangerous; sincerity in following clarifies things; trust placed in excellence is fortunate; and at the top, the bond is held so firmly that the king makes offerings on the western mountain. Sui asks whether you are following something worth following.",
    ],
    lines: [
      "The standard changes. Steadiness is fortunate; going out of the gate to engage others brings achievement.",
      "Holding on to the young boy, one loses the grown man. A choice of allegiance has a cost.",
      "Holding on to the grown man, one lets the young boy go. Following this way finds what it seeks; staying steady helps.",
      "Following that brings in gain: even when steady, there is danger. With sincerity and clarity, what fault?",
      "Trust in what is excellent. Fortunate.",
      "Held fast and bound to it. The king makes an offering on the western mountain.",
    ],
  },
  18: {
    essay: [
      "Gu sets mountain above wind: wind blocked at the foot of a mountain, air going stale. The character shows worms in a bowl — something left too long that has begun to spoil. The hexagram is about repair: dealing with what earlier people allowed to decay. The judgment says this brings great success and favours crossing the river, and adds the famous timing of three days before and three days after the start.",
      "Most lines speak of correcting the affairs of a father or a mother. A son can repair his father's work; with a mother's affairs one must be gentle; correcting too hard brings a little regret but no great fault; being lenient lets things worsen; repair that earns praise is good; and the last line steps away from serving kings to pursue higher aims. Gu asks what inherited problem needs attention, and how to fix it without simply blaming.",
    ],
    lines: [
      "Correcting what the father spoiled. With a capable son, the father is free of blame. Risky, but ends well.",
      "Correcting what the mother spoiled. One cannot be too rigid here.",
      "Correcting the father's decay too forcefully: a little regret, no great fault.",
      "Tolerating the father's decay. Going on like this brings regret.",
      "Correcting the father's decay, and earning praise for it.",
      "Not serving kings or lords, he sets his own aims higher.",
    ],
  },
  19: {
    essay: [
      "Lin places earth above lake: the land overlooks the water and draws close to it. Two strong lines are growing from the bottom, so the hexagram belongs to the time when light is increasing. Lin means approaching, overseeing, and caring for those one is responsible for. Its judgment adds a warning: in the eighth month there will be misfortune — growth will not last forever.",
      "The lines describe different styles of approach: approach through mutual influence, sweet approach that lacks substance, approach with concern, approach that is complete, wise approach fitting for a great ruler, and generous approach at the top. Lin asks how you show up for the people or work in your care, and whether your attention is real.",
    ],
    lines: [
      "Approaching together, by mutual influence. Steadiness is fortunate.",
      "Approaching together, by mutual influence. Fortunate; nothing that does not go well.",
      "A sweet, easy approach. Nothing is gained; once you are troubled by it, there is no fault.",
      "A complete approach, close and sincere. No fault.",
      "A wise approach, as befits a great ruler. Fortunate.",
      "A generous, warm-hearted approach. Fortunate, and no fault.",
    ],
  },
  20: {
    essay: [
      "Guan places wind above earth: wind passes over the land and touches everything. The image is a tower or high place from which one looks out, and in which one is also seen. The judgment describes the moment of a sacrifice after the hands have been washed and before the offering is made: full of quiet sincerity, enough to inspire respect in those who watch.",
      "The lines grade ways of looking. A child's view is acceptable for small people; looking through a crack in the door suits a sheltered life; looking at one's own life decides whether to go forward or back; looking at the light of the state; looking at one's own life as a ruler; and looking at the lives of others at the top. Guan asks what you are observing — and what others observe in you.",
    ],
    lines: [
      "A child's way of looking. For small people no fault; for the noble person, regret.",
      "Looking through a crack in the door. Fitting only for a sheltered view.",
      "Looking at one's own life to decide whether to advance or withdraw.",
      "Looking at the light of the kingdom. It is right to serve as a guest of the king.",
      "Looking at one's own life. The noble person is free of fault.",
      "Looking at others' lives. The noble person is free of fault.",
    ],
  },
  21: {
    essay: [
      "Shi Ke shows a mouth with something between the teeth: the top and bottom lines are the jaws, and the strong fourth line is what has to be bitten through. Fire and thunder together give clarity and decisive movement. The theme is dealing with an obstruction directly, and in its traditional reading, the fair application of penalties and law.",
      "The lines move from minor penalties to serious ones, and from soft meat to dried meat with bone. Shackles hiding the toes are a small warning; biting into tender meat costs one's nose; biting dried meat finds poison; biting dried meat on the bone finds a metal arrowhead; biting dried meat finds yellow gold; and at the top, a wooden collar covers the ears. Shi Ke asks what is blocking the way, and what it would take to bite through it fairly.",
    ],
    lines: [
      "Feet in stocks, the toes hidden. A small correction early; no fault.",
      "Biting through tender meat, the nose disappears. Going too far, but no fault.",
      "Biting dried meat and meeting poison. A little humiliation, no fault.",
      "Biting dried meat on the bone and finding a metal arrow. It helps to be steady through difficulty. Fortunate.",
      "Biting dried meat and finding yellow gold. Steady in danger: no fault.",
      "A wooden collar that hides the ears. Not listening brings misfortune.",
    ],
  },
  22: {
    essay: [
      "Bi sets mountain above fire: a fire lighting the foot of a mountain, making its surface glow. The theme is adornment and form — the way things are presented, decorated and made graceful. The judgment is modest: success in small matters. Beauty matters, but it is not what decides great affairs.",
      "The lines gradually strip away decoration. Adorning one's toes and walking rather than riding; adorning the beard; glossy and moist; then white adornment, a white horse with wings; adornment in the hills and gardens with a meagre bundle of silk; and finally, plain white adornment, no fault. Bi asks where form serves substance and where it covers it.",
    ],
    lines: [
      "Adorning the toes, leaving the carriage to walk. Choosing the honest, simple way.",
      "Adorning the beard. Form that follows the face it grows on.",
      "Adorned and glistening. Lasting steadiness is fortunate.",
      "Adorned yet plain white, a white horse as if winged. Not a raider, but a suitor.",
      "Adornment in the hills and gardens, with only a small roll of silk. Humiliating at first, fortunate in the end.",
      "Plain white adornment. No fault.",
    ],
  },
  23: {
    essay: [
      "Bo has five yielding lines rising beneath a single strong line at the top: mountain above earth, a mountain being worn down until only its peak remains. The theme is erosion and stripping away. The judgment advises against going anywhere. In such times, the commentary says, those above secure their position by being generous to those below.",
      "The lines picture a bed being eroded from the legs upward: the leg, the frame, then the skin itself. In the middle, one line breaks with its group and is free of fault; another leads a line of court ladies as if they were fish on a string. At the top, a large fruit has not been eaten — the seed of renewal remains. Bo asks what is being worn away, and what core should be left untouched.",
    ],
    lines: [
      "The bed's legs are stripped away. Steadiness is undermined; misfortune.",
      "The bed's frame is stripped away. Steadiness is undermined further.",
      "Stripping, yet no fault — this line breaks from the pattern around it.",
      "The bed is stripped down to the skin. Misfortune.",
      "Leading the palace ladies like a string of fish, gaining favour. Nothing that does not go well.",
      "A great fruit uneaten. The noble person gains a carriage; the petty person loses his house.",
    ],
  },
  24: {
    essay: [
      "Fu places thunder beneath earth. One strong line returns at the very bottom, after Bo has stripped everything away. This is the winter solstice in the old calendar, when light begins to come back. The judgment speaks of going out and coming in without harm, friends arriving without fault, and returning on the way after seven days.",
      "The lines measure how far one has strayed before returning. Not far: no great regret. Return that is gentle and fortunate; repeated return, risky but no fault; walking in the middle of the group and returning alone; return with integrity; and at the top, a confused return that leads to disaster — ten years without being able to set out. Fu asks what you would like to come back to, and how far you have drifted.",
    ],
    lines: [
      "Returning before going far. No great regret; very fortunate.",
      "A gentle, kind return. Fortunate.",
      "Returning again and again. Risky, but no fault.",
      "Walking in the midst of others, returning alone.",
      "A sincere, generous return. No regret.",
      "A confused return. Misfortune and calamity; for ten years the way is blocked.",
    ],
  },
  25: {
    essay: [
      "Wu Wang sets heaven above thunder: thunder rolls everywhere under the sky, and each thing responds according to its own nature. The name means without falseness, without reckless expectation — acting from what is genuine rather than from calculation. The judgment promises great success with steadiness, but warns that one who is not upright will meet trouble, and should not go anywhere.",
      "The lines show that sincerity does not guarantee a predictable outcome. Going forward innocently is fortunate; plough without counting on the harvest; an ox tied up by someone is taken by a passer-by, an unexpected loss for the villager; an illness not caused by one's own error needs no medicine; and at the top, even innocent action brings trouble because the moment is wrong. Wu Wang asks whether you are acting honestly, and whether you can accept what you cannot control.",
    ],
    lines: [
      "Going forward without falseness. Fortunate.",
      "Not ploughing for the harvest, not clearing land for the yield. Doing the work for itself, there is somewhere to go.",
      "Unexpected misfortune: an ox tied by someone is taken by a traveller, and the villager is blamed.",
      "Being able to keep steady. No fault.",
      "An illness one did nothing to cause. Do not rush to medicine; there will be joy.",
      "Acting without falseness, yet at the wrong moment, brings trouble. Nothing goes well.",
    ],
  },
  26: {
    essay: [
      "Da Chu places mountain above heaven: heaven held within a mountain, a great force contained and stored. Where Xiao Chu restrained gently, Da Chu restrains firmly, and accumulates great reserves — of energy, learning and character. The commentary says the noble person stores up knowledge of past words and deeds. The judgment praises not eating at home: taking one's ability out into public service.",
      "The lines show restraint shifting to release. At first there is danger and it is better to stop; the axle is removed from the cart; then a good horse is trained daily for the chariot; a calf's horns are padded with a board; a gelded boar's tusks are harmless; and at the top the road of heaven opens wide. Da Chu asks what you are building up, and when restraint should turn into use.",
    ],
    lines: [
      "There is danger. It is right to stop.",
      "The axle-strap is removed from the cart. Not going is the right choice for now.",
      "Good horses race. It helps to be steady through difficulty and to practise driving and defence every day.",
      "A board on the young bull's horns. Prevention early is greatly fortunate.",
      "The tusks of a gelded boar. Danger handled at the root; fortunate.",
      "The highway of heaven is open. Success.",
    ],
  },
  27: {
    essay: [
      "Yi pictures an open mouth: strong lines at top and bottom are the jaws, the four broken lines inside are the empty space. Mountain above thunder gives the image of a jaw — still above, moving below. The theme is nourishment: what we feed ourselves and others, in food, words and attention. The judgment asks us to observe how someone seeks nourishment and what they choose to put in their mouth.",
      "The lines contrast self-reliance with dependence. Letting go of your own magic tortoise to stare at someone else's food is unfortunate; turning to the wrong source is a mistake; refusing nourishment altogether is worse; seeking support from above while watching like a tiger is fortunate; and the top line is the source of nourishment for others, at risk but fortunate. Yi asks what actually sustains you, and what you sustain.",
    ],
    lines: [
      "You let your sacred tortoise go and gaze at me with drooping jaw. Envying others' nourishment: misfortune.",
      "Turning upside down for nourishment, departing from the norm. Seeking it from the high hill brings misfortune.",
      "Turning against proper nourishment. Even with steadiness, misfortune; for ten years nothing is to be done.",
      "Seeking nourishment from above, which here is fortunate: watching like a tiger, with steady desire. No fault.",
      "Departing from the norm, but staying steady is fortunate. Do not cross the great river yet.",
      "The source of nourishment for others. Aware of the danger, fortunate; it is right to cross the great river.",
    ],
  },
  28: {
    essay: [
      "Da Guo has four strong lines crowded in the middle and weak ends: a ridgepole that sags because the ends cannot bear the weight. Lake above wood — the water has risen over the trees. It is a time of excessive load, when something extraordinary is needed. The judgment still says it is right to have somewhere to go, and success follows.",
      "The lines alternate between excess and balance. Spreading white rushes underneath is careful preparation; a withered willow sprouting new shoots and an old man taking a young wife are unexpected renewals; the ridgepole sags; then it is braced; a withered willow flowering and an old woman taking a young husband are less promising; and at the top, wading into water over one's head. Da Guo asks where a structure is overloaded, and what support would hold it.",
    ],
    lines: [
      "Spreading white rushes underneath. Extra care with a heavy load is no fault.",
      "A withered willow puts out shoots; an old man gets a young wife. Nothing that does not go well.",
      "The ridgepole sags. Misfortune.",
      "The ridgepole is braced. Fortunate, though other ties would bring humiliation.",
      "A withered willow flowers; an old woman gets a young husband. No blame, no praise.",
      "Wading across, the water closes over the head. Misfortune, but no blame.",
    ],
  },
  29: {
    essay: [
      "Kan doubles the trigram of water: danger upon danger, a pit within a pit. Water does not stop at difficulty; it fills the hollow and keeps flowing, never losing its nature. The judgment says that with sincerity the heart gets through, and action earns respect. The repeated pit is about training in danger, not just enduring it.",
      "The lines go deeper into the pit and climb back out. Entering the hollow within the hollow is unfortunate; small gains are possible; pits ahead and behind call for stillness; a jar of wine and a bowl of rice passed through the window are enough; the pit is not overfilled, only levelled; and at the top, bound with ropes in a thicket of thorns. Kan asks what repeated difficulty you are in, and what steady effort will get you through.",
    ],
    lines: [
      "Doubled pit: falling into the hollow within the pit. Misfortune.",
      "In the pit there is danger. Seek small gains only.",
      "Pits ahead and behind, deep and dangerous. Do not move yet.",
      "A jug of wine, a bowl of rice, earthen vessels passed through a window. Simple sincerity is enough; no fault in the end.",
      "The pit is not overflowing, only filled level. No fault.",
      "Bound with ropes and placed among thorns; for three years no way out. Misfortune.",
    ],
  },
  30: {
    essay: [
      "Li doubles the trigram of fire: brightness upon brightness. Fire has no form of its own and clings to what it burns; sun and moon cling to the sky. So Li is about both clarity and dependence. The judgment recommends steadiness and tending a cow — patience and docility as the right partners for intelligence.",
      "The lines move through a day and a life. Confused footsteps at dawn call for respect; yellow light at midday is supremely good; the setting sun brings a choice between song and lament; sudden fire burns out and is discarded; tears and sighs are fortunate; and at the top, the king goes out to set things right, sparing followers. Li asks what you depend on, and how to keep your light steady rather than flaring.",
    ],
    lines: [
      "Footsteps crossing in confusion. With respect, no fault.",
      "Yellow light. Supremely fortunate.",
      "In the light of the setting sun, either drum and sing or lament old age. Misfortune lies in the lament.",
      "Sudden its coming: flaring, dying, discarded.",
      "Tears flowing, sighing in sorrow. Fortunate.",
      "The king goes out to set things right. He takes the leaders, not their followers. No fault.",
    ],
  },
  31: {
    essay: [
      "Xian places lake above mountain. The mountain's stillness holds the lake's moisture, and the lake moistens the mountain: two things influencing each other. The hexagram opens the second part of the Zhou Yi with the meeting of young man and young woman. The judgment speaks of success and steadiness, and says it is fortunate to take a wife.",
      "The lines follow influence through the body, from toes to calves to thighs to the heart and back to the jaw and tongue. Influence at the toes is not yet felt; at the calves, moving too early brings misfortune; at the thighs, following others is regrettable; the heart's influence calls for steadiness, while thoughts going back and forth draw only friends; the back of the neck feels nothing; and at the top, influence is only talk. Xian asks how you are moved by others, and where real feeling begins.",
    ],
    lines: [
      "Influence felt in the big toe. Not yet moving.",
      "Influence in the calves. Acting now is unfortunate; staying put is fortunate.",
      "Influence in the thighs, holding to what one follows. Going on brings humiliation.",
      "Steadiness is fortunate and regret vanishes. Thoughts restless and wavering: only friends follow your thinking.",
      "Influence in the back of the neck. No regret, but no real response either.",
      "Influence in the jaws, cheeks and tongue. Words only.",
    ],
  },
  32: {
    essay: [
      "Heng places thunder above wind: two forces that always accompany each other. The theme is duration — what lasts because it keeps renewing itself, like the sun and moon, or the four seasons. The judgment says it is right to have somewhere to go: endurance is not standing still, but a steady direction maintained over time.",
      "The lines warn against both rigidity and inconstancy. Seeking permanence too deeply and too soon is unfortunate; regret vanishes; failing to keep one's character brings disgrace; hunting in a field without game; constancy that suits one role but not another; and at the top, restless agitation that will not stay. Heng asks what deserves your long-term commitment, and whether you are keeping it in a living way.",
    ],
    lines: [
      "Digging deep for permanence too early. Steadiness here is unfortunate; nothing goes well.",
      "Regret vanishes.",
      "Not keeping one's character constant; disgrace may follow. Humiliation even with steadiness.",
      "A field with no game. Persistence in the wrong place.",
      "Constancy in one's character: the text calls it fortunate for a wife and unfortunate for a husband — steady following suits one role, not another.",
      "Restless, shaken constancy. Misfortune.",
    ],
  },
  33: {
    essay: [
      "Dun places heaven above mountain. The mountain rises, but heaven withdraws higher still and keeps its distance. Two yielding lines advance from below, and the strong lines retreat before them. The theme is withdrawal: stepping back in good time when circumstances turn against you. The judgment says success, and that small steadiness is beneficial.",
      "The lines show that retreat is a skill. The tail end of a retreat is in danger; holding fast as if with yellow oxhide; a retreat tied down by attachments; a voluntary retreat good for the noble person and impossible for the petty one; an admirable retreat; and at the top, a retreat so free and generous that nothing fails to benefit. Dun asks what you need to step back from, and how to leave without bitterness or loss of dignity.",
    ],
    lines: [
      "At the tail of the retreat, exposed. Do not try to go anywhere.",
      "Held fast with yellow oxhide, which no one can loosen. Firm commitment in a difficult place.",
      "A retreat held back by ties. Dangerous; looking after servants and concubines is fortunate.",
      "Retreating while still fond of what one leaves. Fortunate for the noble person, not for the petty one.",
      "A well-timed, admirable retreat. Steadiness is fortunate.",
      "A generous, carefree withdrawal. Nothing that does not go well.",
    ],
  },
  34: {
    essay: [
      "Da Zhuang places thunder above heaven: thunder high in the sky, four strong lines pressing upward. It is great strength, and the judgment adds only one word of advice: steadiness. Strength used without a sense of right becomes mere force. The commentary says the noble person does not tread where propriety does not go.",
      "The image running through the lines is a ram butting a fence. Strength in the toes is premature; steadiness is fortunate; the petty person uses force, the noble person does not, and the ram gets its horns caught; then the fence opens and the strength is like the axles of a great cart; the ram is lost too easily; and finally the ram is stuck, neither able to back out nor go forward. Da Zhuang asks what your strength is for, and whether force is the way to use it.",
    ],
    lines: [
      "Strength in the toes. Pushing forward now brings misfortune.",
      "Steadiness is fortunate.",
      "The petty person uses force; the noble person does not. A ram butts the fence and catches its horns.",
      "The fence opens, the horns are free. Strength like the axle-straps of a great cart.",
      "Losing the ram too easily. No regret.",
      "The ram butts the fence and can neither retreat nor advance. Through hardship, good fortune.",
    ],
  },
  35: {
    essay: [
      "Jin places fire above earth: the sun rising over the land, everything coming into light. The theme is advance and recognition. The judgment pictures a lord of Kang rewarded with many horses and received three times in a single day — a moment when good work is seen and honoured.",
      "The lines ask how to advance with integrity. Advancing and being held back is still fortunate if one stays generous; advancing with sorrow brings blessing from a grandmother; everyone's trust makes regret vanish; advancing like a squirrel is dangerous; do not worry about gain and loss; and at the top, advancing with one's horns, using strength only to put one's own city in order. Jin asks how you want to be seen, and whether progress depends on others' approval.",
    ],
    lines: [
      "Advancing, then held back. Steadiness is fortunate; if not trusted, stay generous and there is no fault.",
      "Advancing, yet anxious. Steadiness is fortunate; great blessing comes from the grandmother.",
      "Trusted by all. Regret vanishes.",
      "Advancing like a squirrel. Holding on here is dangerous.",
      "Regret vanishes. Do not be anxious about gain or loss; going forward is fortunate.",
      "Advancing with the horns, only to set one's own town in order. Risky but fortunate; even so, steadiness brings some humiliation.",
    ],
  },
  36: {
    essay: [
      "Ming Yi puts earth above fire: the sun has gone below the horizon, and its light is hidden or wounded. In such times, the judgment says, it is beneficial to keep steady through difficulty. The commentary points to King Wen and Prince Ji, who kept their inner clarity under a tyrant by veiling it outwardly.",
      "The lines show different ways of guarding light. A bird flies with drooping wings and goes three days without eating; a wound in the left thigh is saved by a strong horse; a hunt in the south catches the chief but should not rush to correct everything; entering the left side of the belly and leaving the gate; Prince Ji hiding his light; and at the top, no light at all — first climbing to heaven, then falling into the earth. Ming Yi asks how to protect what you value when it is not safe to show it.",
    ],
    lines: [
      "Light wounded in flight, wings lowered. The noble person on a journey goes three days without eating; the hosts gossip.",
      "Wounded in the left thigh, saved by a strong horse. Fortunate.",
      "Light wounded in the southern hunt, the chief taken. Do not be hasty in setting everything right.",
      "Entering the left side of the belly, learning the heart of the darkness, then leaving the gate.",
      "Prince Ji's way of hiding his light. Steadiness is beneficial.",
      "Not bright but dark. First rising to the sky, then entering the earth.",
    ],
  },
  37: {
    essay: [
      "Jia Ren places wind above fire: wind rising from a fire, influence spreading outward from the hearth. The hexagram is the household, with the yielding line in the second place and the strong line in the fifth each in their proper positions. The judgment singles out the steadiness of the woman of the house; the commentary extends it to every role in the family, and from family to the state.",
      "The lines move between strictness and warmth. Setting rules early makes regret vanish; managing food from the centre is steady and fortunate; strictness that sometimes stings is better than laughter that turns into shame; enriching the family is greatly fortunate; the king approaches his household with care; and at the top, sincerity and dignity bring good fortune in the end. Jia Ren asks what roles and expectations hold your household together, and whether they are fair.",
    ],
    lines: [
      "Setting boundaries within the home. Regret vanishes.",
      "Not acting on whim, tending the meals at the centre of the house. Steadiness is fortunate.",
      "The household too strict: regret and danger, but fortunate. Women and children laughing freely ends in humiliation.",
      "Enriching the household. Greatly fortunate.",
      "The king comes to his household. Do not worry; fortunate.",
      "Sincere and dignified. Fortunate in the end.",
    ],
  },
  38: {
    essay: [
      "Kui places fire above lake: fire rises, water sinks, and the two move apart. Two daughters live in one house but do not share a will. The judgment is restrained: in small matters, good fortune. Difference does not make every effort impossible; it limits what can be done together, and calls for modest goals.",
      "The lines show estrangement and unexpected reconciliation. A lost horse returns without being chased; meeting the lord in a narrow lane; a cart dragged back and an ox halted, a bad start but a good end; a lonely person finds a trustworthy friend; a relative bites through the skin; and at the top, imagining a pig covered in mud and a cart full of ghosts, drawing a bow and then lowering it because it is not an enemy but a partner. Kui asks whether the difference you see is real, or partly projected.",
    ],
    lines: [
      "Regret vanishes. The lost horse is not chased and comes back by itself. Meeting bad people, no fault.",
      "Meeting the lord in a narrow alley. No fault.",
      "The cart dragged back, the ox stopped, the driver branded. A bad beginning, a good end.",
      "Isolated by opposition, then meeting a good partner. Sincere trust: danger, but no fault.",
      "Regret vanishes. The kin bites through the skin — going forward, what fault?",
      "Alone in opposition: seeing a pig covered in mud, a cart full of ghosts. Drawing the bow, then lowering it — not a raider, but a suitor. Going on, meeting rain, is fortunate.",
    ],
  },
  39: {
    essay: [
      "Jian places water above mountain: a steep slope before you and a torrent ahead. The way is hard in both directions. The judgment says the southwest is favourable and the northeast is not; it is right to see a great person, and steadiness is fortunate. In practice, the advice is to turn toward help and simpler ground rather than force the obstacle.",
      "Four of the six lines repeat one pattern in different ways: going forward meets difficulty, while coming back earns praise, returns to one's people, finds allies or brings great achievement. The other two are different: the official in the second line struggles on for his ruler's sake rather than his own, and in the fifth line friends arrive in the middle of great difficulty. Jian asks what obstacle you are facing, and whether pausing to gather support might work better than pushing.",
    ],
    lines: [
      "Going forward meets obstruction; coming back earns praise.",
      "The king's servant struggles through difficulty after difficulty, not for his own sake.",
      "Going forward meets obstruction, so he comes back.",
      "Going forward meets obstruction; coming back, he finds allies.",
      "In great difficulty, friends arrive.",
      "Going forward meets obstruction; coming back brings great achievement. Fortunate; it is right to see the great person.",
    ],
  },
  40: {
    essay: [
      "Xie places thunder above water: a spring storm breaks, rain falls, and the tension of winter releases. Buds split open. The hexagram follows Jian as relief follows hardship. The judgment advises returning quickly once the problem is solved, and acting early if something still needs to be done.",
      "The lines describe how to handle a moment of release. Simply no fault; catching three foxes and finding a yellow arrow; carrying a load while riding in a carriage invites robbers; releasing one's big toe so friends can come; the noble person releases themselves, and even petty people take note; and at the top, a duke shoots a hawk from a high wall. Xie asks what is ready to be let go, and what tension you are still holding out of habit.",
    ],
    lines: [
      "No fault.",
      "Catching three foxes in the field, gaining a yellow arrow. Steadiness is fortunate.",
      "Carrying a load on one's back while riding in a carriage invites robbers. Steadiness brings humiliation.",
      "Release your big toe; then friends come and trust follows.",
      "Only the noble person can release themselves. Fortunate; even petty people come to trust it.",
      "The duke shoots a hawk on the high wall and takes it. Nothing that does not go well.",
    ],
  },
  41: {
    essay: [
      "Sun places mountain above lake: the lake at the foot of the mountain gives up some of its water, and the mountain is nourished. Something is taken from below and added above. The judgment says that decrease, done with sincerity, is greatly fortunate — and that even two simple bowls are enough for an offering. What matters is the honesty of the gesture, not its size.",
      "The lines treat reduction as an exchange. Dropping one's own affairs to help, but measuring how much to give; benefiting others without diminishing oneself; three walking together lose one, one walking alone finds a friend; reducing one's illness brings joy; someone gives ten pairs of tortoise shells that cannot be refused; and at the top, increase without decrease. Sun asks what could be simplified or given up so that something more important can grow.",
    ],
    lines: [
      "Leaving your own affairs to go and help quickly is no fault, but consider how much to take from yourself.",
      "Steadiness is beneficial; setting out is unfortunate. Increase others without decreasing yourself.",
      "Three people walking together lose one; one person walking finds a companion.",
      "Reducing one's illness, and quickly bringing joy. No fault.",
      "Someone adds ten pairs of tortoise shells that cannot be refused. Greatly fortunate.",
      "Increase without decrease. No fault; steadiness is fortunate. One gains helpers, though not a household of one's own.",
    ],
  },
  42: {
    essay: [
      "Yi places wind above thunder: wind and thunder strengthen each other. Above gives to below — the reverse of Sun — and the people's well-being grows. The judgment says it is beneficial to have somewhere to go and to cross the great river. Increase is a time for undertakings, not hoarding.",
      "The lines show how gain should be used. A great work begun is greatly fortunate; ten pairs of tortoise shells are given and the king makes offerings to heaven; increase comes through misfortune, met with sincerity; a trusted adviser can move the capital; a sincere and kind heart needs no asking; and at the top, someone who increases no one is struck, because their heart is unsteady. Yi asks how gains can be turned outward, toward others and toward real projects.",
    ],
    lines: [
      "It is right to undertake great works. Greatly fortunate, no fault.",
      "Someone adds ten pairs of tortoise shells that cannot be refused. Lasting steadiness is fortunate; the king makes offerings to God.",
      "Increase through misfortune, no fault. With sincerity, walking the middle path and reporting with the jade token.",
      "Walking the middle path and advising the duke, who follows. It is right to be trusted with moving the capital.",
      "A sincere, kind heart: no need to ask — greatly fortunate. People trust and return that kindness.",
      "Increasing no one; someone strikes him. The heart is not constant. Misfortune.",
    ],
  },
  43: {
    essay: [
      "Guai has five strong lines advancing on a single weak line at the top: lake above heaven, water rising so high it must break through. The theme is resolution — a decisive break with something harmful. But the judgment insists on doing it openly: announce it at the king's court, speak with sincerity, warn your own town, and do not rely on arms.",
      "The lines balance boldness and restraint. Strength in the toes is premature and blameworthy; alarm and cries at night need not be feared if prepared; being visibly fierce brings trouble, though walking alone in the rain may bring resentment without fault; no skin on the buttocks, walking with difficulty; cutting weeds resolutely, walking the middle way; and at the top, no cry, an unhappy end. Guai asks what needs to be ended, and how to end it openly and fairly.",
    ],
    lines: [
      "Strength in the toes, going forward before one can win. A fault.",
      "Alarm and shouting; armed men at night. Do not worry.",
      "Strength showing in the cheekbones: misfortune. The noble person walks alone resolutely in the rain, is splashed and resented, but no fault.",
      "No skin on the buttocks, walking with hesitation. Led like a sheep, regret would vanish — but he hears and does not believe.",
      "Clearing weeds with full resolve, walking the middle way. No fault.",
      "No cry. In the end, misfortune.",
    ],
  },
  44: {
    essay: [
      "Gou reverses Guai: one yielding line has suddenly appeared at the bottom beneath five strong ones. Wind under heaven reaches everywhere. The judgment is blunt: the woman is strong; do not marry her. In the old reading, a small influence that looks harmless can grow quickly, and should be recognised early.",
      "The lines consider how to meet such an influence. Tie it to a metal brake; a bag with fish is no fault, but not to be shared with guests; walking with difficulty; a bag with no fish brings misfortune; leaves of the qi tree wrap a melon, hiding its beauty, until something falls from heaven; and at the top, meeting with the horns — humiliating, but no fault. Gou asks what new influence has entered your situation, and whether you are meeting it with clear eyes.",
    ],
    lines: [
      "Tied to a metal brake: steadiness is fortunate. Going forward meets misfortune, like a thin pig that keeps restless.",
      "Fish in the wrapper. No fault, but not for the guests.",
      "No skin on the buttocks, walking with difficulty. Danger, but no great fault.",
      "No fish in the wrapper. Misfortune arises.",
      "A melon wrapped in the leaves of the qi tree, its beauty kept hidden. Something falls from heaven.",
      "Meeting with the horns. Humiliation, but no fault.",
    ],
  },
  45: {
    essay: [
      "Cui places lake above earth: water gathering on the land into a lake. People gather too, around a leader, a shrine or a shared purpose. The judgment speaks of the king approaching his temple, of seeing the great person, and of large offerings. Gathering needs a centre, and it needs something worth gathering for.",
      "The lines show how people join or fail to join. Sincerity not carried through brings confusion, then laughter after a cry; being drawn in is fortunate, and even a small offering is acceptable when sincere; sighing at not belonging; great good fortune for the fourth line; gathering around a position without trust needs lasting virtue; and at the top, sighs and tears, but no fault. Cui asks what draws people together around you, and what keeps them.",
    ],
    lines: [
      "Sincerity not seen through: confusion and gathering. A cry, then a handshake and laughter. Do not worry.",
      "Being drawn in is fortunate. With sincerity, even a small spring offering is enough.",
      "Gathering with sighs, nothing goes well. Going on is no fault, a little humiliation.",
      "Great good fortune, no fault.",
      "Gathering around a position, no fault; but trust is lacking. Lasting, steady virtue makes regret vanish.",
      "Sighs and tears. No fault.",
    ],
  },
  46: {
    essay: [
      "Sheng places earth above wood: a tree growing up out of the ground. Its growth is steady and gradual, adding a little each day. The judgment calls it supremely successful, advises seeing the great person without worry, and says that setting out toward the south is fortunate.",
      "The lines rise one level at a time. Rising with trust is greatly fortunate; a sincere small offering is enough; climbing into an empty town meets no resistance; the king makes offerings on Mount Qi; climbing the steps one by one; and at the top, rising in the dark, which calls for unceasing steadiness. Sheng asks what you are growing toward, and whether you are taking it a step at a time.",
    ],
    lines: [
      "Rising with trust. Greatly fortunate.",
      "With sincerity, even a small spring offering is enough. No fault.",
      "Rising into an empty town.",
      "The king makes offerings on Mount Qi. Fortunate, no fault.",
      "Steadiness is fortunate: rising step by step.",
      "Rising in the dark. Only unceasing steadiness helps.",
    ],
  },
  47: {
    essay: [
      "Kun, exhaustion, places lake above water: the water has drained out of the lake below, and the lake is empty. Strong lines are hemmed in by weak ones. The judgment says that the great person, holding steady, still finds success and no fault — but words will not be believed. In times of exhaustion, actions count more than explanations.",
      "The lines describe people cornered in different ways. Sitting under a bare tree in a dark valley for three years; exhausted by food and wine, with honours arriving; trapped by rocks and leaning on thorns, coming home to find no wife; arriving slowly in a golden carriage; nose and feet cut off, yet slowly coming to joy; and at the top, entangled in creepers, saying 'moving brings regret' — yet with regret acknowledged, setting out is fortunate. Kun asks where you feel drained, and what small honest action is still possible.",
    ],
    lines: [
      "Sitting exhausted under a bare tree, entering a dark valley. For three years nothing is seen.",
      "Exhausted amid wine and food; the red knee-bands come. It is right to make offerings; setting out is unfortunate, but no fault.",
      "Trapped by stone, leaning on thorns. Entering the house, he does not see his wife. Misfortune.",
      "Coming slowly, held up in a golden carriage. Humiliation, but an end is reached.",
      "Nose and feet cut, trapped by the red knee-bands. Slowly there is joy; it is right to make offerings.",
      "Entangled in vines, unsteady. Saying 'if I move I will regret it' — yet with regret, setting out is fortunate.",
    ],
  },
  48: {
    essay: [
      "Jing places water above wood: a wooden bucket lowered into the water and drawn up again. The town may move, the judgment says, but the well does not; people come and go, and draw from it. It is an image of a shared resource that sustains everyone, provided it is maintained and the rope reaches the water.",
      "The lines move from neglect to renewal. A muddy well no one drinks from, an old well no birds visit; a well where fish are shot and the jug leaks; a well cleaned but unused, which grieves the heart; the well being lined; a clear cold spring that is drunk; and at the top, the well left uncovered for all, greatly fortunate. Jing asks what common source you depend on — and what you do to keep it clean.",
    ],
    lines: [
      "A muddy well, not drunk from. An old well, no birds come.",
      "Shooting at fish in the well; the jug is broken and leaks.",
      "The well is cleaned but nobody drinks. It saddens the heart: it could be drawn. If the king were wise, all would share the blessing.",
      "The well is being lined with stone. No fault.",
      "The well is clear: a cold spring, and people drink.",
      "The well is drawn and left uncovered. With sincerity, greatly fortunate.",
    ],
  },
  49: {
    essay: [
      "Ge places lake above fire: water and fire inside one vessel, each trying to put out or boil away the other. Something has to change. The character originally meant an animal hide stripped and worked into leather, and came to mean revolution or reform. The judgment says that only on the day it is complete will the change be trusted — then it brings great success, and regret vanishes.",
      "The lines treat change as a process that must earn trust. At first, bound with yellow oxhide, it is too early; then, on the right day, change is fortunate; going too fast is dangerous, and the change must be discussed three times; with trust, the mandate is changed; the great person changes like a tiger's stripes, trusted before divination; and the noble person changes like a leopard, while petty people change only their faces. Ge asks what needs to change, why now, and whether others understand the reasons.",
    ],
    lines: [
      "Bound with the hide of a yellow ox. Too soon to change.",
      "On the day of completion, make the change. Going forward is fortunate, no fault.",
      "Setting out is unfortunate; steadiness is dangerous. When talk of change has gone round three times, there is trust.",
      "Regret vanishes. With trust, changing the mandate is fortunate.",
      "The great person changes like a tiger. Trusted even before consulting the oracle.",
      "The noble person changes like a leopard; petty people change their faces. Setting out is unfortunate; staying steady is fortunate.",
    ],
  },
  50: {
    essay: [
      "Ding pictures a bronze cauldron: the broken bottom line is its legs, the strong lines its belly, the broken fifth its ears, and the strong top its carrying rings. Fire burns under wood, cooking food for offering and for guests. After Ge's upheaval, Ding establishes the new order and gives it substance. The judgment: greatly fortunate, success.",
      "The lines trace the cauldron's condition. Turned upside down to empty out old residue; full of food, with a jealous companion who cannot reach; its ears changed so it cannot be lifted, and the pheasant fat goes uneaten, until rain comes; a broken leg spills the duke's meal; yellow ears and golden rings; and at the top, jade rings, greatly fortunate. Ding asks what vessel — an institution, a practice, a role — holds what you value, and whether it is in good repair.",
    ],
    lines: [
      "The cauldron with legs turned up, clearing out what is stale. Taking a concubine for the sake of her son: no fault.",
      "The cauldron holds food. My companion is resentful but cannot reach me. Fortunate.",
      "The cauldron's ears are altered, its movement blocked; the pheasant fat is not eaten. When rain falls, regret fades; fortunate in the end.",
      "The cauldron's leg breaks and the duke's meal spills. The cauldron is soiled. Misfortune.",
      "The cauldron with yellow ears and golden carrying-rings. Steadiness is beneficial.",
      "The cauldron with jade rings. Greatly fortunate; nothing that does not go well.",
    ],
  },
  51: {
    essay: [
      "Zhen doubles thunder: shock upon shock. A single strong line breaks out beneath two yielding ones, twice over. The judgment describes the moment thunder comes, people looking around in alarm and then laughing; the thunder shakes a hundred li, but the one who presides over the offering does not drop the ladle or the wine.",
      "The lines show different responses to shock. Fear first, then laughter, is fortunate; shock comes with danger, the treasures are lost, but do not chase them — they return in seven days; shock that unsettles can still lead to right action; shock gets stuck in the mud; shock comes and goes, but nothing important is lost; and at the top, shock that sends someone trembling, which is better faced before it reaches you. Zhen asks what has shaken you, and what you held on to.",
    ],
    lines: [
      "Thunder comes and there is alarm; afterwards, laughing words. Fortunate.",
      "Thunder brings danger; treasures are lost. Climb the nine hills; do not chase them — in seven days they return.",
      "Shaken and unsettled. If the shock moves you to act, there is no trouble.",
      "Thunder gets stuck in the mud.",
      "Thunder comes and goes; danger. Yet nothing is lost, and there is still work to do.",
      "Thunder brings trembling, eyes darting. Setting out is unfortunate. If it has not reached you but your neighbour, no fault, though there is talk.",
    ],
  },
  52: {
    essay: [
      "Gen doubles the mountain: stillness upon stillness. The judgment is one of the most quoted passages of the Zhou Yi: keeping the back still so that one no longer feels the body, walking in the courtyard without seeing the people there. Stillness here is not escape but a calm that lets action and rest come at the right time.",
      "Like Xian, the lines move up the body: keeping still the toes, the calves, the waist, the trunk, the jaw. Keeping the toes still before setting out is no fault; the calves cannot follow; holding the waist rigid is dangerous and burns the heart; the trunk at rest is no fault; the jaw still, words come in order; and at the top, honest, settled stillness. Gen asks where you need to stop, and what quiet would let you see clearly.",
    ],
    lines: [
      "Keeping the toes still. No fault; lasting steadiness is beneficial.",
      "Keeping the calves still, unable to help the one he follows. His heart is not glad.",
      "Keeping the waist still, the spine rigid. Danger; the heart smoulders.",
      "Keeping the trunk still. No fault.",
      "Keeping the jaw still; words have order. Regret vanishes.",
      "Honest, steady stillness. Fortunate.",
    ],
  },
  53: {
    essay: [
      "Jian places wood above mountain: a tree on a mountain grows slowly, and its growth lasts. The traditional illustration is a marriage arranged step by step, following the proper sequence. The judgment: the maiden is given in marriage, fortunate; steadiness is beneficial. Gradual development respects each stage.",
      "Each line shows the wild goose landing a little higher: at the shore, on the rock, on the plateau, in the tree, on the hill, and on the heights. A young person at the shore is in danger but no fault; on the rock there is food and ease; on the plateau a husband leaves and does not return; on a tree branch the goose finds a flat perch; on the hill a wife is barren for three years, but in the end prevails; and at the top, its feathers become ornaments. Jian asks which step you are on, and whether you are trying to skip some.",
    ],
    lines: [
      "The goose gradually reaches the shore. A young person is in danger and is criticised; no fault.",
      "The goose gradually reaches the rock. Eating and drinking in harmony. Fortunate.",
      "The goose gradually reaches the plateau. The husband goes and does not return; the wife conceives but does not raise the child. It is right to guard against raiders.",
      "The goose gradually reaches the tree and perhaps finds a flat branch. No fault.",
      "The goose gradually reaches the hill. For three years the wife does not conceive; in the end nothing prevails against her. Fortunate.",
      "The goose gradually reaches the heights. Its feathers can be used in the ceremonial dance. Fortunate.",
    ],
  },
  54: {
    essay: [
      "Gui Mei places thunder above lake: the younger sister follows the moving older one. In the ancient marriage custom, younger sisters sometimes went with a bride as secondary wives. The judgment is stern: setting out is unfortunate, nothing goes well. The hexagram is about entering a position that is not truly one's own, on terms set by others.",
      "The lines show how to carry such a position with dignity. As a secondary wife, like the lame who can still walk; seeing with one eye, holding the steadiness of a recluse; waiting, and going back as a secondary wife; delaying the marriage until the time is right; King Di Yi gives his sister in marriage, and the bride's sleeves are less fine than her companion's; and at the top, a basket with no fruit, a sheep with no blood — the ritual is empty. Gui Mei asks what position you have accepted, and on whose terms.",
    ],
    lines: [
      "The younger sister married as a secondary wife. The lame can still walk; setting out is fortunate.",
      "The one-eyed can still see. The steadiness of a quiet person is beneficial.",
      "The younger sister waits, and returns as a secondary wife.",
      "The younger sister delays her marriage; a late marriage has its time.",
      "King Di Yi gives his sister in marriage; the bride's sleeves are not as fine as her companion's. The moon almost full. Fortunate.",
      "The woman holds a basket with no fruit; the man cuts the sheep and no blood flows. Nothing goes well.",
    ],
  },
  55: {
    essay: [
      "Feng places thunder above fire: movement and clarity together, the peak of abundance. The judgment says the king attains it, and advises not to worry but to be like the sun at noon. Yet the sun at noon begins to decline. The commentary adds that what is full will wane, and the moon that is full will darken.",
      "The lines are full of darkness at midday. Meeting one's equal partner is no fault; a screen so thick that stars are seen at noon, which brings suspicion; even denser cover, breaking one's right arm; meeting the lord of one's kind; bringing in brilliant people brings praise; and at the top, a great house shading the family, an empty door, no one seen for three years. Feng asks how to use a full moment well, knowing it will not last.",
    ],
    lines: [
      "Meeting one's matching partner. Even for ten days, no fault; going on brings honour.",
      "Screened so thickly that the Dipper is seen at noon. Going on brings suspicion; sincerity opens the way.",
      "Covered even more thickly, small stars at noon. The right arm breaks. No fault.",
      "Screened so thickly that the Dipper is seen at noon. Meeting the lord of one's kind is fortunate.",
      "Bringing in brilliance; there is celebration and praise. Fortunate.",
      "A great house, a screened household. Looking through the door, it is silent and empty; for three years no one is seen. Misfortune.",
    ],
  },
  56: {
    essay: [
      "Lü places fire above mountain: fire running over a mountain, never staying long in one place. It is the image of the traveller, the stranger without a home of their own. The judgment: success in small things; steadiness in travel is fortunate. Away from home, one's influence is limited, and caution and courtesy matter.",
      "The lines show travellers who keep or lose their footing. Petty fussing invites trouble; reaching an inn with money and a loyal servant; the inn burns and the servant is lost; resting with money and an axe, yet uneasy; shooting a pheasant and losing one arrow, but gaining praise; and at the top, a bird burns its nest, the traveller laughs first and wails after, and the ox is lost too easily. Lü asks how you carry yourself somewhere that is not yours.",
    ],
    lines: [
      "A traveller fussing over trifles. This brings disaster on himself.",
      "The traveller reaches an inn, with his money and a loyal young servant.",
      "The traveller's inn burns, and he loses his young servant. Steadiness is dangerous.",
      "The traveller in a resting place, with money and an axe. His heart is not at ease.",
      "Shooting a pheasant, losing one arrow. In the end, praise and a position.",
      "A bird burns its own nest. The traveller laughs, then wails. The ox is lost too easily. Misfortune.",
    ],
  },
  57: {
    essay: [
      "Xun doubles the trigram of wind: one yielding line beneath two strong ones, twice over. Wind gets into everything, not by force but by persistence. The judgment: success in small things; it is right to have somewhere to go and to see the great person. The commentary links it to repeated instructions that gradually take effect.",
      "The lines balance gentleness with resolve. Advancing and retreating, it helps to have a soldier's firmness; under the bed, many diviners and shamans are consulted; repeated, anxious penetration brings humiliation; regret vanishes and three kinds of game are caught; no good beginning but a good end, with three days before and after the change; and at the top, under the bed again, having lost money and axe. Xun asks where steady, quiet influence would work better than pressure.",
    ],
    lines: [
      "Advancing and retreating. The firmness of a soldier is beneficial.",
      "Gentle penetration under the bed; many scribes and shamans are used. Fortunate, no fault.",
      "Penetration over and over. Humiliation.",
      "Regret vanishes. In the hunt, three kinds of game are taken.",
      "Steadiness is fortunate; regret vanishes; all goes well. No beginning, but an end — three days before the change, three days after.",
      "Penetration under the bed, losing one's money and axe. Steadiness brings misfortune.",
    ],
  },
  58: {
    essay: [
      "Dui doubles the trigram of lake: one yielding line above two strong ones, joy expressed outwardly over firmness within. Two lakes connected nourish each other; the commentary pictures friends studying and talking together. The judgment: success, and steadiness is beneficial. Joy that lasts rests on sincerity rather than flattery.",
      "The lines separate real joy from its imitations. Harmonious joy is fortunate; sincere joy makes regret vanish; joy that comes seeking you is unfortunate; joy that is weighed and not yet settled, with an illness kept at bay; trust placed in what wears you down is dangerous; and at the top, joy that is lured out by others. Dui asks what genuinely gives you joy, and what only pleases for a moment.",
    ],
    lines: [
      "Harmonious joy. Fortunate.",
      "Sincere joy. Fortunate; regret vanishes.",
      "Joy that comes to you uninvited. Misfortune.",
      "Joy weighed and not yet at peace. Keeping the illness at a distance brings happiness.",
      "Trusting in what strips away. Danger.",
      "Joy drawn out by enticement.",
    ],
  },
  59: {
    essay: [
      "Huan places wind above water: wind blowing over the water, breaking up ice and scattering its surface. The theme is dispersal — of rigidity, of selfishness, of groups that have hardened apart. The judgment says the king approaches his temple and it is right to cross the great river. Shared ritual and shared purpose bring the scattered back together.",
      "The lines show what can usefully be dissolved. Rescuing with a strong horse is fortunate; rushing to one's support makes regret vanish; dispersing one's own self-concern; dispersing one's faction, greatly fortunate, and gathering like a hill; dispersing a great proclamation like sweat, and the royal stores; and at the top, dispersing one's blood and going far away. Huan asks what has hardened in you or around you, and what would loosen it.",
    ],
    lines: [
      "Rescuing with the strength of a horse. Fortunate.",
      "At the time of dispersal, running to what supports you. Regret vanishes.",
      "Dispersing one's own self-interest. No regret.",
      "Dispersing one's group: greatly fortunate. Dispersing to gather a hill — beyond what ordinary people would think of.",
      "Dispersing great proclamations like sweat; dispersing the king's stores. No fault.",
      "Dispersing the blood, going far away. No fault.",
    ],
  },
  60: {
    essay: [
      "Jie places water above lake. A lake can hold only so much; beyond that, water overflows. The character is the joint in a bamboo stem — the division that gives the stalk its strength. The theme is limitation and measure. The judgment: success, but bitter limits cannot be kept steady.",
      "The lines show limits used well and badly. Not going beyond the inner courtyard is no fault; not going beyond the outer gate becomes a missed chance; not keeping limits leads to lament, though there is no one to blame but oneself; peaceful limits bring success; sweet limits are fortunate and earn respect; and bitter limits at the top bring misfortune if held to, though regret fades. Jie asks what boundaries help you, and which ones have turned bitter.",
    ],
    lines: [
      "Not going out past the courtyard door. No fault.",
      "Not going out past the gate of the yard. Misfortune: the moment is missed.",
      "Not keeping limits, then lamenting. No one else is at fault.",
      "Contented, peaceful limits. Success.",
      "Sweet limits. Fortunate; going on brings honour.",
      "Bitter limits. Persisting in them is unfortunate; regret fades.",
    ],
  },
  61: {
    essay: [
      "Zhong Fu places wind above lake: wind moving over the water, stirring the surface, felt everywhere. Two yielding lines lie at the centre, empty, surrounded by strong ones — an open heart within a firm frame. The theme is inner truth or sincerity, trust strong enough to reach even pigs and fishes, as the judgment says, and to cross the great river.",
      "The lines show trust given, returned and overreaching. Being at ease is fortunate, other plans bring unrest; a crane calls in the shade and its young answer, 'I have a good cup; I will share it with you'; finding a counterpart, now drumming, now stopping, now weeping, now singing; the moon nearly full, one horse of the pair lost; sincerity that binds others together; and at the top, a rooster trying to fly to heaven. Zhong Fu asks whom you trust, and what makes your words believable.",
    ],
    lines: [
      "At ease, it is fortunate. Having other designs brings unrest.",
      "A crane calls in the shade and its young answer. I have a fine cup; I will share it with you.",
      "Meeting an opponent: now drumming, now stopping, now weeping, now singing.",
      "The moon nearly full; one horse of the team is lost. No fault.",
      "Sincerity that binds people together. No fault.",
      "The sound of wings rising to heaven. Steadiness brings misfortune.",
    ],
  },
  62: {
    essay: [
      "Xiao Guo places thunder above mountain: thunder over the mountain, its sound limited by the height. Two strong lines are inside, four weak ones outside — the small exceeds. The judgment says it is right to do small things, not great ones; a flying bird leaves its call behind; going up is wrong, staying below is greatly fortunate.",
      "The lines are full of birds that fly too high and caution about overstepping. A bird flying brings misfortune; passing the grandfather to meet the grandmother, not reaching the ruler but meeting the minister; not taking precautions invites harm; no fault, meeting without overstepping, but danger in going on; dense clouds without rain from the western outskirts, the duke shooting into a cave; and at the top, not meeting but passing by, the bird flies away. Xiao Guo asks where small care is better than large ambition.",
    ],
    lines: [
      "A bird flies up. Misfortune.",
      "Passing the grandfather, meeting the grandmother; not reaching the ruler, meeting the minister. No fault.",
      "Not guarding against something beyond the usual, one may be attacked. Misfortune.",
      "No fault: meeting without passing beyond. Going on is dangerous and needs caution; do not act on lasting steadiness.",
      "Dense clouds, no rain, from our western outskirts. The duke shoots and takes the one in the cave.",
      "Not meeting, passing beyond. The bird flies far away. Misfortune, a calamity of one's own making.",
    ],
  },
  63: {
    essay: [
      "Ji Ji places water above fire: water in a pot over the flame, everything in its proper place. Every line in this hexagram stands in the position that suits it. The judgment says success in small things, steadiness is beneficial — and then adds the warning that defines the hexagram: fortunate at the beginning, disorder at the end.",
      "The lines treat completion as fragile. Dragging the wheels, a fox wets its tail; a woman loses the curtain of her carriage and should not chase it, for it comes back in seven days; the high ancestor takes three years to conquer the Demon Country; rags ready for a leaking boat; the eastern neighbour's ox sacrifice matters less than the western neighbour's simple offering; and at the top, a head soaked in the crossing. Ji Ji asks what you have finished, and what it will take to keep it from slipping.",
    ],
    lines: [
      "Dragging back the wheels; the fox wets its tail. No fault.",
      "The woman loses her carriage curtain. Do not chase it; in seven days it returns.",
      "The high ancestor attacks the Demon Country and takes three years to win. Petty people should not be used.",
      "There are rags for when the boat leaks. Be on guard all day.",
      "The eastern neighbour slaughters an ox; it is not as good as the western neighbour's small spring offering, which truly receives blessing.",
      "The head gets wet. Danger.",
    ],
  },
  64: {
    essay: [
      "Wei Ji reverses Ji Ji: fire above water, each moving away from the other, and no line in its proper place. The book ends here, not with completion but with something still unfinished. The judgment pictures a young fox almost across the river who wets its tail at the last moment: nothing goes well.",
      "Yet the lines move steadily toward order. Wetting the tail too soon is humiliating; dragging the wheels is steady and fortunate; not yet across, setting out is unfortunate, yet crossing the great river is beneficial; attacking the Demon Country, rewarded after three years; the noble person's light shines with sincerity; and at the top, drinking wine with trust, no fault — unless one soaks one's head. Wei Ji asks what is still in progress, and treats unfinished as a living state rather than a failure.",
    ],
    lines: [
      "The fox wets its tail. Humiliation.",
      "Dragging back the wheels. Steadiness is fortunate.",
      "Not yet across: setting out is unfortunate. It is still right to cross the great river.",
      "Steadiness is fortunate; regret vanishes. Moving to attack the Demon Country, after three years one is rewarded with a great state.",
      "Steadiness is fortunate; no regret. The noble person's light is sincere. Fortunate.",
      "Trust while drinking wine; no fault. But if the head is soaked, trust loses what is right.",
    ],
  },
};
