import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Detalis() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    axios
      .get(`https://fn27.vimlc.uz/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Kitobning Batafsil Ma'lumotlari
      </h1>
      <div className="flex items-center justify-center gap-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="w-48 h-64">
          <img
            src={book.thumbnailUrl}
            alt={book.title}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex flex-col justify-between h-full max-w-lg">
          <h3 className="text-2xl font-bold mb-2">Title: {book.title}</h3>
          <h3 className="text-lg mb-2">
            <strong>Status:</strong>
            <span className="font-semibold">{book.status}</span>
          </h3>
          <p className="mb-1">
            <strong>Authors:</strong> {book.authors.join(", ")}
          </p>
          <p className="mb-1">
            <strong>Categories:</strong> {book.categories.join(", ")}
          </p>
          <p className="mb-1">
            <strong>Sahifalar soni:</strong> {book.pageCount}
          </p>
          <p className="mb-1">
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p className="mb-4">
            <strong>Qisqa izoh:</strong> {book.shortDescription}
          </p>
          {showFullDescription && (
            <p className="mb-4">
              <strong>Uzun izoh:</strong> {book.longDescription}
            </p>
          )}
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full self-start"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Kamaytirish" : "Yana"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-all"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default Detalis;
