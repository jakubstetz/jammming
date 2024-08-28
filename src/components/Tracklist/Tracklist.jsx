import Track from "../Track/Track";

function Tracklist({tracks, clickHandler}) {
  return (
    <div className="tracklist">
      {tracks.map((track, index) => <Track track={track} key={index.toString()} clickHandler={clickHandler} />) /* LESSON LEARNED: Originally I attempted to implement this using .forEach(), and it wasn't working. After doing some research, it turns out that this functionality can indeed be implemented with .forEach(), but this needs to be organized differently. .map() returns an array of items manipulated according to the provided callback function, whereas .forEach() executes a certain function for each array item, defined by the callback function. To implement this functionality with .forEach() would require something like tracksArray.forEach(track => tracksArray.push(<Track trackObject={track} />) */}
    </div>
  );
}

export default Tracklist;