import MovieFilter from "./components/MovieFilter";
import { Movie } from "./components/MovieForm";

// Fetch all movies from db
async function getMovies(): Promise<Movie[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-white text-3xl font-bold p-3 px-6">Movies ({movies.length})</h1>
      <div className="max-w-7xl mx-auto">
        <MovieFilter movies={movies} />
      </div>
    </div>
  );
}
