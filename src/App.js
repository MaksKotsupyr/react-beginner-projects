import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [invetes, setInvetes] = React.useState([]);


  //відправка запиту при першому рендері
  React.useEffect(() => {
    fetch('https://reqres.in/api/users') //отримуємо користувачів
      .then(res => res.json()) //преобразуємо в json
      .then(json => setUsers(json.data)) //записуємо користувачів
      .catch(err => console.warn(err)) //виводимо помилку
      .finally(() => setIsLoading(false)); //відображаємо юзерів замість скелетонів
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const onClickInvite = (id) => {
    if (invetes.includes(id)) {
      setInvetes(prev => prev.filter(_id => _id !== id));
    } else {
      setInvetes(prev => [...prev, id]);
    }
  }

  const onClickSendInvite = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {
        success ? (
          <Success count={invetes.length} />
        ) : (
          <Users
            onChangeSearchValue={onChangeSearchValue}
            searchValue={searchValue}
            items={users}
            isLoading={isLoading}
            onClickInvite={onClickInvite}
            invetes={invetes}
            onClickSendInvite={onClickSendInvite}
          />
        )
      }
    </div>
  );
}

export default App;
