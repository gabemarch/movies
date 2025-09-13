"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export interface Movie {
  id?: number;
  title: string;
  description: string;
  rating: string;
};

interface MovieProps {
  initialData?: Movie | null;
  apiEndpoint: string;
};

export default function MovieForm({ initialData, apiEndpoint }: MovieProps) {
  const router = useRouter();
  const [form, setForm] = useState<Movie>({
    title: "",
    description: "",
    rating: "0",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const method = initialData ? "PUT" : "POST";
    const url = initialData ? `${apiEndpoint}/${initialData.id}` : apiEndpoint;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.refresh(); // Refresh server component data
    setForm({ title: "", description: "", rating: "0" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded p-4 mb-6"
    >
      <h2 className="text-lg font-semibold mb-4">
        {initialData ? "Edit Movie" : "Add Movie"}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border px-3 py-2 rounded mb-3"
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border px-3 py-2 rounded mb-3"
      />
      <select
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
        className="w-full border px-3 py-2 rounded mb-3"
      >
        <option value="0">0+</option>
        <option value="6">6+</option>
        <option value="12">12+</option>
        <option value="16">16+</option>
        <option value="18">18+</option>
      </select>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {initialData ? "Update" : "Add"}
        </button>
        <Link href="/">
          <button type="button" className="text-secondary px-4 py-2 rounded ">Close</button>
        </Link>
      </div>
    </form>
  );
}
