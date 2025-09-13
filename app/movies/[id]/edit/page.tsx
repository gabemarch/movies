import MovieForm from "@/app/components/MovieForm";

type Movie = {
  _id: string;
  title: string;
  description: string;
  rating: string;
};

async function getMovie(id: string): Promise<Movie> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
}

export default async function EditMoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);

  return (
    <div className="bg-background max-w mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Movie</h1>
      <MovieForm initialData={movie} apiEndpoint="/api/movies" />
    </div>
  );
}
