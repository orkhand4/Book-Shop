"use client"; 

import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await res.json();
        
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
                className="w-full h-64 object-contain mb-4 rounded"
              />
              <h2 className="text-xl text-center mb-4 font-semibold">{book.name}</h2>
              <p className="text-gray-600"><span className="text-black font-semibold">Author: </span>{book.author}</p>
              <p className="text-gray-800 mt-2"> <span className="font-semibold">Description: </span>{book.description}</p>
              <p className="text-lg font-bold mt-4">{`$${book.price}`}</p>
              <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No books available.</p> 
        )}
      </div>
    </div>
  );
}
