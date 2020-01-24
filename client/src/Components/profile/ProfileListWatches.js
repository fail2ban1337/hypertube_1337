import React from "react";

import TabsProfile from "./Tabs";
import { Thumb } from "../pages/Library";

const data = [
  {
    imdb_code: 1,
    Poster:
      "https://img.moviepostershop.com/fantastic-beasts-the-crimes-of-grindelwald-movie-poster-2018-1010778620.jpg",
    title: "Crimes of The Grindlwald",
    year: "2005",
    rating: 7
  },
  {
    imdb_code: 2,
    Poster:
      "http://www.comicgeekos.com/blog/wp-content/uploads/2019/10/CG738-1024x1024.jpg",
    title: "Joker",
    year: "2005",
    rating: 7
  },
  {
    imdb_code: 3,
    Poster:
      "https://www.vintagemovieposters.co.uk/wp-content/uploads/2016/03/IMG_1143.jpg",
    title: "Blade",
    year: "2005",
    rating: 7
  }
];

export const ProfileListWatches = () => {
  return (
    <div>
      <TabsProfile>
        <Thumb movies={data} />
      </TabsProfile>
    </div>
  );
};
