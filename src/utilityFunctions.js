export function artistsToString(artistsArray) {
  let artistsAsString = "";
  for (const artist of artistsArray) {
    artistsAsString += artist.name;
    if (artistsArray.length-1 != artistsArray.indexOf(artist)) artistsAsString += ", ";
  }
  return artistsAsString;
}

export function pruneTrackSearchResults({tracks: {items}}) { // Remove unnecessary information retrieved from Spotify API on search. Developed using Spotify API documentation, matching what the track-rendering and track-organizing functions in this project expect as inputs.
  return items.map(({album, name, uri}) => {
    const {images, artists} = album;
    const release_date = album.release_date.match(/^\d{4}/);
    return {
      album: {
        images,
        name: album.name,
        release_date,
        artists
      },
      name,
      uri
    };
  });
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
    const redirect_uri = window.location.href.match(/^(http)[s]?[:][/]{2}[^/]*/)[0]; // Create appropriate redirect uri using current url.
    const state = generateRandomString(16);
    //localStorage.setItem('stateKey', state);
    const scope = 'playlist-modify-private'; // Scopes determined by referencing Spotify for Developers' "Scopes" article.

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientID);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
  },

  async getUserInfo(accessToken) {
    // Developed by referencing Spotify Web API documentation and Fetch API MDN documentation.
    const url = 'https://api.spotify.com/v1/me';

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const json = await response.json();
    return json;
  },

  async searchSpotify(accessToken, search, resultsLimit = 5) {
    // Developed by referencing Spotify Web API documentation and Fetch API MDN documentation.

    const url = `https://api.spotify.com/v1/search?q=${search}&type=track&limit=${resultsLimit}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const json = await response.json();
    return json;
  },

  async addPlaylist(accessToken, user, tracks, playlistName) {
    // Developed by referencing Spotify Web API documentation and Fetch API MDN documentation.

    // Creating a new playlist.
    let url = `https://api.spotify.com/v1/users/${user.id}/playlists`;

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        description: 'A playlist created using the Jammming application.',
        public: false
      })
    })
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const newPlaylistJson = await response.json();

    // Adding tracks to playlist.
    url = `https://api.spotify.com/v1/playlists/${newPlaylistJson.id}/tracks`;
    console.log(tracks);
    const trackUris = tracks.map(({uri}) => uri);
    console.log(trackUris);

    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        uris: trackUris
      })
    })
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
  }
}