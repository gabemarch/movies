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

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);

  return (
    <div className="bg-background max-w mx-auto p-6 min-h-screen">
      <div className="bg-background p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-3">{movie.title}</h1>
        <p className="text-gray-700 mb-4">{movie.description}</p>
        <p className="text-sm text-gray-500">Age Rating: {movie.rating}+</p>
      </div>
    </div>
  );
}
