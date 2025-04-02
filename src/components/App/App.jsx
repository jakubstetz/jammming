import {useState, useEffect} from 'react';
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {testSongs} from '../../mocks/spotifyMock';
import { spotifyFunctions, pruneTrackSearchResults } from '../../utilityFunctions';
import LoginPage from '../LoginPage/LoginPage';
import LoginIndicator from '../LoginIndicator/LoginIndicator';

function App() {
  ///// States /////
  const [searchBarInput, setSearchBarInput] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState({});
  const [resultsLimit, setResultsLimit] = useState(5); // Default limit for search results. TODO: MAKE ADJUSTABLE IN UI
  const [test, setTest] = useState(''); // FOR TESTING PURPOSES.

  ///// Effects /////
  useEffect(() => {
    // Developed by referencing Spotify for Developers' "Implicit Grant Flow" article and Codecademy solution code.
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/); // Understanding for how exactly this works (along with urlAccessToken[1]) was developed with the help of ChatGPT.
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      setAccessToken(urlAccessToken[1]);
      window.history.replaceState({}, null, '/');
      const expiresIn = Number(urlExpiresIn[1]);
      setTimeout(() => spotifyFunctions.getAccessToken(), expiresIn*1000); // Get new access token upon expiry.
    }
  }, [])

  useEffect(() => {
    if (accessToken) {
      const retrieveUser = async () => setUser(await spotifyFunctions.getUserInfo(accessToken)); // Asynchronous retrieval of user information from Spotify.
      retrieveUser();
    }
  }, [accessToken])

  ///// Handlers /////
  const changeHandler = ({target: {value}}) => setSearchBarInput(value); // Track user input in SearchBar component.

  const searchHandler = async (e) => { // Use user input in SearchBar component to produce Spotify search results.
    e.preventDefault(); // Prevent browser from reloading on search submission
    setSearch(searchBarInput);
    const results = await spotifyFunctions.searchSpotify(accessToken, searchBarInput, resultsLimit);
    setSearchResults(pruneTrackSearchResults(results));
  }

  const loginHandler = () => spotifyFunctions.getAccessToken(); // Authenticating user.

  const playlistNameHandler = ({target: {value}}) => setPlaylistName(value); // Tracking the name of the user's under-construction playlist.

  const saveHandler = () => { // Handle saving playlist to user's account.
    spotifyFunctions.addPlaylist(accessToken, user, playlist, playlistName);
    setPlaylist([]);
    setPlaylistName('');
  }

  const addHandler = track => {
    if (!playlist.includes(track)) setPlaylist(prevPlaylist => [...prevPlaylist, track]);
  }

  const removeHandler = track => { // Removing a track from the user's playlist.
    const indexInPlaylist = playlist.indexOf(track);
    setPlaylist(prevPlaylist => prevPlaylist.filter((unusedParameter, i) => i !== indexInPlaylist));
  }

  const clickHandler = async (e) => { // FOR TESTING PURPOSES.
    console.log('TEST');
    console.log(user);
  }

  ///// Returned Component /////
  if (!accessToken) return <LoginPage loginHandler={loginHandler} /> // If user is not logged in to Spotify.
  return ( // If user is logged in to Spotify.
    <>
      <header>
        <h1 className="centered-text">Ja<span>mmm</span>ing</h1>
      </header>
      <main>
        <LoginIndicator userInfo={user} />
        <div id="searchbar">
          <SearchBar value={searchBarInput} changeHandler={changeHandler} searchHandler={searchHandler} />
        </div>
        <div id="search-results-and-playlist" className="flex-center">
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