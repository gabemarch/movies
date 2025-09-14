import Link from "next/link";
import { Clapperboard, Edit, Trash2 } from "lucide-react";
import Spinner from "./Spinner";
import { Movie } from "./MovieForm";

interface MovieCardProps {
  movie: Movie;
  isLoading: string | null;
  handleDelete: (id: string) => void;
}

export default function MovieCard({ movie, isLoading, handleDelete }: MovieCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Placeholder image */}
      <div className="flex items-center justify-center bg-muted h-40">
        <Clapperboard className="w-16 h-16 text-muted-foreground" />
      </div>

      {/* Movie content */}
      <div className="flex-1 p-4 flex flex-col">
        <Link
          href={`/movies/${movie.id}`}
          className="text-lg font-semibold hover:underline mb-2"
        >
          {movie.title}
        </Link>
        <p className="text-sm text-muted-foreground mb-4">
          {movie.description}
        </p>
        <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold w-max">
          Age Rating: {movie.rating}+
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-t border-border">
        <Link
          href={`/movies/${movie.id}/edit`}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Link>
        <button
          onClick={() => movie.id && handleDelete(String(movie.id))}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm cursor-pointer"
        >
          {isLoading === String(movie.id) ? <Spinner /> : (
            <>
              <Trash2 className="w-4 h-4" /> Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
}
