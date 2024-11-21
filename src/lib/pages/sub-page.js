import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetcher } from "../fetcher.js";

export async function renderSubpage(root, indexJson, type) {
  const headerElement = el("header", {}, el("h1", {}, indexJson.title));

  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let foundType = null;

  if (indexJson.navigation.find((i) => i.slug === type)) {
    foundType = type;
  }

  let mainElement;
  if (!foundType) {
    mainElement = el("main", {}, el("p", {}, "Fannst ekki"));
  } else {
    const contentJsonFile = `data/${type}/index.json`;
    const contentJson = await fetcher(contentJsonFile);

    const content = contentJson.content;
    const contentElement = el("div", { class: "content-wrapper" });

    // TODO ættum að skoða html structure hér
    for (const item of content) {
      const itemElement = document.createElement("section");

      const href = window.location.search + `&content=${item.slug}`;
      console.log("content href", href);

      const button = document.createElement("button");
      const link = el("a", { href }, item.title);
      button.appendChild(link);
      itemElement.appendChild(button);

      const itemText = document.createElement("div");
      itemText.textContent = item.text;

      itemElement.appendChild(button);
      itemElement.appendChild(itemText);

      contentElement.appendChild(itemElement);
    }

    mainElement = el("main", {}, contentElement);
  }

  const footerElement = el("footer", {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
