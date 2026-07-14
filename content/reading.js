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
  }
];
