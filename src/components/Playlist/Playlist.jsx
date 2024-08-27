import Tracklist from "../Tracklist/Tracklist";

function Playlist({tracks}) {
  return (
    <div className="tracks-container">
      <div className="tracks-container-header">
        <p className="centered-text" >Playlist Name</p>
        <input type="text" className="centered-text"></input>
      </div>
      <Tracklist tracks={tracks} />
      <div id="save-to-spotify">
        <button>Save to Spotify</button>
      </div>
    </div>
  );
}

export default Playlist;