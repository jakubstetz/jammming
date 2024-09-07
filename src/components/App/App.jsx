import {useState, useEffect} from 'react';
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {testSongs} from '../../mocks/spotifyMock';
import { spotifyFunctions, pruneTrackSearchResults } from '../../utilityFunctions';

function App() {
  ///// States /////
  const [searchBarInput, setSearchBarInput] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [test, setTest] = useState(''); // FOR TESTING PURPOSES.

  ///// Effects /////
  useEffect(() => {
    // Developed by referencing Spotify for Developers' "Implicit Grant Flow" article along with Codecademy solution code.
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/); // Understanding for how exactly this works (along with urlAccessToken[1]) was developed with the help of ChatGPT.
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      setAccessToken(urlAccessToken[1]);
      const expiresIn = Number(urlExpiresIn[1]);
      // window.history.replaceState({}, null, '/'); Not yet implemented. This code with replace the current url, thus removing access token information.
      setTimeout(() => spotifyFunctions.getAccessToken(), expiresIn*1000); // Get new access token upon expiry.
    } else spotifyFunctions.getAccessToken();
  }, [])

  ///// Handlers /////
  const changeHandler = ({target: {value}}) => setSearchBarInput(value); // Track user input in SearchBar component.

  const searchHandler = async () => { // Use user input in SearchBar component to produce Spotify search results.
    setSearch(searchBarInput);
    const results = await spotifyFunctions.searchSpotify(accessToken, searchBarInput);
    setSearchResults(pruneTrackSearchResults(results));
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
    console.log(test);
  }

  ///// Returned Component /////
  return (
    <>
      <header className="header">
        <h1 className="centered-text">Ja<span>mmm</span>ing</h1>
      </header>
      <main>
        <SearchBar value={searchBarInput} changeHandler={changeHandler} searchHandler={searchHandler} />
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