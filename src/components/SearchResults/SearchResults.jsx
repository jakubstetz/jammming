import Tracklist from "../Tracklist/Tracklist";

function SearchResults({search, tracks}) {
  return (
    <div className="tracks-container">
      <div className="tracks-container-header">
        <p>Current search: <span>{search}</span></p>
      </div>
      <Tracklist tracks={tracks} />
    </div>
  );
}

export default SearchResults;