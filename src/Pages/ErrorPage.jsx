import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-red-600">404</h1>
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">
        Sahifa Topilmadi
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Uzr, siz izlayotgan sahifa mavjud emas.
      </p>
      <Link
        to="/"
        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}

export default ErrorPage;
