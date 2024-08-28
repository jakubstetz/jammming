import Tracklist from "../Tracklist/Tracklist";

function Playlist({tracks, value, playlistHandler, saveHandler, removeHandler}) {
  return (
    <div className="tracks-container">
      <div className="tracks-container-header">
        <p className="centered-text" >Playlist Name</p>
        <input type="text" className="centered-text" value={value} onChange={playlistHandler} ></input>
      </div>
      <Tracklist tracks={tracks} clickHandler={removeHandler} inPlaylist={true} />
      <div id="save-to-spotify">
        <button onClick={saveHandler}>Save to Spotify</button>
      </div>
    </div>
  );
}

export default Playlist;