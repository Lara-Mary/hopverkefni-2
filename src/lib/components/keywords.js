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

  const wrapperElement = el('main', {});
  const titleElement = el('h2', {}, contentJson.title);
  wrapperElement.appendChild(titleElement);

  const keywordsElement = el('div', {});

  for (const item of contentJson.keywords) {
    const keywordItemElement = el('div', {});
    const keywordTitleElement = el('h3', {}, item.title);
    const keywordPElement = el('p', {}, item.content);

    keywordItemElement.appendChild(keywordTitleElement);
    keywordItemElement.appendChild(keywordPElement);

    keywordsElement.appendChild(keywordItemElement);
  }

  wrapperElement.appendChild(keywordsElement);
  
  return wrapperElement;
}
