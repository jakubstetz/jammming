import Tracklist from "../Tracklist/Tracklist";

function Playlist({tracks, value, playlistHandler}) {
  return (
    <div className="tracks-container">
      <div className="tracks-container-header">
        <p className="centered-text" >Playlist Name</p>
        <input type="text" className="centered-text" value={value} onChange={playlistHandler}></input>
      </div>
      <Tracklist tracks={tracks} />
      <div id="save-to-spotify">
        <button>Save to Spotify</button>
      </div>
    </div>
  );
}

export default Playlist;