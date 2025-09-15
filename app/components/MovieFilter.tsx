"use client";

import { useState } from "react";
import MovieList from "./MovieList";
import { Movie } from "./MovieForm";

interface Props {
  movies: Movie[];
}

//Filtered movie list
export default function MovieFilter({ movies }: Props) {
  const [filter, setFilter] = useState<string>("All");

  const filteredMovies =
    filter === "All"
      ? movies
      : movies.filter((movie) => movie.rating === filter);

  const ageOptions = ["All", "0", "6", "12", "16", "18"];

  return (
    <div className="p-6">
      {/* Filter dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded bg-white"
        >
          {ageOptions.map((age) => (
            <option key={age} value={age}>
              {age === "All" ? "All ratings" : `${age}+`}
            </option>
          ))}
        </select>
      </div>
      {/* Movie list */}
      <MovieList movies={filteredMovies} />
    </div>
  );
}
