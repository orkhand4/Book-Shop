"use client"; // Müştəri tərəfində işləməsi üçün

import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);

  // Kitabları çəkmək üçün useEffect
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books"); // Düzgün API endpoint-i istifadə edirik
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await res.json();
        
        // Məlumatın düzgün formatda olub-olmaması yoxlanır
        if (Array.isArray(data.data)) {
          setBooks(data.data);
        } else {
          console.error("Invalid data format", data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Book Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="border p-4 rounded shadow-md">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-gray-800 mt-2">{book.description}</p>
              <p className="text-lg font-bold mt-4">{`$${book.price}`}</p>
              <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No books available.</p> // Əgər kitablar yoxdursa, istifadəçiyə məlumat veririk
        )}
      </div>
    </div>
  );
}
