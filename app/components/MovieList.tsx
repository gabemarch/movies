"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Movie } from "./MovieForm";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      setLoadingId(id);
      const res = await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete movie");
      router.refresh(); // Refresh the list
    } catch (error) {
      console.error(error);
      alert("Error deleting movie");
    } finally {
      setLoadingId(null);
    }
  };


  return (
    <div className="space-y-4">
      {movies.map((movie) => (

        <div
          key={movie.id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <Link
              href={`/movies/${movie.id}`}
              className="text-lg font-bold text-blue-600 hover:underline"
            >
              {movie.title}
            </Link>
            <p className="text-gray-600">{movie.description}</p>
            <p className="text-sm text-gray-500">Age Rating: {movie.rating}+</p>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/movies/${movie.id}/edit`}
              className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(movie.id!)}
              disabled={loadingId === movie.id}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm disabled:opacity-50 cursor-pointer"
            >
              {loadingId === movie.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

      ))}
    </div>
  );
}
