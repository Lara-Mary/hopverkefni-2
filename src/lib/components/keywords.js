import { el } from '../elements.js';

export function renderKeywords(indexJson, contentJson) {
  console.log('rendering keywords page');

  const mainElement = el(
    'main',
    {},
    el(
      'section',
      {}, 
      el('p', {}, indexJson.description),
      el(
        'p',
        {},
        'Ég er content page, þetta er contentið mitt' +
          JSON.stringify(contentJson),
      ),
    ),
  );

  return mainElement;
}
