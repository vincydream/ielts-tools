/* English/Chinese toggle — scoped to trap-insight text only (SPEC §3.2). */

export function getLang(state) {
  return state.meta.langPref || 'en';
}

export function toggleLang(state) {
  state.meta.langPref = state.meta.langPref === 'zh' ? 'en' : 'zh';
  return state.meta.langPref;
}

export function insightText(q, lang) {
  return lang === 'zh' ? q.insight.zh : q.insight.en;
}
