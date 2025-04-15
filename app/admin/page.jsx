"use client";

import { useState } from "react";

export default function AdminPanel() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [stockCount, setStockCount] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !price || !imageUrl || !description || !author || !category || !stockCount) {
      setError("All fields are required!");
      return;
    }
  
    const newBook = { 
      name, 
      price, 
      imageUrl, 
      description, 
      author, 
      category, 
      stockCount 
    };
  
    console.log("Submitting book data:", newBook);
  
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log("Book added:", data);
        setBooks([...books, data.data]); 
        setName("");
        setPrice("");
        setImageUrl("");
        setDescription("");
        setAuthor("");
        setCategory("");
        setStockCount("");
        setError(null); 
      } else {
        const errorData = await res.json();  
        setError("Failed to add the book: " + errorData.message);
        console.error("Error adding book:", errorData);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      setError("Error adding book: " + error.message);
    }
  };
  
  
  

  const loadBooks = async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBooks(books.filter((book) => book._id !== id));
      } else {
        setError("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Error deleting book");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Book Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Stock Count"
            value={stockCount}
            onChange={(e) => setStockCount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Book
          </button>
        </div>
      </form>

      <div>
        <button
          onClick={loadBooks}
          className="mb-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Load Books
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book._id} className="border p-4 rounded shadow-md">
              <img
                src={book.imageUrl}
                alt={book.name}
                className="w-full h-64 object-contain mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{book.name}</h2>
              <p className="text-gray-600">{book.price}$</p>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Category: {book.category}</p>
              <button
                onClick={() => handleDelete(book._id)}
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
