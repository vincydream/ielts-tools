/* Per-lesson mastery score: average SRS level across a lesson's questions (SPEC §6 lessonMastery). */

import { todayStr } from './srs.js';

export function updateLessonMastery(state, lesson, completed) {
  const scores = lesson.questions.map((_, i) => {
    const item = state.items['q:' + lesson.id + ':' + i];
    return item ? item.level / 5 : 0;
  });
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  state.lessonMastery[lesson.id] = {
    completed,
    masteryScore: Math.round(avg * 100) / 100,
    lastPracticed: todayStr()
  };
}
