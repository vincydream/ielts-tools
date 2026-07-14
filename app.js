import { todayStr, daysBetween, scheduleItem, getDueItems } from './modules/srs.js';
import { ERROR_TAGS, recordErrorTag, weeklyErrorDistribution, tagLabel } from './modules/stats.js';
import { getLang, toggleLang, insightText } from './modules/i18n.js';
import { updateLessonMastery } from './modules/mastery.js';
import { wrapWordsForClick, getDefinition, isInGlossary, addToGlossary } from './modules/glossary.js';
import { READING_LESSONS } from './content/reading.js';
import { LISTENING_LESSONS } from './content/listening.js';

/* =============================================================
   CONTENT — add a lesson by editing content/reading.js or
   content/listening.js only. Nothing else needs to change.
   ============================================================= */
const LESSONS = [...READING_LESSONS, ...LISTENING_LESSONS];

/* =============================================================
   STATE — schema per SPEC.md §6
   ============================================================= */
const STORAGE_KEY = 'ielts-sprint-v2';
const XP_PER_ITEM = 10;

function defaultState() {
  return {
    meta: {
      createdAt: todayStr(),
      lastActive: null,
      streak: 0,
      xp: 0,
      langPref: 'en'
    },
    items: {},
    lessonMastery: {},
    history: {},
    glossary: [],
    imported: [],
    completedLessons: [],
    todayLessonId: null,
    todayItemsDone: 0,
    todayGoal: 5
  };
}

let state = null;
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return defaultState();
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* Streak logic */
function updateStreak() {
  const today = todayStr();
  if (state.meta.lastActive === today) return;
  if (state.meta.lastActive) {
    const gap = daysBetween(state.meta.lastActive);
    if (gap === 1) state.meta.streak += 1;
    else if (gap > 1) state.meta.streak = 1;
  } else {
    state.meta.streak = 1;
  }
  state.meta.lastActive = today;
  saveState();
}

/* =============================================================
   VIEW STATE
   ============================================================= */
let currentView = 'today';
let sessionState = { mode: null, index: 0, list: [] };

/* =============================================================
   DOM REFS
   ============================================================= */
const $view = document.getElementById('view');
const $streak = document.getElementById('stat-streak');
const $xp = document.getElementById('stat-xp');
const $mastered = document.getElementById('stat-mastered');
const $progress = document.getElementById('progress-bar');
const $reviewCount = document.getElementById('review-count');

function updateStats(pulse) {
  $streak.textContent = state.meta.streak;
  $xp.textContent = state.meta.xp;
  const mastered = Object.values(state.items).filter(i => i.level >= 3).length;
  $mastered.textContent = mastered;
  if (pulse) {
    $xp.classList.add('pulse');
    setTimeout(() => $xp.classList.remove('pulse'), 500);
  }
  const dueCount = getDueItems(state).length;
  if (dueCount > 0) {
    $reviewCount.style.display = 'inline-block';
    $reviewCount.textContent = dueCount;
  } else {
    $reviewCount.style.display = 'none';
  }
  const todayProgress = Math.min(100, (state.todayItemsDone / state.todayGoal) * 100);
  $progress.style.width = todayProgress + '%';
}

