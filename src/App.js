import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const categoties = [
  { "name": "Всі" },
  { "name": "Гори" },
  { "name": "Море" },
  { "name": "Архітектура" },
  { "name": "Міста" }
]

function App() {
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState(1);

  React.useEffect(() => {
    const category = categoryId ? `category=${categoryId}` : '';

    fetch(
      `https://64a416dcc3b509573b570a92.mockapi.io/photo_collections?&${category}`
    )
    .then((response) => response.json())
    .then((data) => setPagination(Math.ceil(data.length / 3)))
  }, [collections])

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(
      `https://64a416dcc3b509573b570a92.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
    )
      .then((response) => response.json())
      .then((data) => setCollections(data))
      .catch((error) => console.warn(error))
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя колекція фотографій</h1>
      <div className="top">
        <ul className="tags">
          {
            categoties.map((category, index) => (
              <li className={categoryId === index ? 'active' : ''} key={index} onClick={() => {setCategoryId(index); setPage(1)}}>{category.name}</li>
            ))
          }
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Пошук по назві" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Downloading ... </h2>
        ) : (
          collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())
          )
            .map((collection, index) => (
              <Collection
                key={index}
                name={collection.name}
                images={collection.photos}
              />
            ))
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(pagination)].map((_, index) => (
            <li key={index} className={page === index + 1 ? 'active' : ''} onClick={() => setPage(index + 1)}>{index + 1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
