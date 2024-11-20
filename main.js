import { el } from './src/lib/elements.js';

async function fetchIndex() {
    const file = 'data/index.json';

    const response = await fetch(file);
    const json = await response.json();

    return json;
}

async function render (root) {
    const indexJson = await fetchIndex();
    console.log('rendering', root, indexJson.title);

    const headerElement = el('header', {}, el ('h1', {}, indexJson.title));
    


/*
<nav>
<a href="${url}">${title}</a>
<a href="${url}">${title}</a>
<a href="${url}">${title}</a>
</nav>
*/
const navigationElement = el('ul', {});

for (const item of indexJson.navigation)
{
    const {title, slug} = item;
    /* sama og 
    const title = item.title
    const slug = item.slug
    */
   const href = `#${slug}`;
   const navItemElement = el('li', {}, el ('a', {href }, title));
   navigationElement.appendChild;
   (navItemElement);
}
headerElement.appendChild(el('nav', {}, navigationElement));

const mainElement = el(
    'main',
    {},
    el('section', {}, el('p', {}, 
        indexJson.description))
);
const footerElement = el('footer', {}, indexJson.footer);

root.appendChild(headerElement);
root.appendChild(mainElement);
root.appendChild(footerElement);
}