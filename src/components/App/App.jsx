import {useState} from 'react';
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {testSongs} from '../../mocks/spotifyMock';

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(testSongs);

  const changeHandler = ({target: {value}}) => setSearch(value); // Track user input in SearchBar component.

  return (
    <>
      <header className="header">
        <h1 className="centered-text">Ja<span>mmm</span>ing</h1>
      </header>
      <main>
        <SearchBar value={search} onChange={changeHandler} />
        <div id="search-results-and-playlist">
          <SearchResults search={search} tracks={searchResults} />
          <Playlist tracks={searchResults} />
        </div>
      </main>
    </>
  )
}

export default App