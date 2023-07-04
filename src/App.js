import './index.scss';
import React from 'react';

//список запитань який містить заголовок, варіанти відповідей і індекс правильної відповіді
const questions = [
  {
    title: 'React - це ... ?',
    variants: ['бібліотека', 'фреймворк', 'додаток'],
    correct: 0,
  },
  {
    title: 'Компонент - це ... ',
    variants: ['додаток', 'частина додатку або сторінки', 'те, що я не знаю що це таке'],
    correct: 1,
  },
  {
    title: 'Що таке JSX?',
    variants: [
      'Це простий HTML',
      'Це функція',
      'Це той же HTML, але з можливістю виконувати JS-код',
    ],
    correct: 2,
  },
];

//компонента результат - функція для початку нової гри та кількість парвильних відповідей
function Result({ restartGame, correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Ви відгадали {correct} відповіді з {questions.length}</h2>
      <button onClick={restartGame}>Спробувати знову</button>
    </div>
  );
}

//
function Game({ step, question, onClickVariant }) {
  const percentage = Math.round((step / questions.length) * 100);

  return (
    <>
    {/* прогрес бар - на якому ти кроці */}
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      {/* рендер відповідей списком */}
      <ul>
        {question.variants.map((text, index) => (
          <li onClick={()=> onClickVariant(index)} key={text}>{text}</li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
    setStep(step + 1);

    if(index === question.correct) {
      setCorrect(correct + 1);
    }
  }

  const restartGame = () => {
    setStep(0);
    setCorrect(0);
  }

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant}/>
      ) : (
        <Result restartGame={restartGame} correct={correct} />
      )

      }
    </div>
  );
}

export default App;
