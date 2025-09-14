"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Movie } from "./MovieForm";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("Invalid movie ID");
      return;
    }

    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      setIsLoading(id);

      const res = await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete movie");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error deleting movie");
    } finally {
      setIsLoading(null);
    }
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
