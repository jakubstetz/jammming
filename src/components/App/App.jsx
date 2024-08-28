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
  const [playlist, setPlaylist] = useState([]);

  ///// Handlers /////
  const changeHandler = ({target: {value}}) => setSearch(value); // Track user input in SearchBar component.

  const playlistNameHandler = ({target: {value}}) => setPlaylistName(value); // Tracking the name of the user's under-construction playlist.

  const saveHandler = () => { // Handle saving playlist to user's account.
    setPlaylist([]);
  }

  ///// Returned Component /////
  return (
    <>
      <header className="header">
        <h1 className="centered-text">Ja<span>mmm</span>ing</h1>
      </header>
      <main>
        <SearchBar value={search} onChange={changeHandler} />
        <div id="search-results-and-playlist">
          <SearchResults tracks={searchResults} search={search} />
          <Playlist tracks={playlist} value={playlistName} playlistHandler={playlistNameHandler} saveHandler={saveHandler} />
        </div>
      </main>
    </>
  )
}

export default App