import { renderKeywords } from '../components/keywords.js';
import { renderNavigation } from '../components/navigation.js';
import { el } from '../elements.js';
import { fetcher } from '../fetcher.js';
import { renderLectures } from '../components/lectures.js'; 

export async function renderContentPage(root, indexJson, type, content) {
  console.log('rendering content page', root, indexJson.title);

  const contentJson = await fetcher(`data/${type}/${content}.json`);

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));

  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let mainElement;

  if(content === 'keywords') {
    mainElement = renderKeywords(indexJson, contentJson);
  } else if (content === 'lectures') {
    mainElement = renderLectures(indexJson, contentJson); 
  }
  else {
    mainElement = el(
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
  }

  const footerElement = el("footer", {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
