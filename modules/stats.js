/* Error-attribution tag taxonomy + weekly distribution stats (SPEC §3.3). */

import { daysBetween } from './srs.js';

export const ERROR_TAGS = {
  reading: [
    { id: 'missed_absolute_qualifier', label: 'Missed an absolute qualifier (all / only / always / must)' },
    { id: 'missed_synonym', label: 'Missed a synonym / paraphrase' },
    { id: 'timeline_tense_confusion', label: 'Timeline / tense confusion' },
    { id: 'reversed_causality', label: 'Reversed causality' },
    { id: 'missed_numerical_detail', label: 'Missed a numerical / comparative detail' },
    { id: 'main_idea_detail_confusion', label: 'Confused main idea with a detail' },
    { id: 'author_vs_cited_view', label: "Confused the author's view with a cited view" },
    { id: 'ran_out_of_time', label: 'Ran out of time / guessed' }
  ],
  listening: [
    { id: 'wrong_pos_prediction', label: 'Wrong part-of-speech prediction' },
    { id: 'missed_singular_plural', label: 'Missed singular / plural' },
    { id: 'number_letter_date_trap', label: 'Number / letter / date trap' },
    { id: 'missed_paraphrase_audio', label: 'Missed a paraphrase in the audio' },
    { id: 'fell_for_distractor', label: 'Fell for a distractor' },
    { id: 'zoned_out', label: 'Zoned out / lost pace' }
  ]
};

export function tagLabel(tagId) {
  const all = [...ERROR_TAGS.reading, ...ERROR_TAGS.listening];
  const found = all.find(t => t.id === tagId);
  return found ? found.label : tagId;
}

export function recordErrorTag(state, date, tag) {
  if (!state.history[date]) {
    state.history[date] = { xpGained: 0, itemsDone: 0, itemsCorrect: 0, correctRate: 0, errorTags: {} };
  }
  if (!state.history[date].errorTags) state.history[date].errorTags = {};
  state.history[date].errorTags[tag] = (state.history[date].errorTags[tag] || 0) + 1;
}

/* Aggregate error tags from the last 7 days (inclusive of today). */
export function weeklyErrorDistribution(state) {
  const counts = {};
  Object.entries(state.history).forEach(([date, bucket]) => {
    if (!bucket.errorTags) return;
    if (daysBetween(date) > 6) return;
    Object.entries(bucket.errorTags).forEach(([tag, n]) => {
      counts[tag] = (counts[tag] || 0) + n;
    });
  });
  return counts;
}
