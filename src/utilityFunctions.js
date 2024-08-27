export function artistsToString(artistsArray) {
  let artistsAsString = "";
  for (const artist of artistsArray) {
    artistsAsString += artist.name;
    if (artistsArray.length-1 != artistsArray.indexOf(artist)) artistsAsString += ", ";
  }
  return artistsAsString;
}