import test from 'node:test';
import assert from 'node:assert/strict';
import { getShristiResponse, SAMPLE_PROMPTS } from './shristiAiEngine.ts';

test('getShristiResponse returns Odia response when query contains Odia text', () => {
  const result = getShristiResponse('ଓଡ଼ିଶା କଲେଜ ERP ଉପସ୍ଥାନ ବିଷୟରେ କୁହନ୍ତୁ', 'odia');
  assert.equal(result.lang, 'odia');
  assert.ok(result.responseText.includes('ଧନେକ୍ସା'));
  assert.ok(result.responseText.includes('ଉପସ୍ଥାନ'));
  assert.ok(result.suggestedActions.length > 0);
});

test('getShristiResponse responds to ERP proxy attendance query in English with Odia summary', () => {
  const result = getShristiResponse('How does Dhanexa ERP stop proxy attendance?', 'english');
  assert.equal(result.lang, 'english');
  assert.ok(result.responseText.includes('liveness detection'));
  assert.ok(result.odiaTranslation !== undefined);
  assert.ok(result.suggestedActions.some((a) => a.includes('Attendance Simulator')));
});

test('SAMPLE_PROMPTS contains categorized prompts in Odia and English', () => {
  assert.ok(SAMPLE_PROMPTS.length >= 4);
  assert.ok(SAMPLE_PROMPTS.some((p) => p.lang === 'odia'));
  assert.ok(SAMPLE_PROMPTS.some((p) => p.lang === 'english'));
});
