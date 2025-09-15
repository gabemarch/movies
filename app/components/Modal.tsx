"use client";
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose} // close when clicking outside of the Modal
    >
      <div
        className="relative bg-background w-full bg-card p-6 rounded-2xl shadow-lg max-w-md mx-auto mb-6 border border-border"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        {/* Modal content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