function floatXP(amount) {
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = '+' + amount + ' XP';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function gainXP(amount, correct) {
  state.meta.xp += amount;
  state.todayItemsDone += 1;
  const t = todayStr();
  if (!state.history[t]) state.history[t] = { xpGained: 0, itemsDone: 0, itemsCorrect: 0, correctRate: 0, errorTags: {} };
  const bucket = state.history[t];
  bucket.xpGained += amount;
  bucket.itemsDone += 1;
  bucket.itemsCorrect = (bucket.itemsCorrect || 0) + (correct ? 1 : 0);
  bucket.correctRate = Math.round((bucket.itemsCorrect / bucket.itemsDone) * 100) / 100;
  saveState();
  floatXP(amount);
  updateStats(true);
}

/* =============================================================
   ERROR ATTRIBUTION MODAL — pops after a wrong answer (SPEC §3.3)
   ============================================================= */
function showErrorTagModal(section, onDone) {
  const tags = section === 'Listening' ? ERROR_TAGS.listening : ERROR_TAGS.reading;
  const back = document.createElement('div');
  back.className = 'modal-back';
  back.innerHTML = `
    <div class="modal">
      <div class="modal-icon">🎯</div>
      <div class="modal-title">What tripped you up?</div>
      <div class="modal-body">Pick the reason closest to what happened. This builds your error-pattern report on the Progress tab.</div>
      <div class="q-options" id="tag-options">
        ${tags.map(t => `<button class="q-opt" data-tag="${t.id}">${t.label}</button>`).join('')}
      </div>
      <button class="begin-btn skip-btn" id="tag-skip">Skip</button>
    </div>
  `;
  document.body.appendChild(back);
  back.querySelectorAll('[data-tag]').forEach(btn => {
    btn.onclick = () => { back.remove(); onDone(btn.dataset.tag); };
  });
  back.querySelector('#tag-skip').onclick = () => { back.remove(); onDone(null); };
}

/* =============================================================
   CLICK-TO-TRANSLATE — click any word in a passage/lesson body
   (SPEC §8, option C: built-in dict + Free Dictionary API fallback)
   ============================================================= */
function showWordModal(word, contextSentence) {
  const back = document.createElement('div');
  back.className = 'modal-back';
  back.innerHTML = `
    <div class="modal" style="text-align:left;">
      <div style="text-align:center;"><div class="modal-icon">📖</div></div>
      <div id="word-modal-body" style="text-align:center; color:var(--text-dim);">Looking up "${word}"…</div>
      <button class="begin-btn skip-btn" id="word-modal-close" style="margin-top:16px;">Close</button>
    </div>
  `;
  document.body.appendChild(back);
  back.querySelector('#word-modal-close').onclick = () => back.remove();
  back.addEventListener('click', (e) => { if (e.target === back) back.remove(); });

  getDefinition(word).then(entry => {
    const already = isInGlossary(state, entry.word);
    const meaningsHtml = entry.meanings.length === 0
      ? `<div style="color:var(--text-dim); font-size:14px; text-align:center; padding:12px 0;">${entry.error || 'No definition found.'}</div>`
      : entry.meanings.map((m, i) => `
          <div class="meaning-block${i > 0 ? ' meaning-block--sep' : ''}">
            <div class="meaning-pos">${m.pos || 'entry'}</div>
            <div class="meaning-def">${m.def}</div>
            ${m.synonyms && m.synonyms.length ? `<div class="meaning-syn">Synonyms: ${m.synonyms.join(', ')}</div>` : ''}
            ${m.example ? `<div class="meaning-ex">"${m.example}"</div>` : ''}
          </div>
        `).join('');
    document.getElementById('word-modal-body').innerHTML = `
      <div style="text-align:center;">
        <div class="vocab-word">${entry.word}</div>
        ${entry.zh ? `<div style="color:var(--accent); font-size:14px; margin-bottom:12px;">${entry.zh}</div>` : ''}
      </div>
      <div class="meaning-list">${meaningsHtml}</div>
      <button class="begin-btn" id="add-glossary-btn" style="margin-top:16px;" ${already || entry.meanings.length === 0 ? 'disabled' : ''}>${already ? '✓ In your glossary' : entry.meanings.length === 0 ? 'Nothing to add' : '+ Add to Glossary'}</button>
    `;
    const addBtn = document.getElementById('add-glossary-btn');
    if (!already && entry.meanings.length > 0) {
      addBtn.onclick = () => {
        const primary = entry.meanings[0];
        const defLine = (primary.pos ? '(' + primary.pos + ') ' : '') + primary.def;
        addToGlossary(state, { word: entry.word, def: defLine, zh: entry.zh, addedFrom: 'reading', addedAt: todayStr(), context: contextSentence });
        scheduleItem(state, 'v:' + entry.word, 2, { type: 'vocab' });
        saveState();
        addBtn.disabled = true;
        addBtn.textContent = '✓ Added';
      };
    }
  });
}

function initWordClickDelegation() {
  $view.addEventListener('click', (e) => {
    const wordEl = e.target.closest('.word');
    if (!wordEl) return;
    const word = wordEl.textContent.trim();
    if (!word) return;
    const sentence = wordEl.closest('.q-context, .lesson-body')?.textContent?.trim().slice(0, 200) || '';
    showWordModal(word, sentence);
  });
}

/* =============================================================
   SHARED QUESTION FEEDBACK (used by both lesson practice + review)
   ============================================================= */
function renderFeedback(q, correct, onNext) {
  const fb = document.getElementById('feedback-slot');
  const lang = getLang(state);
  fb.innerHTML = `
    <div class="feedback ${correct ? 'correct' : 'wrong'}">
      <div class="feedback-label">${correct ? '✓ Nailed it' : '✗ Not quite'}</div>
      <div>${correct ? 'Correct — here is why:' : 'The correct answer is <strong>' + q.options[q.answer] + '</strong>.'}</div>
      <div class="insight">
        💡 <span id="insight-text">${insightText(q, lang)}</span>
        <button class="lang-toggle" id="lang-toggle">${lang === 'en' ? '中文' : 'EN'}</button>
      </div>
      <button class="begin-btn" style="margin-top:14px" id="next-q">${onNext.label}</button>
    </div>
  `;
  document.getElementById('lang-toggle').onclick = () => {
    const newLang = toggleLang(state);
    saveState();
    document.getElementById('insight-text').innerHTML = insightText(q, newLang);
    document.getElementById('lang-toggle').textContent = newLang === 'en' ? '中文' : 'EN';
  };
  document.getElementById('next-q').onclick = onNext.action;
}

function gradeAnswer(chosen, q, itemId, section, onGraded) {
  const buttons = document.querySelectorAll('.q-opt');
  const correct = chosen === q.answer;
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add('correct');
    else if (i === chosen && !correct) b.classList.add('wrong');
  });

  const finish = (errorTag) => {
    scheduleItem(state, itemId, correct ? 2 : 0, { errorTag });
    if (errorTag) recordErrorTag(state, todayStr(), errorTag);
    gainXP(XP_PER_ITEM + (correct ? 5 : 0), correct);
    saveState();
    onGraded(correct);
  };

  if (correct) finish(null);
  else showErrorTagModal(section, finish);
}

