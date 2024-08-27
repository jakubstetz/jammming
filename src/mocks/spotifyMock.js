// Object factories are based on the GET response object from Spotify web API documentation.

const imageFactory = (url, height, width) => {
  return {
    url,
    height,
    width
  };
};

const artistFactory = (names) => {
  const artistsArray = [];
  for (const name of names) artistsArray.push({name});
  return artistsArray;
};

const songFactory = (album_name, release_date, images, artists, name) => {
  return {
    album: {
      images,
      name: album_name,
      release_date,
      artists
    },
    name
  };
};

export const testSongs = [
  songFactory('Imagine Christmas', '2017', [imageFactory('',300,300)], artistFactory(['Howard Blake','Ronn McFarlane']),'Walking in the Air (From \"The Snowman\") [Arr. R. McFarlane]'),
  songFactory('Sonata De Grillo', '2014', [imageFactory('',300,300)], artistFactory(['Richard Houghten']),'Saving A Life'),
  songFactory('Parsley, Sage, Rosemary And Thyme', '1966', [imageFactory('',300,300)], artistFactory(['Simon & Garfunkel']),'Scarborough Fair / Canticle'),
  songFactory('Let It Snow', '2012', [imageFactory('',300,300)], artistFactory(['Albrecht Mayer', 'The King\'s Singers']),'The Wild Wood Carol'),
];