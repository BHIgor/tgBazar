import { useContext, useState } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Help.scss'

export const Help = () =>{
  const { dataDB } = useContext(ReactContext);
  const faqData = [
    {
      question: "Як нам поставити запитання?",
      answers: [
        `Ви можете написати нам ${((dataDB.length !== 0) ? ((dataDB?.settings[0]?.telegaContact !== '')? `в telegram: ${dataDB?.settings[0]?.telegaContact}` :null) :null)} 
        ${((dataDB.length !== 0) ? ((dataDB?.settings[0]?.instaContact !== '')? `в instagram: ${dataDB?.settings[0]?.instaContact}` :null) :null)} 
        ${((dataDB.length !== 0) ? ((dataDB?.settings[0]?.viberContact !== '')? `в viber: ${dataDB?.settings[0]?.viberContact}` :null) :null)}`]
    },
    {
      question: "Я зробив замовлення, але зі мною не зв'язались, чому?",
      answers: [
        "Ви можете перевірити статус замовлення в розділі 'Мої замовлення'. Ми можемо написати або зателефонувати вам якщо це потрібно."
      ]
    },
    {
      question: "Я хочу купити товар певного кольору чи розміру, як це зробити?",
      answers: [
        "Під час замовлення вкажіть в полі 'Коментар', що саме Вас цікавить"
      ]
    },
    {
      question: "Проблема з функціоналом магазину?",
      answers: [
        "Ви можете повідомити про це розробника https://t.me/betplaneto"
      ]
    },
    {
      question: "Як мені відкрити такий магазин для себе?",
      answers: [
        "Інтернет магазин розроблений за допомогою telegram бота @tgbazarShop"
      ]
    },
   
   
  ];

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const handleQuestionToggle = (index) => {
    if (selectedQuestionIndex === index) {
      setSelectedQuestionIndex(null); // Если уже выбран этот вопрос, закрываем ответ
    } else {
      setSelectedQuestionIndex(index); // Иначе, открываем ответ для этого вопроса
    }
  };
  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="titleText">Допомога</div>
      <div className="help">
        <div className="help__list">
          {faqData.map((faq, index) => (
            <div key={index} className="help__list--item"
            onClick={() => handleQuestionToggle(index)}>
              <div className="help__list--question" >
                {faq.question}
              </div>

              {selectedQuestionIndex === index && (
                faq.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className='help__list--answer'><span className='help__list--answerText'>Відповідь:</span> {answer}</div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </>
    }
  </>
}