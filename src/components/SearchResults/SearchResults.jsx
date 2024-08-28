import Tracklist from "../Tracklist/Tracklist";

function SearchResults({tracks, search, addHandler}) {
  return (
    <div className="tracks-container">
      <div className="tracks-container-header">
        <p>Current search: <span>{search}</span></p>
      </div>
      <Tracklist tracks={tracks} clickHandler={addHandler} inPlaylist={false} />
    </div>
  );
}

export default SearchResults;