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
        context: '<span class="highlight">Recent studies suggest that some species of octopus display problem-solving abilities</span> comparable to those of certain mammals, particularly in tasks involving spatial memory.',
        prompt: 'All octopus species have problem-solving abilities equal to mammals.',
        options: ['True', 'False', 'Not Given'],
        answer: 1,
        insight: {
          en: 'The statement uses <span class="insight-tag">All</span> and <span class="insight-tag">equal</span>, but the passage says <span class="insight-tag">some species</span> and <span class="insight-tag">comparable</span>. The scope has been broadened and the degree made absolute — that contradicts the passage, making this FALSE, not NG.',
          zh: '陈述用了 <span class="insight-tag">All</span> 和 <span class="insight-tag">equal</span>，但原文是 <span class="insight-tag">some species</span> 和 <span class="insight-tag">comparable</span>。范围被放大 + 程度被绝对化 = 与原文矛盾，是 FALSE，不是 NG。'
        }
      },
      {
        context: '<span class="highlight">The city\'s public transport network expanded rapidly between 2010 and 2015</span>, though the pace of new construction has since slowed considerably.',
        prompt: 'Public transport construction in the city stopped after 2015.',
        options: ['True', 'False', 'Not Given'],
        answer: 1,
        insight: {
          en: '"slowed considerably" means the pace eased, not that it ended. <span class="insight-tag">stopped</span> is an extreme rewrite that contradicts the passage — choose FALSE. Distinguishing "slowing down" from "stopping" is a classic trap.',
          zh: '"slowed considerably" 是"放缓"，不是"停止"。<span class="insight-tag">stopped</span> 是极端化改写，与原文矛盾，选 FALSE。区分"减慢"和"停止"是常见考点。'
        }
      },
      {
        context: '<span class="highlight">Dr. Chen\'s research on urban wildlife has been widely cited</span> in policy discussions about green space allocation.',
        prompt: "Dr. Chen's research is the most influential work in the field.",
        options: ['True', 'False', 'Not Given'],
        answer: 2,
        insight: {
          en: '"widely cited" only says the work is frequently referenced. <span class="insight-tag">most influential</span> is a superlative ranking claim — the passage never makes that comparison, so this is NG, not TRUE. Don\'t fill in the gap yourself.',
          zh: '"widely cited" 只说被广泛引用，<span class="insight-tag">most influential</span> 是最高级排序——原文没有做过这个比较，是 NG 而不是 TRUE。别脑补。'
        }
      },
      {
        context: '<span class="highlight">Although initial trials showed promising results, subsequent large-scale studies failed to replicate the effect</span>, leading many researchers to question the original findings.',
        prompt: 'The initial results of the trials could not be reproduced in later studies.',
        options: ['True', 'False', 'Not Given'],
        answer: 0,
        insight: {
          en: '"failed to replicate" = "could not be reproduced" — a textbook paraphrase. This is what TRUE looks like: not high word overlap, but <span class="insight-tag">logical equivalence</span>.',
          zh: '"failed to replicate" = "could not be reproduced"，标准同义改写。这就是 TRUE 的样子——不是词汇重合度高，而是<span class="insight-tag">逻辑等价</span>。'
        }
      },
      {
        context: '<span class="highlight">The museum introduced free entry on weekends in 2019</span>, resulting in a noticeable increase in family visitors.',
        prompt: 'Weekend visitor numbers doubled after 2019.',
        options: ['True', 'False', 'Not Given'],
        answer: 2,
        insight: {
          en: 'The passage only says <span class="insight-tag">noticeable increase</span> — it never says "doubled". When no specific figure is given, that\'s NG. Whenever a statement gives a number or ratio, check the passage for a matching figure first.',
          zh: '原文只说 <span class="insight-tag">noticeable increase</span>（明显增加），没有说"翻倍"。<span class="insight-tag">具体数字</span>没有给就是 NG。任何时候出现具体数字/比例，先在原文找有没有对应数字。'
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
        context: '<span class="highlight">The invention of the printing press in the 15th century did not immediately transform European society.</span> For decades, printed books remained expensive luxuries accessible only to the wealthy. It was not until the late 16th century, when production costs fell dramatically, that literacy began to spread among the middle classes, gradually reshaping education, commerce, and religious practice.',
        prompt: 'Choose the heading that best fits this paragraph:',
        options: [
          'The technological breakthrough of the printing press',
          'A delayed but transformative impact',
          'The cost of early printed books',
          'How printing changed religion'
        ],
        answer: 1,
        insight: {
          en: 'The first sentence signals <span class="insight-tag">"did not immediately transform"</span> — a delay; the last sentence signals <span class="insight-tag">"gradually reshaping"</span> — an eventual transformation. Together that\'s "a delayed but transformative impact." Options C and D are details within the paragraph, not its main idea.',
          zh: '首句抓的是<span class="insight-tag">"did not immediately transform"</span>——延迟；末句抓<span class="insight-tag">"gradually reshaping"</span>——最终带来变革。合起来就是"延迟但深远的影响"。选项 C 和 D 是段中细节，不是主旨。'
        }
      },
      {
        context: '<span class="highlight">Coral reefs face threats from multiple directions</span>. Rising sea temperatures cause bleaching. Ocean acidification weakens reef structures. Coastal development introduces sediment and pollutants. Overfishing removes species that keep algae in check. No single factor can be blamed—<span class="highlight">reefs are declining because of the combined pressure of many stressors</span>.',
        prompt: 'Choose the heading that best fits this paragraph:',
        options: [
          'The impact of rising temperatures',
          'Why overfishing damages reefs',
          'The compound nature of reef decline',
          'Coral bleaching explained'
        ],
        answer: 2,
        insight: {
          en: 'Both the first and last sentences point to <span class="insight-tag">"multiple"</span> and <span class="insight-tag">"combined pressure"</span> — the core idea is "many stressors compounding together." A, B, and D are all specific examples inside the paragraph covering only one angle each — none of them summarize the whole paragraph. This is the classic Matching Headings trap: <span class="insight-tag">detail ≠ main idea</span>.',
          zh: '首末句都在讲<span class="insight-tag">"multiple"</span> 和 <span class="insight-tag">"combined pressure"</span>——核心是"多重因素叠加"。A、B、D 都是段落里的具体例子，只覆盖一个方面，不能概括整段。这就是 Matching Headings 的经典陷阱：<span class="insight-tag">细节 ≠ 主旨</span>。'
        }
      },
      {
        context: 'Early attempts at machine translation in the 1950s produced results that were often comically inaccurate. <span class="highlight">Progress remained slow for nearly forty years, as researchers struggled to encode the complexity of human language into rules.</span> The breakthrough came only when the field abandoned rule-based approaches in favor of statistical methods trained on vast collections of human-translated text.',
        prompt: 'Choose the heading that best fits this paragraph:',
        options: [
          'Early failures in machine translation',
          'A shift in methodology after decades of stagnation',
          'How statistical methods work',
          'The problem of encoding grammar'
        ],
        answer: 1,
        insight: {
          en: 'This paragraph has a clear three-part structure: <span class="insight-tag">early failure → decades of stagnation → a methodological shift that brought a breakthrough</span>. Option B captures all three stages. A only covers the first stage; C and D are details from the final sentence.',
          zh: '这段有清晰的三段结构：<span class="insight-tag">早期失败 → 长期停滞 → 方法转变带来突破</span>。B 抓住了全部三个阶段。A 只讲第一阶段，C、D 是最后一句的细节。'
        }
      }
    ]
  }
];
