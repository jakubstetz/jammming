import {useState} from 'react';
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {testSongs} from '../../mocks/spotifyMock';

function App() {
  ///// States /////
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(testSongs);
  const [playlistName, setPlaylistName] = useState("");
  const [playlist, setPlaylist] = useState([]);

  ///// Handlers /////
  const changeHandler = ({target: {value}}) => setSearchTerm(value); // Track user input in SearchBar component.

  const searchHandler = () => { // Use user input in SearchBar component to produce Spotify search results.
    setSearch(searchTerm);
  }

  const playlistNameHandler = ({target: {value}}) => setPlaylistName(value); // Tracking the name of the user's under-construction playlist.

  const saveHandler = () => { // Handle saving playlist to user's account.
    setPlaylist([]);
  }

  const addHandler = track => {
    if (!playlist.includes(track)) setPlaylist(prevPlaylist => [...prevPlaylist, track]);
  }

  const removeHandler = track => { // Removing a track from the user's playlist.
    const indexInPlaylist = playlist.indexOf(track);
    setPlaylist(prevPlaylist => prevPlaylist.filter((unusedParameter, i) => i !== indexInPlaylist));
  }

  const clickHandler = e => { // FOR TESTING PURPOSES.
    console.log('test');
  }

  ///// Returned Component /////
  return (
    <>
      <header className="header">
        <h1 className="centered-text">Ja<span>mmm</span>ing</h1>
      </header>
      <main>
        <SearchBar value={searchTerm} changeHandler={changeHandler} searchHandler={searchHandler} />
        <div id="search-results-and-playlist">
          <SearchResults tracks={searchResults} search={search} addHandler={addHandler} />
          <Playlist tracks={playlist} value={playlistName} playlistHandler={playlistNameHandler} saveHandler={saveHandler} removeHandler={removeHandler} />
        </div>
      </main>
      {/*** TESTING ***/}
      <button className="test-button" onClick={clickHandler} >TEST</button> {/* FOR TESTING PURPOSES */}
      {/*** TESTING ***/}
    </>
  )
}

export default App