import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPages, setMinPages] = useState("");
  const [maxPages, setMaxPages] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    const url = `https://fn27.vimlc.uz/books/filter?minPages=${minPages}&maxPages=${maxPages}`;
    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleFilter = () => {
    fetchBooks();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Qidiruv...(ishlamaydi)"
          className="border rounded-lg px-3 py-2 flex-grow mr-2"
        />
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Min sahifalar"
            className="border rounded-lg px-3 py-2 mr-2"
            value={minPages}
            onChange={(e) => setMinPages(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max sahifalar"
            className="border rounded-lg px-3 py-2 mr-2"
            value={maxPages}
            onChange={(e) => setMaxPages(e.target.value)}
          />
          <button
            onClick={handleFilter}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition duration-300"
          >
            Filtr
          </button>
        </div>
      </div>

      <div className="mb-4">
        <strong> Kitoblar soni: {books.length}</strong>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {books.length > 0 &&
          books.map((book) => {
            return (
              <Link key={book.id} to={`/books/${book.id}`}>
                <div className="border p-4 rounded-lg shadow cursor-pointer hover:shadow-lg">
                  <img
                    src={book.thumbnailUrl}
                    alt=""
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h3 className="text-lg font-bold mb-2">
                    Title: {book.title}
                  </h3>
                  <p className="mb-1">
                    <strong>Authors:</strong> {book.authors.join(", ")}
                  </p>
                  <p className="mb-1">
                    <strong>Categories:</strong> {book.categories.join(", ")}
                  </p>
                  <p>
                    <strong>Sahifalar soni:</strong> {book.pageCount}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
