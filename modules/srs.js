/* Ebbinghaus-style spaced repetition: 6 levels, 1/2/4/8/16/32 day intervals. */

export const DAY_MS = 86400000;
export const SRS_INTERVALS = [1, 2, 4, 8, 16, 32];

export function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

export function daysBetween(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date(todayStr() + 'T00:00:00');
  return Math.round((now - d) / DAY_MS);
}

/* rating: 0 = forgot, 1 = hard, 2 = good */
export function scheduleItem(state, itemId, rating, extra = {}) {
  const item = state.items[itemId] || {
    type: extra.type || 'question',
    level: 0,
    nextDue: null,
    lastSeen: null,
    correctStreak: 0,
    history: []
  };
  if (rating === 0) {
    item.level = 0;
    item.correctStreak = 0;
  } else if (rating === 1) {
    item.level = Math.max(0, item.level);
    item.correctStreak = 0;
  } else {
    item.level = Math.min(SRS_INTERVALS.length - 1, item.level + 1);
    item.correctStreak += 1;
  }
  const interval = SRS_INTERVALS[item.level];
  const due = new Date();
  due.setDate(due.getDate() + interval);
  item.nextDue = due.toISOString().slice(0, 10);
  item.lastSeen = todayStr();
  item.history.push({ date: todayStr(), correct: rating === 2, errorTag: extra.errorTag || null });
  state.items[itemId] = item;
  return item;
}

export function getDueItems(state) {
  const today = todayStr();
  return Object.entries(state.items)
    .filter(([, data]) => data.nextDue <= today)
    .map(([id]) => id);
}
