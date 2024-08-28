import {useState} from 'react';
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {testSongs} from '../../mocks/spotifyMock';

function App() {
  ///// States /////
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(testSongs);
  const [playlistName, setPlaylistName] = useState("");

  ///// Handlers /////
  const changeHandler = ({target: {value}}) => setSearch(value); // Track user input in SearchBar component.

  const playlistNameHandler = ({target: {value}}) => setPlaylistName(value); // Tracking the name of the user's under-construction playlist.

  ///// Returned Component /////
  return (
    <>
      <header className="header">
        <h1 className="centered-text">Ja<span>mmm</span>ing</h1>
      </header>
      <main>
        <SearchBar value={search} onChange={changeHandler} />
        <div id="search-results-and-playlist">
          <SearchResults search={search} tracks={searchResults} />
          <Playlist tracks={searchResults} value={playlistName} playlistHandler={playlistNameHandler} />
        </div>
      </main>
    </>
  )
}

export default App