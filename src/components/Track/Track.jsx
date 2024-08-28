import { artistsToString } from "../../utilityFunctions";

function Track({track, clickHandler}) {
  return (
    <div className="track">
      <img />
      <div className="track-info-text">
        <h3>{track.name}</h3>
        <h4>{artistsToString(track.album.artists)}</h4>
        <h4>{`${track.album.name}, ${track.album.release_date}`}</h4>
      </div>
      <button onClick={() => clickHandler(track)} >
        +
      </button>
    </div>
  );
}

export default Track;