/* --- VIEW: TODAY (technique picker) --- */
function renderToday() {
  renderTechniquePicker();
}

function renderTechniquePicker() {
  const bySection = {};
  LESSONS.forEach(l => {
    (bySection[l.section] = bySection[l.section] || []).push(l);
  });
  const sections = Object.entries(bySection);
  $view.innerHTML = `
    <div class="card">
      <div class="card-title">Choose a Technique</div>
      <div class="card-heading">What do you want to practice today?</div>
      <div class="card-sub">Pick any lesson — completed ones can be replayed anytime.</div>
    </div>
    ${sections.length === 0 ? '<div class="empty"><div class="empty-icon">🚧</div><div class="empty-title">No lessons yet</div></div>' :
      sections.map(([section, lessons]) => `
      <div class="card">
        <div class="card-title">${section}</div>
        ${lessons.map(l => `
          <div class="mastery-item" style="cursor:pointer" data-lesson="${l.id}">
            <div>
              <div class="m-word">${l.title}</div>
              <div style="font-size:12px; color:var(--text-dim); margin-top:2px;">${l.subtitle}</div>
            </div>
            <div class="mastery-level">${state.completedLessons.includes(l.id) ? '<span style="color:var(--success)">✓ Done</span>' : '<span style="color:var(--accent)">Start →</span>'}</div>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
  document.querySelectorAll('[data-lesson]').forEach(el => {
    el.onclick = () => openLesson(el.dataset.lesson);
  });
}

function openLesson(lessonId) {
  state.todayLessonId = lessonId;
  saveState();
  renderLessonDetail(lessonId);
}

function renderLessonDetail(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  const done = state.completedLessons.includes(lessonId);
  $view.innerHTML = `
    <button class="lang-toggle" id="back-to-picker" style="margin-bottom:14px;">← All techniques</button>
    <div class="card">
      <div class="card-title">${lesson.section} · Technique</div>
      <div class="card-heading">${lesson.title}</div>
      <div class="card-sub">${lesson.subtitle}</div>
      <div class="lesson-body">${lesson.body}</div>
      <button class="begin-btn" id="begin-btn">${done ? 'Practice Again →' : 'Start Practice →'}</button>
    </div>
  `;
  wrapWordsForClick(document.querySelector('.lesson-body'));
  document.getElementById('back-to-picker').onclick = renderTechniquePicker;
  document.getElementById('begin-btn').onclick = () => startLessonPractice(lesson);
}

function startLessonPractice(lesson) {
  sessionState = {
    mode: 'lesson',
    lessonId: lesson.id,
    index: 0,
    list: lesson.questions,
    correct: 0
  };
  renderQuestionCard();
}

function renderQuestionCard() {
  const q = sessionState.list[sessionState.index];
  if (!q) return finishLessonSession();
  const lesson = LESSONS.find(l => l.id === sessionState.lessonId);
  $view.innerHTML = `
    <div class="card">
      <div class="card-title">${lesson.section} · Question ${sessionState.index + 1} / ${sessionState.list.length}</div>
      <div class="q-context">${q.context}</div>
      <div class="q-prompt">${q.prompt}</div>
      <div class="q-options" id="q-options">
        ${q.options.map((o, i) => `<button class="q-opt" data-i="${i}">${o}</button>`).join('')}
      </div>
      <div id="feedback-slot"></div>
    </div>
  `;
  wrapWordsForClick(document.querySelector('.q-context'));
  document.querySelectorAll('.q-opt').forEach(btn => {
    btn.onclick = () => {
      const itemId = 'q:' + sessionState.lessonId + ':' + sessionState.index;
      gradeAnswer(parseInt(btn.dataset.i), q, itemId, lesson.section, (correct) => {
        if (correct) sessionState.correct += 1;
        renderFeedback(q, correct, {
          label: sessionState.index + 1 >= sessionState.list.length ? 'Finish Lesson →' : 'Next →',
          action: () => { sessionState.index += 1; renderQuestionCard(); }
        });
      });
    };
  });
}

function finishLessonSession() {
  const lesson = LESSONS.find(l => l.id === sessionState.lessonId);
  if (!state.completedLessons.includes(lesson.id)) {
    state.completedLessons.push(lesson.id);
  }
  updateLessonMastery(state, lesson, true);
  saveState();
  const pct = Math.round(100 * sessionState.correct / sessionState.list.length);
  $view.innerHTML = `
    <div class="card" style="text-align:center; padding:40px 24px;">
      <div style="font-size:48px; margin-bottom:8px;">${pct >= 80 ? '🎯' : pct >= 60 ? '💪' : '📚'}</div>
      <div style="font-size:22px; font-weight:700; margin-bottom:6px;">Lesson Complete</div>
      <div style="color:var(--text-dim); margin-bottom:20px;">Accuracy ${sessionState.correct} / ${sessionState.list.length} (${pct}%) · now in your spaced review queue</div>
      <button class="begin-btn" onclick="switchView('today')">Continue →</button>
    </div>
  `;
}

/* --- VIEW: REVIEW --- */
function renderReview() {
  const dueIds = getDueItems(state);
  if (dueIds.length === 0) {
    $view.innerHTML = `
      <div class="empty">
        <div class="empty-icon">☀️</div>
        <div class="empty-title">Nothing due for review today</div>
        <div class="empty-sub">Go learn something new in "Today" — review tasks will show up here starting tomorrow.</div>
      </div>`;
    return;
  }
  sessionState = { mode: 'review', index: 0, list: dueIds };
  renderReviewCard();
}

function renderReviewCard() {
  const id = sessionState.list[sessionState.index];
  if (!id) {
    $view.innerHTML = `
      <div class="card" style="text-align:center; padding:40px 24px;">
        <div style="font-size:48px; margin-bottom:8px;">🎯</div>
        <div style="font-size:22px; font-weight:700; margin-bottom:6px;">Review Complete</div>
        <div style="color:var(--text-dim); margin-bottom:20px;">Reviewed ${sessionState.list.length} item(s). Intervals refreshed.</div>
        <button class="begin-btn" onclick="switchView('today')">Back to Today →</button>
      </div>
    `;
    return;
  }
  if (id.startsWith('v:')) return renderVocabReviewCard(id);
  if (!id.startsWith('q:')) {
    sessionState.index += 1;
    return renderReviewCard();
  }
  const parts = id.split(':');
  const lessonId = parts[1];
  const qIdx = parseInt(parts[2]);
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson || !lesson.questions[qIdx]) {
    sessionState.index += 1;
    return renderReviewCard();
  }
  const q = lesson.questions[qIdx];
  $view.innerHTML = `
    <div class="card">
      <div class="card-title">Review · ${lesson.section} · ${sessionState.index + 1} / ${sessionState.list.length}</div>
      <div class="q-context">${q.context}</div>
      <div class="q-prompt">${q.prompt}</div>
      <div class="q-options" id="q-options">
        ${q.options.map((o, i) => `<button class="q-opt" data-i="${i}">${o}</button>`).join('')}
      </div>
      <div id="feedback-slot"></div>
    </div>
  `;
  wrapWordsForClick(document.querySelector('.q-context'));
  document.querySelectorAll('.q-opt').forEach(btn => {
    btn.onclick = () => {
      gradeAnswer(parseInt(btn.dataset.i), q, id, lesson.section, (correct) => {
        renderFeedback(q, correct, {
          label: 'Next →',
          action: () => { sessionState.index += 1; renderReviewCard(); }
        });
      });
    };
  });
}

function renderVocabReviewCard(id) {
  const word = id.slice(2);
  const entry = state.glossary.find(g => g.word === word);
  if (!entry) {
    sessionState.index += 1;
    return renderReviewCard();
  }
  $view.innerHTML = `
    <div class="card">
      <div class="card-title">Review · Glossary · ${sessionState.index + 1} / ${sessionState.list.length}</div>
      <div class="vocab-word">${entry.word}</div>
      <div style="margin: 20px 0; color: var(--text-dim); font-size:14px;">Try to recall the meaning before revealing:</div>
      <button class="begin-btn" id="reveal-btn">Reveal</button>
      <div id="reveal-slot"></div>
    </div>
  `;
  document.getElementById('reveal-btn').onclick = () => {
    document.getElementById('reveal-btn').style.display = 'none';
    document.getElementById('reveal-slot').innerHTML = `
      <div class="vocab-def" style="margin-top:20px">${entry.def}</div>
      ${entry.zh ? `<div style="color:var(--text-dim); margin-bottom:12px;">${entry.zh}</div>` : ''}
      <div style="font-size:13px; color:var(--text-dim); margin-top:16px;">Did you recall it correctly?</div>
      <div class="rating">
        <button class="r-forgot" data-r="0">Forgot<span class="interval">tomorrow</span></button>
        <button class="r-hard" data-r="1">Sort of<span class="interval">same interval</span></button>
        <button class="r-good" data-r="2">Nailed it<span class="interval">longer interval</span></button>
      </div>
    `;
    document.querySelectorAll('.rating button').forEach(b => {
      b.onclick = () => {
        scheduleItem(state, id, parseInt(b.dataset.r), { type: 'vocab' });
        saveState();
        sessionState.index += 1;
        renderReviewCard();
      };
    });
  };
}

/* --- VIEW: LIBRARY --- */
function renderLibrary() {
  const completed = state.completedLessons;
  $view.innerHTML = `
    <div class="card">
      <div class="card-title">Skill Library</div>
      <div class="card-heading">Techniques you've learned</div>
      <div class="card-sub">Click any lesson to review the explanation and practice again.</div>
      ${LESSONS.map(l => `
        <div class="mastery-item" style="cursor:pointer" data-lesson="${l.id}">
          <div>
            <div class="m-word">${l.title}</div>
            <div style="font-size:12px; color:var(--text-dim); margin-top:2px;">${l.section} · ${l.subtitle}</div>
          </div>
          <div class="mastery-level">${completed.includes(l.id) ? '<span style="color:var(--success)">✓ Done</span>' : '<span style="color:var(--text-dimmer)">Not started</span>'}</div>
        </div>
      `).join('')}
    </div>
    <div class="card">
      <div class="card-title">My Glossary</div>
      <div class="card-heading">${state.glossary.length} word(s) saved</div>
      <div class="card-sub">Click any word in a passage or lesson to look it up and save it here.</div>
      ${state.glossary.length === 0 ? '<div style="color:var(--text-dim); font-size:14px;">Nothing saved yet.</div>' :
        state.glossary.slice().reverse().map(g => `
          <div class="mastery-item">
            <div>
              <div class="m-word">${g.word}</div>
              <div style="font-size:12px; color:var(--text-dim); margin-top:2px;">${g.def}${g.zh ? ' · ' + g.zh : ''}</div>
            </div>
          </div>
        `).join('')}
    </div>
  `;
  document.querySelectorAll('[data-lesson]').forEach(el => {
    el.onclick = () => {
      document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.view === 'today'));
      currentView = 'today';
      openLesson(el.dataset.lesson);
    };
  });
}

/* --- VIEW: PROGRESS --- */
function renderProgress() {
  const DAY_MS = 86400000;
  const days = [];
  const now = new Date(todayStr() + 'T00:00:00');
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now.getTime() - i * DAY_MS);
    const key = d.toISOString().slice(0, 10);
    days.push({ key, done: !!state.history[key], today: i === 0 });
  }
  const items = Object.entries(state.items).map(([id, data]) => {
    let label = id;
    if (id.startsWith('q:')) {
      const parts = id.split(':');
      const lesson = LESSONS.find(l => l.id === parts[1]);
      label = (lesson ? lesson.title : parts[1]) + ' · Q' + (parseInt(parts[2]) + 1);
    }
    return { id, label, level: data.level, nextDue: data.nextDue };
  }).sort((a, b) => b.level - a.level);

  const dist = weeklyErrorDistribution(state);
  const distEntries = Object.entries(dist).sort((a, b) => b[1] - a[1]);
  const maxCount = distEntries.length ? distEntries[0][1] : 0;

  $view.innerHTML = `
    <div class="card">
      <div class="card-title">Streak</div>
      <div class="card-heading">${state.meta.streak} days</div>
      <div class="card-sub">Last 14 days</div>
      <div class="calendar">
        ${days.map(d => `<div class="day ${d.done ? 'done' : ''} ${d.today ? 'today' : ''}" title="${d.key}"></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-title">Error Pattern · Last 7 Days</div>
      <div class="card-heading">${distEntries.reduce((sum, [, n]) => sum + n, 0)} mistakes tagged</div>
      <div class="card-sub">What's tripping you up, ranked by frequency.</div>
      ${distEntries.length === 0 ? '<div style="color:var(--text-dim); font-size:14px;">No tagged mistakes yet this week.</div>' :
        distEntries.map(([tag, n]) => `
          <div class="tagbar-row">
            <div class="tagbar-label">${tagLabel(tag)}</div>
            <div class="tagbar-track"><div class="tagbar-fill" style="width:${Math.round((n / maxCount) * 100)}%"></div></div>
            <div class="tagbar-count">${n}</div>
          </div>
        `).join('')}
    </div>
    <div class="card">
      <div class="card-title">Mastery</div>
      <div class="card-heading">${items.length} item(s) in review queue</div>
      <div class="card-sub">Stars = SRS level. Higher means longer intervals.</div>
      ${items.length === 0 ? '<div style="color:var(--text-dim); font-size:14px;">Nothing started yet. Head to "Today" to begin.</div>' :
        items.slice(0, 30).map(item => `
          <div class="mastery-item">
            <div class="m-word">${item.label}</div>
            <div class="mastery-level">
              <span class="stars">${'★'.repeat(item.level)}${'☆'.repeat(5 - item.level)}</span>
              <span style="margin-left:8px">${item.nextDue}</span>
            </div>
          </div>
        `).join('')}
    </div>
  `;
}

/* =============================================================
   NAV
   ============================================================= */
function switchView(v) {
  currentView = v;
  document.querySelectorAll('.nav button').forEach(b => {
    b.classList.toggle('active', b.dataset.view === v);
  });
  if (v === 'today') renderToday();
  else if (v === 'review') renderReview();
  else if (v === 'library') renderLibrary();
  else if (v === 'progress') renderProgress();
}
document.querySelectorAll('.nav button').forEach(b => {
  b.onclick = () => switchView(b.dataset.view);
});
window.switchView = switchView;

/* =============================================================
   INIT
   ============================================================= */
state = loadState();
updateStreak();
updateStats();
initWordClickDelegation();
switchView('today');
