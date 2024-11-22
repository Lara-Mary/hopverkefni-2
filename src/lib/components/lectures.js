import { el } from "../elements.js";

export function renderLectures(indexJson, contentJson) {
  console.log("rendering lectures page");

  const wrapperElement = el("main", {});

  const titleElement = el("h2", {}, contentJson.title);
  wrapperElement.appendChild(titleElement);

  const lecturesElement = el("div", { class: "lectures-wrapper" });

  for (const lecture of contentJson.lectures) {
    const lectureItemElement = el("div", { class: "lecture-item" });

    const lectureTitleElement = el("h3", {}, lecture.title);
    lectureItemElement.appendChild(lectureTitleElement);

    for (const content of lecture.content) {
      const contentElement = createLectureContent(content);
      lectureItemElement.appendChild(contentElement);
    }

    lecturesElement.appendChild(lectureItemElement);
  }

  wrapperElement.appendChild(lecturesElement);

  return wrapperElement;
}
function createLectureContent(content) {
  const { type, data, attribute, caption } = content;

  if (type === "heading") return el("h4", {}, data);
  if (type === "text") return el("p", {}, data);
  if (type === "quote") {
    return el(
      "blockquote",
      {},
      el("p", {}, data),
      attribute ? el("cite", {}, `– ${attribute}`) : null,
    );
  }
  if (type === "image") {
    return el(
      "figure",
      {},
      el("img", { src: data, alt: caption || "" }),
      caption ? el("figcaption", {}, caption) : null,
    );
  }
  if (type === "list") {
    const listElement = el("ul", {});
    for (const item of data) {
      listElement.appendChild(el("li", {}, item));
    }
    return listElement;
  }
  if (type === "code") {
    return el("pre", {}, el("code", {}, data));
  }

  console.warn("Unknown content type:", type);
  return el("div", {}, `Óþekkt efnisgerð: ${type}`);
}
