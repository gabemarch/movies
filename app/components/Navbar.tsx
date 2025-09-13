"use client"
import { Plus, Film } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import MovieForm from "./MovieForm";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="bg-card">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Link href="/">
                  <Film className="h-6 w-6 text-primary-foreground" />
                </Link>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">CineBase</h1>
                <p className="text-sm text-muted-foreground">The Movie Registry Database</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(true)} className="gap-2 bg-cinema-gold text-secondary font-bold rounded-2xl cursor-pointer flex py-3 px-3 items-center" >
              <Plus className="h-4 w-4" />
              Add new movie
            </button>
          </div>
        </div>
      </nav>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <h2 className="text-lg font-bold mb-4">Add New Movie</h2>
            <MovieForm apiEndpoint="/api/movies" />
          </Modal>
    </div>
  )
}