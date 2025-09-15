import MovieForm, { Movie } from "@/app/components/MovieForm";

// fetch movie server-side
async function getMovie(id: string): Promise<Movie> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
}

interface EditMoviePageProps {
  params: { id: string };
}

// Single movie edit page
export default async function EditMoviePage({ params }: EditMoviePageProps) {
  const { id } = await params;
  // Server-side fetch
  const movie = await getMovie(id);

  return (
    <div className="bg-background max-w mx-auto p-6 min-h-screen">
      <MovieForm initialData={movie} apiEndpoint={`/api/movies`} />
    </div>
  );
}