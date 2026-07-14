/* Click-to-translate + glossary (SPEC §8, option C: built-in dict + API fallback). */

export const BUILTIN_DICT = {
  mitigate: { pos: 'v.', def: 'to make something bad or serious less severe', zh: '减轻、缓解（负面事物）', synonyms: ['alleviate', 'ease', 'lessen'], example: 'Governments introduced subsidies to mitigate the economic impact of the pandemic.' },
  exacerbate: { pos: 'v.', def: 'to make a bad situation worse', zh: '使恶化、加剧（负面情况）', synonyms: ['aggravate', 'worsen', 'intensify'], example: 'Cutting funding would only exacerbate the shortage of qualified teachers.' },
  prevalent: { pos: 'adj.', def: 'widespread or common at a particular time', zh: '普遍的、流行的', synonyms: ['widespread', 'common', 'rife'], example: 'The belief that hard work guarantees success remains prevalent, despite growing evidence to the contrary.' },
  discrepancy: { pos: 'n.', def: 'a difference between things that should be the same', zh: '差异、不一致', synonyms: ['inconsistency', 'disparity', 'variance'], example: 'Researchers noted a significant discrepancy between the reported and observed results.' },
  robust: { pos: 'adj.', def: 'strong and unlikely to fail or break down', zh: '强健的、稳健的', synonyms: ['sturdy', 'resilient', 'solid'], example: 'The findings are supported by robust evidence from multiple independent studies.' },
  undermine: { pos: 'v.', def: 'to weaken something gradually, often from within', zh: '暗中削弱、逐渐损害', synonyms: ['weaken', 'erode', 'subvert'], example: 'Constant criticism can undermine even the most confident student.' },
  compelling: { pos: 'adj.', def: 'convincing, or capturing attention powerfully', zh: '令人信服的、引人入胜的', synonyms: ['persuasive', 'convincing', 'gripping'], example: 'She presented a compelling case for reforming the current evaluation system.' },
  ubiquitous: { pos: 'adj.', def: 'seeming to be everywhere at once', zh: '无处不在的', synonyms: ['omnipresent', 'pervasive', 'universal'], example: 'Surveillance cameras have become ubiquitous in modern cities.' },
  nuanced: { pos: 'adj.', def: 'characterized by subtle shades of meaning or expression', zh: '细致入微的、有细微差别的', synonyms: ['subtle', 'refined', 'sophisticated'], example: 'His analysis offered a nuanced view that avoided oversimplification.' },
  contentious: { pos: 'adj.', def: 'likely to cause disagreement', zh: '有争议的', synonyms: ['controversial', 'disputed', 'divisive'], example: 'Immigration policy remains one of the most contentious issues in the country.' },
  proliferation: { pos: 'n.', def: 'a rapid increase in the number or amount of something', zh: '激增、扩散', synonyms: ['surge', 'spread', 'explosion'], example: 'The proliferation of social media platforms has transformed how information spreads.' },
  coherent: { pos: 'adj.', def: 'logical and well-organized', zh: '连贯的、有条理的', synonyms: ['logical', 'consistent', 'organized'], example: 'A coherent argument requires clear structure and logical transitions.' },
  inherent: { pos: 'adj.', def: 'existing as a natural or basic part of something', zh: '内在的、固有的', synonyms: ['intrinsic', 'innate', 'built-in'], example: 'There are risks inherent in any long-term investment.' },
  scrutiny: { pos: 'n.', def: 'close and critical examination', zh: '仔细审查、严密关注', synonyms: ['examination', 'inspection', 'analysis'], example: "The company's financial practices came under close scrutiny after the scandal." },
  reconcile: { pos: 'v.', def: 'to make two seemingly conflicting things compatible', zh: '调和、使一致', synonyms: ['harmonize', 'square', 'align'], example: 'It is difficult to reconcile his public statements with his private actions.' }
};

/* Wrap each English word in a text node with a clickable span, without disturbing existing markup. */
export function wrapWordsForClick(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);
  textNodes.forEach(textNode => {
    const text = textNode.nodeValue;
    if (!/[A-Za-z]/.test(text)) return;
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    const re = /[A-Za-z']+/g;
    let m;
    while ((m = re.exec(text))) {
      if (m.index > lastIndex) frag.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = m[0];
      frag.appendChild(span);
      lastIndex = re.lastIndex;
    }
    if (lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

export async function getDefinition(rawWord) {
  const word = rawWord.toLowerCase().replace(/[^a-z']/g, '');
  if (BUILTIN_DICT[word]) return { source: 'local', word, ...BUILTIN_DICT[word] };
  try {
    const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word));
    if (!res.ok) throw new Error('not found');
    const data = await res.json();
    const meaning = data[0]?.meanings?.[0];
    const definition = meaning?.definitions?.[0];
    const synonyms = (definition?.synonyms?.length ? definition.synonyms : meaning?.synonyms || []).slice(0, 3);
    return {
      source: 'api',
      word,
      pos: meaning?.partOfSpeech ? meaning.partOfSpeech + '.' : '',
      def: definition?.definition || 'No definition found.',
      zh: null,
      synonyms,
      example: definition?.example || ''
    };
  } catch (e) {
    return { source: 'error', word, pos: '', def: 'Could not fetch a definition (offline, or not a recognized word).', zh: null, synonyms: [], example: '' };
  }
}

export function isInGlossary(state, word) {
  return state.glossary.some(g => g.word === word);
}

export function addToGlossary(state, entry) {
  if (isInGlossary(state, entry.word)) return;
  state.glossary.push({
    word: entry.word,
    def: entry.def,
    zh: entry.zh || '',
    addedFrom: entry.addedFrom || '',
    addedAt: entry.addedAt,
    context: entry.context || ''
  });
}
