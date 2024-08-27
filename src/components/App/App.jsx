import {useState} from 'react';
import SearchBar from "../SearchBar/SearchBar"

function App() {
  const [search, setSearch] = useState("");

  const changeHandler = ({target: {value}}) => setSearch(value); // Track user input in SearchBar component.

  return (
    <>
      <header className="header">
        <h1 className="centered-text">Ja<span>mmm</span>ing</h1>
      </header>
      <main>
        <SearchBar value={search} onChange={changeHandler} />
      </main>
    </>
  )
}

export default App