import { el } from '../elements.js';

export function renderQuestions(indexJson, contentJson) {
  console.log('rendering questions page');

  const wrapperElement = el('main', {});
  const titleElement = el('h2', {}, contentJson.title);
  wrapperElement.appendChild(titleElement);

  const questionsElement = el('div', {class: 'questionsWrapper'});

  for (const item of contentJson.questions) {
    const questionItemElement = el('div', { class: 'questionItem'});
    const questionTitleElement = el('h3', {}, item.question);
    
    const answersElement = el ('ul', {class: 'answersList'});
    for (const answer of item.answers) {
       const answerClass = answer.correct ? 'correctAnswer' : 'incorrectAnswer';
       const answerItemElement = el ('li' ,{class: answerClass, style: answer.correct ? 'font-weight: bold' : '',} ,
        answer.answer
       );

        answersElement.appendChild(answerItemElement);
    }

    questionItemElement.appendChild(questionTitleElement);
    questionItemElement.appendChild(answersElement);

    questionsElement.appendChild(questionItemElement);
  }

  wrapperElement.appendChild(questionsElement);
  
  return wrapperElement;
}
