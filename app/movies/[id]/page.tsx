import { Movie } from "@/app/components/MovieForm";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

async function getMovie(id: string): Promise<Movie> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
}

// Single movie detail page
export default async function MovieDetailPage(context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;
  const movie = await getMovie(id);

  return (
    <div className="bg-background min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          <div className="flex items-center justify-center bg-muted h-40">
            <Clapperboard className="w-16 h-16 text-muted-foreground" />
          </div>
          <div className="flex-1 p-4 flex flex-col">
            <p className="text-lg font-semibold hover:underline mb-2">
              {movie.title}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {movie.description}
            </p>
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold w-max">
              Age Rating: {movie.rating}+
            </span>
          </div>
          <Link href="/" className="bg-cinema-gold text-secondary font-semibold p-3 m-3 rounded-2xl hover:bg-cinema-gold-dim text-center cursor-pointer">
            <button
              type="button"
            >
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
