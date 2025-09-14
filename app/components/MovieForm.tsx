"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Spinner from "./Spinner"
import Link from "next/link";

export interface Movie {
  id?: string | number;
  title: string
  description: string
  rating: string
};

interface MovieProps {
  initialData?: Movie | null
  apiEndpoint: string
};

export default function MovieForm({ initialData, apiEndpoint }: MovieProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<Movie>({
    title: "",
    description: "",
    rating: "0",
  })

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!form.title.trim() || !form.description.trim()) {
      alert("Please fill in all fields")
      return;
    }

    const method = initialData ? "PUT" : "POST"
    const url = initialData ? `${apiEndpoint}/${initialData.id}` : apiEndpoint

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    router.refresh() // Refresh server component data
    setForm({ title: "", description: "", rating: "0" })
    setIsLoading(false)
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className=""
        >
          <h2 className="text-2xl text-cinema-gold font-bold mb-6 text-center">
            {initialData ? "Edit Movie" : "Add Movie"}
          </h2>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-foreground">
              Title
            </label>
            <input
              type="text"
              placeholder="Movie title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cinema-gold"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-foreground">
              Description
            </label>
            <textarea
              placeholder="Movie description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cinema-gold resize-none h-24"
              required
            />
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-foreground">
              Age Rating
            </label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cinema-gold"
              required
            >
              <option value="0">0+</option>
              <option value="6">6+</option>
              <option value="12">12+</option>
              <option value="16">16+</option>
              <option value="18">18+</option>
            </select>
          </div>

          {/* Submit button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-cinema-gold text-secondary font-semibold px-6 py-2 rounded-2xl hover:bg-cinema-gold-dim cursor-pointer"
            >
              {initialData ? "Update Movie" : "Add Movie"}
            </button>
            {initialData ?
              <Link href="/">
                <button type="button" className="text-white cursor-pointer">Close</button>
              </Link> : null}
          </div>
        </form>
      )}
    </>
  );
}
