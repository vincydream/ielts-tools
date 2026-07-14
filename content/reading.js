/* Reading technique lessons + practice questions. Add a new lesson by pushing an object here. */

export const READING_LESSONS = [
  {
    id: 'reading-tfng',
    section: 'Reading',
    title: 'True / False / Not Given: The Three-Way Test',
    subtitle: "IELTS Reading's most costly question type — master the gap between absolute qualifiers and not mentioned vs. contradicted",
    body: `
      <p>A TFNG question isn't really asking "does the passage say this or not" — it's testing <strong>the logical relationship between the statement and the passage</strong>. You must cleanly separate three relationships:</p>
      <div class="rule">
        <div class="rule-label">TRUE</div>
        The passage contains this information, and the statement is a <strong>paraphrase</strong> of it. Note — a paraphrase, not a word-for-word copy. Word-for-word overlap is often actually a trap.
      </div>
      <div class="rule">
        <div class="rule-label">FALSE</div>
        The passage contains this information, but the statement <strong>directly contradicts</strong> it. You must be able to point to an explicit opposing fact in the text.
      </div>
      <div class="rule">
        <div class="rule-label">NOT GIVEN</div>
        The passage <strong>never mentions</strong> this information, or only mentions half of it. "The passage doesn't say" is NOT GIVEN — don't fill the gap with your own inference.
      </div>
      <p><em>Most common trap</em>: the statement contains absolute words like <strong>always / never / only / all / must / most</strong>. If the passage only says "often / usually / many", the statement is exaggerating — that makes it FALSE, not TRUE.</p>
      <p><em>Second trap</em>: don't use common-sense reasoning. "The author says A is better" does not mean "B is worse" unless the passage states it explicitly.</p>
    `,
    questions: [
      {
        context: 'While correlation between rising sea-surface temperatures and coral bleaching events has been documented extensively since the 1980s, <span class="highlight">several researchers caution that temperature alone cannot account for the variability observed across reef systems</span>; localised factors such as water flow and pre-existing bacterial communities appear to modulate a reef\'s vulnerability considerably.',
        prompt: 'Rising sea temperature is the only factor that determines whether a reef will bleach.',
        options: ['True', 'False', 'Not Given'],
        answer: 1,
        insight: {
          en: 'The passage explicitly states that "temperature alone cannot account for the variability" — that directly rules out the claim that temperature is the only factor. Don\'t be thrown by the hedging phrase "several researchers caution": the substantive point is that other factors (water flow, bacterial communities) also matter. FALSE, not NG, because the passage takes a clear position.',
          zh: '原文明确说"温度本身无法解释差异性"——直接否定了"温度是唯一因素"的说法。看到"several researchers caution"这类缓冲语气时不要被绕进去，实质内容是：水流、细菌群落等其他因素也起作用。这是 FALSE，不是 NG，因为原文表达了明确立场。'
        }
      },
      {
        context: 'Historians have traditionally argued that the collapse of the trade network in the region followed directly from a prolonged drought that decimated agricultural yields. However, <span class="highlight">recent tree-ring analysis indicates that the drought began only after trade routes had already been disrupted by political fragmentation</span>, suggesting that economic collapse may have exacerbated, rather than resulted from, environmental stress.',
        prompt: 'The drought caused the trade network to collapse.',
        options: ['True', 'False', 'Not Given'],
        answer: 1,
        insight: {
          en: 'This is a reversed-causality trap. The "traditional" view (drought → collapse) is exactly what the statement claims, but the passage\'s newer evidence flips the sequence: political fragmentation disrupted trade first, and the drought came after — possibly even worsened by the collapse, not the other way round. Whenever a passage contrasts "traditionally believed X" with "however, recent evidence suggests Y", the statement matching the old view is almost always the trap.',
          zh: '这是因果颠倒陷阱。"传统观点"（干旱→贸易崩溃）正是陈述所说的，但原文的新证据把顺序反过来了：政治分裂先扰乱了贸易，干旱是后来才出现的——甚至可能是经济崩溃加剧了环境压力，而非反过来。凡是原文用"传统上认为 X，但是最新证据显示 Y"这种结构时，符合"传统观点"的陈述几乎都是陷阱。'
        }
      },
      {
        context: 'A 2019 survey found that nearly two-thirds of first-year university students in the sample reported feeling unprepared for independent study, <span class="highlight">a figure that had risen only marginally since a comparable survey conducted a decade earlier</span>.',
        prompt: 'The proportion of students feeling unprepared for independent study has more than doubled over the past decade.',
        options: ['True', 'False', 'Not Given'],
        answer: 1,
        insight: {
          en: 'The passage says the figure "rose only marginally" — a small increase. "More than doubled" is a huge exaggeration of that. Whenever a statement gives a specific multiplier or percentage ("doubled", "tripled", "50% more"), check whether the passage actually gives a matching figure — here it deliberately doesn\'t, it just qualifies the change as marginal.',
          zh: '原文说这个数字"只是略微上升"——涨幅很小。"翻了不止一倍"是对此的严重夸大。任何时候陈述给出具体倍数或百分比（"翻倍"、"增加三倍"、"多 50%"），回头检查原文是否有对应数字——这里原文刻意没给具体数字，只说变化"轻微"。'
        }
      },
      {
        context: 'Although the study\'s authors acknowledge that sample size limits the generalisability of their conclusions, <span class="highlight">they maintain that the observed pattern — an increase in self-reported anxiety correlating with increased social media use among the surveyed cohort — warrants further investigation using larger, more representative samples</span>.',
        prompt: 'The study proves that social media use causes anxiety.',
        options: ['True', 'False', 'Not Given'],
        answer: 1,
        insight: {
          en: 'The passage only claims a correlation and explicitly limits its own conclusions ("sample size limits generalisability... warrants further investigation"). "Proves...causes" claims both certainty and causation — the opposite of how the authors describe their own study. This is FALSE, not NG, because the passage actively pushes back against a claim this strong.',
          zh: '原文只说是"相关性"，并且明确限定了自己的结论（"样本量限制了普适性……有待进一步研究"）。"证明……导致"既声称确定性又声称因果关系——恰恰和作者对自己研究的定性相反。这是 FALSE，不是 NG，因为原文主动否定了这种强度的说法。'
        }
      },
      {
        context: '<span class="highlight">The revised curriculum introduces mandatory statistics modules for all first-year humanities students, a change the department attributes to growing demand from employers for quantitatively literate graduates.</span>',
        prompt: 'Employers were consulted directly before the curriculum was revised.',
        options: ['True', 'False', 'Not Given'],
        answer: 2,
        insight: {
          en: 'The passage says the change is "attributed to" employer demand — that\'s the department\'s stated reason, not evidence of a consultation process. "Attributed to X" tells you the motivation; it says nothing about how that information was gathered. Don\'t upgrade a stated reason into a described process — that\'s exactly the kind of over-inference NOT GIVEN is built to catch.',
          zh: '原文说这项改变"归因于"雇主需求——这是院系给出的理由，不代表存在一个"咨询"的过程。"归因于 X"告诉你的是动机，不代表这个信息是怎么收集来的。不要把"陈述的理由"升级成"具体的过程描述"——这正是 NOT GIVEN 要抓的那种过度推理。'
        }
      }
    ]
  },
  {
    id: 'reading-matching-headings',
    section: 'Reading',
    title: 'Matching Headings: Locating Paragraph Main Ideas',
    subtitle: "Don't read start to finish — use the topic-sentence + supporting-sentence structure to pin down each paragraph's core idea in 30 seconds",
    body: `
      <p>The biggest time sink in Matching Headings is reading every paragraph fully before choosing. The right method: <strong>read all the headings first, circle their key terms, then go back and scan the passage for topic sentences</strong>.</p>
      <div class="rule">
        <div class="rule-label">STEP 1</div>
        Read through all the headings first and circle the <strong>core noun/verb</strong> in each one (not prepositions or articles). Flag headings that look similar to each other — that's where the traps live.
      </div>
      <div class="rule">
        <div class="rule-label">STEP 2</div>
        For each paragraph, read only the <strong>first and last sentence</strong>. 80% of the time, the main idea lives in these two sentences. Skip the middle — it's usually examples or data.
      </div>
      <div class="rule">
        <div class="rule-label">STEP 3</div>
        If the first/last sentences don't reveal the main idea, look for the <strong>noun that repeats</strong> throughout the paragraph — that's the paragraph's topic.
      </div>
      <p><em>Core trap</em>: a heading's keyword appearing somewhere in the paragraph does <strong>not</strong> make that heading the answer. It might just be a <strong>detail mentioned in passing</strong>, not the paragraph's main idea. The test: can this heading <strong>summarize the whole paragraph</strong>, not just one sentence in it?</p>
      <p><em>Time control</em>: 30–45 seconds per paragraph. If you haven't located it after a minute, skip it and come back once you've placed the easier ones.</p>
    `,
    questions: [
      {
        context: 'Public debate around automation has tended to polarise around two extremes: those who foresee mass unemployment as machines replace human labour wholesale, and those who insist that new jobs will simply emerge to replace the old, as they have during every previous wave of technological change. <span class="highlight">Both positions, however, understate the extent to which the transition itself — rather than its eventual equilibrium — produces prolonged and unevenly distributed hardship</span>, concentrated among workers whose skills are least transferable.',
        prompt: 'Choose the heading that best fits this paragraph:',
        options: [
          'Two opposing predictions about automation',
          'The uneven cost of transition, not just the endpoint',
          'Why new jobs always replace old ones',
          'Which workers are most affected by automation'
        ],
        answer: 1,
        insight: {
          en: 'The paragraph sets up two opposing camps (A) only to knock both down with "however" — the real point is the clause after it: the transition itself causes uneven hardship, not the debate about the endpoint. B is the only option that captures this pivot. A describes the setup, not the paragraph\'s actual argument; D is a specific detail buried in the last clause, not the main idea.',
          zh: '这段先摆出两种对立观点（A），然后用"however"把两者都推翻——真正的论点在后面那句：转型过程本身造成了不均衡的痛苦，而不是关于终点的争论。B 是唯一抓住这个转折的选项。A 只是背景铺垫，不是本段真正论点；D 只是最后一句里的一个具体细节，不是主旨。'
        }
      },
      {
        context: 'It would be a mistake to assume that the decline in bee populations is attributable solely to pesticide use, however central that factor has become in public discourse. Habitat fragmentation has reduced the diversity of forage available across a season, while the spread of the Varroa mite has introduced a pathogen vector largely absent a century ago. <span class="highlight">Each factor alone might be manageable; it is their convergence that has pushed many colonies past a critical threshold.</span>',
        prompt: 'Choose the heading that best fits this paragraph:',
        options: [
          'The central role of pesticides in bee decline',
          'Habitat fragmentation as an overlooked cause',
          'Why convergence, not any single cause, explains the crisis',
          'The spread of the Varroa mite'
        ],
        answer: 2,
        insight: {
          en: 'The paragraph opens by warning against blaming pesticides alone, lists two more contributing factors, and closes with the real claim: "it is their convergence" that matters, not any one factor in isolation. C is the only heading broad enough to cover all three factors plus the paragraph\'s actual point about their combination. A, B, and D each name only one of the three factors mentioned — each is a detail, not the whole picture.',
          zh: '这段开头就提醒不要只怪杀虫剂，接着列出另外两个因素，最后给出真正论点："是它们的叠加"起了决定作用，而不是任何单一因素。C 是唯一能覆盖全部三个因素、并抓住"叠加"这个论点的标题。A、B、D 各自只点名了三个因素里的一个——都是细节，不是全貌。'
        }
      },
      {
        context: 'The prevailing account of the manuscript\'s origin — that it was produced in a single scriptorium over a period of months — has come under sustained scrutiny. Variations in vellum quality between sections, together with at least three distinguishable hands in the marginalia, point instead to a process of compilation stretching over decades, possibly across more than one religious house. <span class="highlight">What was once read as a unified work may in fact be a composite assembled long after its earliest passages were first set down.</span>',
        prompt: 'Choose the heading that best fits this paragraph:',
        options: [
          'Evidence against a single-scriptorium origin',
          'Differences in vellum quality across the manuscript',
          'Identifying the number of scribes involved',
          'A composite work assembled across decades, not a unified original'
        ],
        answer: 3,
        insight: {
          en: 'The paragraph builds evidence (vellum variation, multiple hands) toward one conclusion, stated in the final sentence: this isn\'t a unified work at all, but a composite assembled over a long period. D captures that final, overall claim. A is close but only describes the "against" half — it doesn\'t capture what the evidence points toward. B and C are individual pieces of evidence, not the conclusion they support.',
          zh: '这段逐步列出证据（羊皮纸质量差异、多种笔迹），最后一句给出结论：这根本不是一部统一的作品，而是长期拼合而成的复合文本。D 抓住了这个最终的整体论点。A 很接近，但只讲了"反对"的那一半，没有讲证据指向了什么结论。B、C 只是具体证据，不是证据支持的结论。'
        }
      }
    ]
  },
  {
    id: 'reading-mcq',
    section: 'Reading',
    title: 'Multiple Choice: Locate, Evaluate, Eliminate',
    subtitle: 'The single biggest chunk of Academic Reading. All four options are engineered to sound plausible — you win by understanding distractor patterns, not by "picking the one that sounds right"',
    body: `
      <p>A four-option MCQ is not a comprehension test — it is a <strong>discrimination test</strong>. Three of the four options are built to look correct if you skim. Jumping to "which one sounds right" is exactly the trap the paper is designed around.</p>
      <div class="rule">
        <div class="rule-label">STEP 1 · LOCATE</div>
        Find the passage location the question refers to. Use <strong>unique nouns, proper nouns, or numbers</strong> from the stem — never common words. Underline the sentence(s) that actually answer the question.
      </div>
      <div class="rule">
        <div class="rule-label">STEP 2 · READ, DON'T SCAN</div>
        Read those sentences slowly. The correct option is a <strong>paraphrase</strong> of what's there — not a keyword copy. Heavy word-for-word overlap with the passage is <strong>often the distractor</strong>, not the answer.
      </div>
      <div class="rule">
        <div class="rule-label">STEP 3 · EVALUATE ALL FOUR</div>
        Never stop at the first option that sounds right. Check every option against the located sentence. Twenty extra seconds catches most trap answers.
      </div>
      <p><em>Distractor pattern A · extreme wording</em>: the option adds <strong>only / always / never / must / all</strong> where the passage said "often" or "usually". Wrong because it's too strong.</p>
      <p><em>Distractor pattern B · right topic, wrong scope</em>: the option is factually consistent with the passage but does not answer <strong>this specific question</strong>. Correct information ≠ correct answer.</p>
      <p><em>Distractor pattern C · recombined words</em>: the option pulls several words from the passage but arranges them into a claim the passage never makes. Check whether the logical relationship (cause/effect, comparison, sequence) survives.</p>
    `,
    questions: [
      {
        context: '<span class="highlight">Recent longitudinal studies have found that participants who engaged in regular aerobic exercise showed measurable improvements in working memory</span>, though the effect size varied considerably depending on the intensity and duration of the individual training sessions.',
        prompt: 'According to the passage, regular aerobic exercise:',
        options: [
          'always produces measurable improvements in working memory',
          'improves memory only in high-intensity training sessions',
          'has been shown to improve working memory to varying degrees',
          'is the most effective known intervention against memory decline'
        ],
        answer: 2,
        insight: {
          en: 'A adds <span class="insight-tag">always</span> — the passage never claims it works for everyone. B narrows to <span class="insight-tag">only high-intensity</span>; the passage says intensity affects the size of the effect, not that only high-intensity works. C is the correct paraphrase: "measurable improvements ... varied considerably" = "improves ... to varying degrees". D introduces a superlative comparison ("most effective") the passage never makes.',
          zh: 'A 加了<span class="insight-tag">always</span>——原文从没说对所有人都管用。B 缩小到<span class="insight-tag">"只有高强度"</span>；原文说强度影响效果的大小，不是"只有高强度才有效"。C 是正确的同义改写："measurable improvements ... varied considerably" = "改善程度不一"。D 加了最高级比较（"最有效"），原文从没做过这种比较。'
        }
      },
      {
        context: 'Attempts to reintroduce the beaver to river systems in the western United Kingdom have been broadly successful, though not without controversy. Farmers downstream have complained about localised flooding, while ecologists point to measurable increases in aquatic invertebrate populations as evidence of ecosystem recovery. <span class="highlight">Policymakers now face the challenge of designing compensation schemes that acknowledge legitimate agricultural grievances without undermining the wider ecological gains.</span>',
        prompt: 'What is the main challenge that policymakers currently face?',
        options: [
          'Persuading farmers that the reintroduced beavers are not harmful',
          'Reversing the reintroduction in areas where it has failed',
          "Balancing farmers' losses against the reintroduction's ecological benefits",
          "Measuring the impact on aquatic invertebrate populations more precisely"
        ],
        answer: 2,
        insight: {
          en: 'A picks up on real material (farmer complaints) but reframes the challenge as one of persuasion — the passage says the challenge is designing compensation, not changing farmers\' minds. B contradicts "broadly successful". C matches the passage exactly: compensation that acknowledges grievances without undermining ecological gains = balancing losses against benefits. D is a detail cited as evidence, not a policymaker challenge.',
          zh: 'A 抓住了原文的材料（农民抱怨），但把"挑战"重新框定为"说服"——原文说挑战是设计补偿方案，不是改变农民想法。B 与"broadly successful"矛盾。C 是精确同义改写：补偿方案既要认可诉求又不损害生态收益 = 平衡损失和收益。D 只是原文中作为证据引用的一个细节，不是政策制定者当前的挑战。'
        }
      },
      {
        context: 'While early machine-learning systems required enormous manually-labelled datasets to achieve even modest accuracy on image-recognition tasks, <span class="highlight">more recent self-supervised approaches can extract meaningful representations from unlabelled data. This has dramatically reduced the cost of building competent models, though performance still tends to lag behind fully supervised systems trained on comparable volumes of labelled data.</span>',
        prompt: 'What does the passage suggest about self-supervised learning?',
        options: [
          'It has replaced fully supervised learning in most modern systems',
          'It reduces dataset costs but does not yet match supervised accuracy',
          'It requires more labelled data than earlier approaches did',
          'It is the only approach able to work with unlabelled data'
        ],
        answer: 1,
        insight: {
          en: 'A is too strong — the passage never says it has replaced supervised learning. B captures both halves of the final sentence: cost reduction + performance still trailing. C reverses the passage — self-supervised uses <span class="insight-tag">unlabelled</span> data. D is an extreme, unsupported claim. Correct answers to IELTS MCQs often sit in this "acknowledges both strengths and limits" territory — options that are all-positive or all-negative are usually distractors.',
          zh: 'A 太绝对了——原文从没说"已经取代了监督学习"。B 抓住了最后一句的两半：降低了成本 + 表现仍然落后。C 把原文反过来了——自监督用的是<span class="insight-tag">无标签</span>数据。D 是没根据的极端说法。雅思 MCQ 的正确答案往往就在这种"既承认优点也承认局限"的地带——全部正面或全部负面的选项通常是干扰项。'
        }
      },
      {
        context: 'The initial expectation that widespread internet access would democratise political participation has been complicated by evidence that <span class="highlight">online platforms tend to amplify pre-existing inequalities in engagement rather than eliminating them. Citizens who were already politically active have gained new tools for advocacy; those who were previously disengaged have, on the whole, remained so.</span>',
        prompt: 'What does the passage suggest about the effect of internet access on political participation?',
        options: [
          'It has failed to increase political participation at all',
          'It has widened the gap between politically active and disengaged citizens',
          'It has made previously disengaged citizens more politically active',
          "It affects political inequalities more sharply online than offline"
        ],
        answer: 1,
        insight: {
          en: 'A is too strong — the passage says active citizens DID gain new tools, so "failed to increase ... at all" contradicts that. B is the correct paraphrase: "amplify pre-existing inequalities" + "active gained ... disengaged remained so" = widened the gap. C is the opposite of what the passage says. D introduces an online-vs-offline comparison the passage never makes.',
          zh: 'A 太绝对——原文说活跃公民确实获得了新工具，所以"完全没有增加"和这个相矛盾。B 是正确同义改写："amplify pre-existing inequalities" + "活跃者获得新工具，冷漠者依然冷漠" = 差距扩大。C 恰好和原文相反。D 加了一个"线上 vs 线下"的比较，原文没做这种对比。'
        }
      },
      {
        context: 'Some economists have argued that raising minimum wages inevitably leads to job losses, citing empirical studies from the 1970s and 1980s. <span class="highlight">More recent meta-analyses, however, have found the employment effects of moderate minimum-wage increases to be considerably smaller than that earlier consensus suggested — and, in some sectors, indistinguishable from zero. The authors conclude that the debate should shift from whether such increases cause harm to identifying the conditions under which they do or do not.</span>',
        prompt: "What is the passage's own position on minimum-wage increases?",
        options: [
          'They cause substantial job losses, as the older studies showed',
          'They should be avoided unless economic conditions are ideal',
          'Their employment effects depend on specific conditions and should be studied contextually',
          'They have been shown to have no measurable impact on employment'
        ],
        answer: 2,
        insight: {
          en: 'A confuses the passage\'s view with a cited older view — the passage reports the 1970s/80s studies without endorsing them. B is unsupported. C matches the final sentence exactly: shift the debate to "conditions under which they do or do not" cause harm. D overstates "indistinguishable from zero" — the passage says that only in <span class="insight-tag">some sectors</span>. Classic IELTS MCQ move: separate what the AUTHOR thinks from what the author REPORTS others thinking.',
          zh: 'A 把原文的观点和文中引用的旧观点混淆了——原文报道了 70/80 年代的研究，但没有认同它。B 没根据。C 完全对应最后一句：把辩论转移到"何种条件下会/不会"造成危害。D 把"indistinguishable from zero"夸大了——原文说这只发生在<span class="insight-tag">某些行业</span>。经典雅思 MCQ 手法：把作者自己的观点和作者引用别人的观点分开。'
        }
      }
    ]
  },
  {
    id: 'reading-matching-info',
    section: 'Reading',
    title: 'Matching Information: Scan, Do Not Read',
    subtitle: "Which paragraph mentions X? — trained by keyword scanning, not by reading top to bottom. Traps live in paragraphs that name a keyword without discussing it",
    body: `
      <p>Matching Information asks which paragraph <strong>discusses</strong> a specific piece of information. Whether the information is true doesn't matter here — the whole game is locating it. Reading paragraphs in order defeats the purpose.</p>
      <div class="rule">
        <div class="rule-label">STEP 1 · EXTRACT UNIQUE KEYWORDS</div>
        From the question, pull the most <strong>unusual, specific, or proper</strong> terms: names, numbers, technical vocabulary, dates. Skip common words. These are what you'll scan for.
      </div>
      <div class="rule">
        <div class="rule-label">STEP 2 · SCAN, DO NOT READ</div>
        Sweep the passage looking only for those unique terms or close synonyms. If you find yourself reading a paragraph in full, you've slowed down too much.
      </div>
      <div class="rule">
        <div class="rule-label">STEP 3 · CONFIRM</div>
        When you find the term, read that sentence plus the one around it to confirm the paragraph actually <strong>discusses</strong> the concept — not just drops the word in passing.
      </div>
      <p><em>Central trap</em>: a paragraph containing a keyword ≠ a paragraph that discusses that concept. "Which paragraph mentions the role of X" requires the paragraph to <strong>describe or analyse the role</strong>, not simply name X.</p>
      <p><em>Also worth knowing</em>: paragraphs can be the answer to more than one question. Don't cross a paragraph off just because it answered a previous one.</p>
    `,
    questions: [
      {
        context: '<strong>A</strong> The concept of the "15-minute city" — where residents can meet daily needs within a short walk — <span class="highlight">originated in early-2000s urban design theory</span> but gained mainstream traction only after 2020, when pandemic-era restrictions forced planners to reconsider commuting-based city layouts.<br><br><strong>B</strong> Implementation has been uneven. Paris, whose mayor made the concept a re-election centrepiece, has invested heavily in reallocating road space, while other cities have adopted the label without meaningful design changes.<br><br><strong>C</strong> Critics point to two recurring difficulties: cost, since dense mixed-use development requires expensive retrofitting of car-dominated areas; and equity, since the neighbourhoods that most need improved access are often those most resistant to disruption.',
        prompt: 'Which paragraph describes the historical origins of the 15-minute city concept?',
        options: ['Paragraph A', 'Paragraph B', 'Paragraph C'],
        answer: 0,
        insight: {
          en: 'The origins ("<span class="insight-tag">originated in early-2000s urban design theory</span>") are only in A. B is about implementation; C is about criticisms. Trap: B mentions "2020", which looks date-like — but the question asks about ORIGINS, and 2020 is when the concept gained traction, not when it originated. Scan for the exact word "originated", not just any date.',
          zh: '起源（"<span class="insight-tag">originated in early-2000s urban design theory</span>"）只在 A 段。B 是关于实施；C 是关于批评。陷阱：B 段提到 2020 年，看起来像日期——但题目问的是"起源"，2020 只是这个概念走红的时间，不是它诞生的时间。扫描"originated"这个词，而不是随便一个日期。'
        }
      },
      {
        context: '<strong>A</strong> Coral reef restoration has, until recently, relied largely on transplanting fragments from healthy reefs to degraded areas — a technique that produces visible short-term recovery but does not address the underlying stressors that caused the original decline.<br><br><strong>B</strong> A new generation of interventions targets heat tolerance directly: researchers select or breed coral varieties that survive higher water temperatures, then reintroduce them at scale. Early trials in the Great Barrier Reef suggest survival rates roughly double those of unenhanced transplants.<br><br><strong>C</strong> <span class="highlight">Even proponents of these methods caution that restoration alone cannot substitute for reducing emissions.</span> Without deceleration of ocean warming, any restored reef is likely to face the same conditions that killed its predecessor within decades.',
        prompt: 'Which paragraph discusses the limits of restoration as an overall strategy?',
        options: ['Paragraph A', 'Paragraph B', 'Paragraph C'],
        answer: 2,
        insight: {
          en: 'The strategic-limits argument ("<span class="insight-tag">restoration alone cannot substitute for reducing emissions</span>") is entirely in C. A criticizes an OLD technique (transplanting) but doesn\'t argue against restoration as a strategy. B describes a NEW technique\'s benefits, not its limits. Trap: A sounds like a limits-paragraph but it\'s the limits of one method, not of the strategy overall. Scan for evaluative language: "cannot", "alone", "even proponents caution".',
          zh: '"作为策略的整体局限"这个论证（"<span class="insight-tag">restoration alone cannot substitute for reducing emissions</span>"）全部在 C 段。A 批评的是一种旧技术（移植），不是反对整个"修复策略"。B 讲的是新技术的好处，不是它的局限。陷阱：A 听起来像在讲"局限"，但那是"某个方法的局限"，不是"整体策略的局限"。扫描评价性词汇："cannot"、"alone"、"even proponents caution"。'
        }
      },
      {
        context: '<strong>A</strong> A 2023 review of school-based reading interventions across 14 countries reported wide variability in effectiveness, with programmes targeting phonics showing consistently stronger short-term gains than those emphasising whole-word recognition.<br><br><strong>B</strong> The review\'s authors caution against reading their findings as evidence that one method is universally superior. Longer-term outcomes — reading comprehension by age 14, engagement with texts, and willingness to read for pleasure — were less clearly linked to any particular early-instruction approach.<br><br><strong>C</strong> Practitioners have raised a further concern: <span class="highlight">the studies included in the review overwhelmingly focused on English-language settings, limiting their applicability to languages with more transparent letter-sound correspondences.</span>',
        prompt: 'Which paragraph raises a methodological limitation of the studies reviewed?',
        options: ['Paragraph A', 'Paragraph B', 'Paragraph C'],
        answer: 2,
        insight: {
          en: 'A methodological limit is about how the studies were conducted or their scope. Only C names one: the studies overwhelmingly used English-language settings. A summarises findings; B qualifies how the findings should be interpreted (a substantive caveat, not a methodological one). Trap: B sounds like it\'s raising a limitation — and it is, but of the CONCLUSIONS, not of the methodology. Scan for language about study design or sample.',
          zh: '"方法学局限"讲的是研究是怎么做的、或者研究的覆盖范围。只有 C 明确指出了一条：这些研究几乎都是英语环境下做的。A 只是总结发现；B 提醒不要过度解读结论（这是内容层面的告诫，不是方法层面的）。陷阱：B 听起来在讲局限——它确实在讲，但讲的是"结论"的局限，不是"方法"的局限。扫描关于研究设计或样本的语言。'
        }
      },
      {
        context: '<strong>A</strong> Public trust in weather forecasting has risen substantially since the 1990s, driven largely by improvements in medium-range accuracy: 5-day forecasts today match the reliability of 3-day forecasts a generation ago.<br><br><strong>B</strong> Trust in longer-range predictions — beyond about ten days — remains modest, and for good reason. <span class="highlight">Chaotic amplification of small initial errors means seasonal forecasts still perform little better than climatological averages in most regions.</span><br><br><strong>C</strong> Meteorologists worry that this earned credibility could erode if the public conflates weather forecasting with climate prediction, whose uncertainties are of a fundamentally different kind and often much larger over the short term.',
        prompt: 'Which paragraph explains why long-range weather forecasts remain unreliable?',
        options: ['Paragraph A', 'Paragraph B', 'Paragraph C'],
        answer: 1,
        insight: {
          en: 'The unreliability of long-range forecasts and its cause ("<span class="insight-tag">chaotic amplification of small initial errors</span>") are in B. A is about medium-range gains. C is about the risk of confusing weather with climate. Trap: C talks about "uncertainties", which sounds like unreliability — but those are CLIMATE uncertainties, not long-range WEATHER forecast limits. Scan for "seasonal", "chaotic", or "little better than climatological averages".',
          zh: '"长期预报为什么不可靠"及其原因（"<span class="insight-tag">chaotic amplification of small initial errors</span>"）在 B 段。A 讲的是中期预报的进步。C 讲的是"天气预报"和"气候预测"被混为一谈的风险。陷阱：C 提到"uncertainties"，听起来像"不可靠"——但那是"气候"的不确定性，不是"长期天气预报"的不可靠。扫描"seasonal"、"chaotic"、"little better than climatological averages"。'
        }
      },
      {
        context: '<strong>A</strong> The domestication of the horse, long dated to around 3500 BCE based on evidence from the Botai culture of what is now Kazakhstan, has been complicated by recent genetic analysis showing that modern domestic horses do not descend from Botai stock — but from a later, distinct lineage originating in the lower Volga-Don steppes around 2200 BCE.<br><br><strong>B</strong> <span class="highlight">The Botai horses appear to have been a separate domestication event that ultimately died out or was absorbed, leaving no direct descendants among today\'s horse populations.</span><br><br><strong>C</strong> The revised timeline has consequences beyond archaeology: it reshapes our understanding of how quickly the horse spread across Eurasia, since the true progenitor lineage had only about 1500 years to reach the far corners of the continent — a rate of expansion that raises new questions about the technology of early horseback transport.',
        prompt: "Which paragraph describes the eventual fate of the Botai horse lineage?",
        options: ['Paragraph A', 'Paragraph B', 'Paragraph C'],
        answer: 1,
        insight: {
          en: 'The fate ("<span class="insight-tag">died out or was absorbed, leaving no direct descendants</span>") is only in B. A introduces the Botai culture but talks about ORIGINS of horse domestication, not the fate of that lineage. C is about implications of the revised timeline for horse spread across Eurasia. Classic trap: A and B both discuss the Botai horses, but from different angles — the question specifies "fate", so B wins. Scan for the fate-language: "died out", "no descendants".',
          zh: '"命运"（"<span class="insight-tag">died out or was absorbed, leaving no direct descendants</span>"）只在 B 段。A 介绍了 Botai 文化，但讲的是"马驯化的起源"，不是"该谱系的命运"。C 讲的是新时间表对欧亚马匹传播理解的影响。经典陷阱：A 和 B 都讨论 Botai 马，但角度不同——题目问的是"命运"，所以选 B。扫描"命运"类词汇："died out"、"no descendants"。'
        }
      }
    ]
  },
  {
    id: 'reading-sentence-completion',
    section: 'Reading',
    title: 'Sentence Completion: Take the Word From the Passage',
    subtitle: "Fill in the blank with exactly the word the passage uses. Synonyms count against you — the word must appear in the text",
    body: `
      <p>Sentence Completion is a fill-in-the-blank test with two firm constraints: (1) the answer comes <strong>directly from the passage</strong> — no synonym, no paraphrase, no invention; (2) it must fit <strong>grammatically</strong>. On the real IELTS the rule is "ONE WORD ONLY" or "NO MORE THAN TWO WORDS"; here we present pre-filtered options, but the discipline is the same.</p>
      <div class="rule">
        <div class="rule-label">STEP 1 · PREDICT THE WORD CLASS</div>
        Before looking at the passage, read the sentence with the blank and decide what part of speech fits: noun / verb / adjective / adverb. This alone rules out most wrong options.
      </div>
      <div class="rule">
        <div class="rule-label">STEP 2 · LOCATE THE PARAPHRASED SOURCE SENTENCE</div>
        The blank-sentence is a paraphrase of one specific sentence in the passage. Find it using unique keywords. The answer word will be visible in that source sentence.
      </div>
      <div class="rule">
        <div class="rule-label">STEP 3 · GRAMMATICAL FIT</div>
        Check singular/plural, tense, and article agreement. A word with the right meaning but the wrong grammar is still wrong.
      </div>
      <p><em>Central trap</em>: an option that <strong>means</strong> the correct answer but doesn't appear in the passage. Sentence Completion is not paraphrase-friendly at the answer level — the exact word from the text is what wins. Synonyms cost you points here, not save them.</p>
    `,
    questions: [
      {
        context: 'The success of the vaccination programme depended on a combination of scientific innovation and effective public communication. The rapid development of mRNA technology attracted most media attention, but epidemiologists have argued that the campaign\'s actual reach owed more to something less visible: <span class="highlight">sustained investment in community-level distribution networks.</span>',
        prompt: 'Complete the sentence with a word from the passage:<br><br><em>Epidemiologists say the campaign\'s reach was mainly due to ______ in community-level distribution networks.</em>',
        options: ['technology', 'investment', 'communication', 'innovation'],
        answer: 1,
        insight: {
          en: 'The blank needs a noun that goes with "in ... distribution networks". "<span class="insight-tag">Investment in</span>" is the exact collocation in the passage ("sustained investment in community-level distribution networks"). The other three are all mentioned in the paragraph but none of them is what precedes "in distribution networks". Sentence Completion rewards you for finding the exact phrase, not the "correct-sounding" one.',
          zh: '空格需要一个能和"in ... distribution networks"搭配的名词。"<span class="insight-tag">Investment in</span>"是原文里的原搭配（"sustained investment in community-level distribution networks"）。其他三个虽然在这段里都出现了，但都不是那个直接接"in distribution networks"的词。Sentence Completion 奖励的是找出"原句原词"，不是"听起来对的词"。'
        }
      },
      {
        context: 'Contemporary urban planners have grown wary of the assumption that residents will use whatever transportation infrastructure is provided. The failure of several high-profile cycling schemes has shown that infrastructure alone cannot generate demand: <span class="highlight">without complementary shifts in scheduling, safety perception, and workplace culture, even excellent cycling lanes attract only a marginal increase in daily riders.</span>',
        prompt: 'Complete the sentence with a word from the passage:<br><br><em>Well-designed cycling lanes will only marginally increase riders unless matching changes are made to workplace ______.</em>',
        options: ['safety', 'culture', 'demand', 'scheduling'],
        answer: 1,
        insight: {
          en: 'The passage lists "scheduling, safety perception, and workplace culture" — of these, only <span class="insight-tag">culture</span> is the one paired with the word "workplace" as a fixed collocation ("workplace culture"). "Safety" and "scheduling" are complementary factors but the passage doesn\'t attach them to "workplace". "Demand" appears but not as something to change. Word class alone isn\'t enough here — you also need collocation.',
          zh: '原文列出了"scheduling, safety perception, and workplace culture"——其中只有 <span class="insight-tag">culture</span> 是和"workplace"构成固定搭配的（"workplace culture"）。"Safety"和"scheduling"也是配套因素，但原文没有把它们和"workplace"绑在一起。"Demand"出现过，但不是"要改变的东西"。这里光看词性不够，还得看搭配。'
        }
      },
      {
        context: 'The Ordovician mass extinction, second only to the Permian in severity, unfolded over roughly a million years as global sea levels first dropped precipitously and then rose again. Marine organisms adapted to warm, shallow shelf environments faced repeated habitat collapse, <span class="highlight">while those able to tolerate temperature extremes or migrate to deeper water fared better.</span>',
        prompt: 'Complete the sentence with a word from the passage:<br><br><em>Species that could ______ to deeper water survived the extinction more successfully.</em>',
        options: ['adapt', 'migrate', 'tolerate', 'expand'],
        answer: 1,
        insight: {
          en: 'The passage says "<span class="insight-tag">migrate to deeper water</span>" — exact phrase. "Adapt to deeper water" would technically make sense but isn\'t what the passage says. "Tolerate" appears in the passage but paired with temperature extremes, not with deeper water. "Expand" isn\'t in the passage at all. Sentence Completion punishes reasonable synonyms — resist substituting.',
          zh: '原文是"<span class="insight-tag">migrate to deeper water</span>"——原句原词。"Adapt to deeper water"意思上说得通但不是原文的措辞。"Tolerate"在原文里出现过，但搭配的是"temperature extremes"，不是"deeper water"。"Expand"根本没在原文出现。Sentence Completion 会惩罚"合理的同义替换"——不要自己换词。'
        }
      },
      {
        context: 'Studies of professional chess players have consistently found that expertise depends less on raw calculation speed than on the ability to recognise patterns. <span class="highlight">Grandmasters do not consider more moves than intermediate players; they consider better ones</span>, drawing on a mental library of tens of thousands of familiar board configurations built up over years of study.',
        prompt: 'Complete the sentence with a word from the passage:<br><br><em>According to the passage, grandmasters win not by considering more moves but by considering ______ ones.</em>',
        options: ['faster', 'better', 'familiar', 'calculated'],
        answer: 1,
        insight: {
          en: '"They consider <span class="insight-tag">better</span> ones" — direct lift. "Faster" isn\'t in the sentence about moves at all. "Familiar" appears in the passage but describes the mental library of board configurations, not the moves being considered. "Calculated" doesn\'t appear. Straight lift-the-word question that tests whether you\'re actually reading the passage or filling in what "sounds smart".',
          zh: '"They consider <span class="insight-tag">better</span> ones"——原句原词。"Faster"根本没在"棋步"这句里出现。"Familiar"在原文里有，但形容的是"棋盘构型的心理库"，不是"考虑的棋步"。"Calculated"没出现。这就是纯粹"抄原词"的题，测的是你是真的在读原文，还是在填"听起来聪明"的答案。'
        }
      },
      {
        context: 'The Great Fire of London, which destroyed most of the medieval city over four days in 1666, had one unexpected long-term consequence: it accelerated the decline of the bubonic plague, which had killed nearly a quarter of the population the previous year. <span class="highlight">Historians disagree about the mechanism</span> — some cite the destruction of rat habitats, others the enforced dispersion of the population — but the coincidence of the fire with the plague\'s near-disappearance is difficult to dismiss.',
        prompt: 'Complete the sentence with a word from the passage:<br><br><em>Historians disagree about the ______ by which the fire helped end the plague.</em>',
        options: ['reason', 'mechanism', 'evidence', 'consequence'],
        answer: 1,
        insight: {
          en: '"Historians disagree about the <span class="insight-tag">mechanism</span>" — direct lift. "Reason" is a natural-sounding synonym but not the word in the passage. "Evidence" would suggest disagreement about facts, but the passage says they disagree about HOW (mechanism), not WHETHER. "Consequence" doesn\'t fit — a consequence is a result, not a cause. Direct wording beats meaning.',
          zh: '"Historians disagree about the <span class="insight-tag">mechanism</span>"——原句原词。"Reason"是听起来很自然的同义词，但不是原文的用词。"Evidence"意味着分歧在于"事实"，但原文说的是分歧在于"如何"（机制），不是"是不是"。"Consequence"不合逻辑——consequence 是结果，不是原因。原文措辞胜过意义。'
        }
      }
    ]
  }
];
