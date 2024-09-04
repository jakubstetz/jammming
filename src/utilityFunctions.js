export function artistsToString(artistsArray) {
  let artistsAsString = "";
  for (const artist of artistsArray) {
    artistsAsString += artist.name;
    if (artistsArray.length-1 != artistsArray.indexOf(artist)) artistsAsString += ", ";
  }
  return artistsAsString;
}

const generateRandomString = length => { // Generate a string of random characters of a given length. Used for state of Spotify access token request below.
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    return result;
}

/* Interacting With Spotify */

export const spotifyFunctions = {
  getAccessToken() {
    // Developed by referencing Spotify for Developers' "Implicit Grant Flow" article along with Codecademy solution code.

    const clientID = 'c0526ac07c0449679b07db5dfd1b9335';
    const redirect_uri = 'http://localhost:5173';
    const state = generateRandomString(16);
    //localStorage.setItem('stateKey', state);
    const scope = 'playlist-modify-public'; // Scopes determined by referencing Spotify for Developers' "Scopes" article.

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientID);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
  },

  async searchSpotify(accessToken, search, stateSetter) {
    // Developed by referencing Spotify Web API documentation.

    let url = 'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album';

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const responseDecoded = await response.json();
    stateSetter(responseDecoded);
  }
}