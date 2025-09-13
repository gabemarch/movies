"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Movie = {
  _id: string;
  title: string;
  description: string;
  rating: string;
};

export default function MovieList({ movies }: { movies: Movie[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      setLoadingId(id);
      const res = await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete movie");
      router.refresh(); // Refresh data without a full page reload
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
          key={movie._id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <Link
              href={`/movies/${movie._id}`}
              className="text-lg font-bold text-blue-600 hover:underline"
            >
              {movie.title}
            </Link>
            <p className="text-gray-600">{movie.description}</p>
            <p className="text-sm text-gray-500">Age Rating: {movie.rating}+</p>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/movies/${movie._id}/edit`}
              className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(movie._id)}
              disabled={loadingId === movie._id}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm disabled:opacity-50 cursor-pointer"
            >
              {loadingId === movie._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
