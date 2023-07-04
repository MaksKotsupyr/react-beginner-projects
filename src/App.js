import './index.scss';
import React from 'react';

function App() {
  //створюємо стан змінної і функцію для зміни значення
  // 0 - початкове значення стану і цей хук сповіщає Реакт про зміну і заставляє перемалювати її
  const [count, setCount] = React.useState(0); 

  //створюємо функцію для зміни значення(+)
  const onClickPlus = () => {
    setCount(count + 1);
  }

  //створюємо функцію для зміни значення(-)
  const onClickMinus = () => {
    setCount(count - 1);
  }

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button onClick={onClickMinus} className="minus">- Минус</button>
        <button onClick={onClickPlus} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;

