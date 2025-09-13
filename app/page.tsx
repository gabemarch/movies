import MovieList from "./components/MovieList";

interface Movie {
  _id: string;
  title: string;
  description: string;
  rating: string;
};

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
      <div className="max-w-4xl mx-auto">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}
