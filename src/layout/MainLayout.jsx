import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function handleChiqish(event) {
    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div>
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-white text-indigo-600 flex items-center justify-center rounded-full">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 20l9-5-9-5-9 5 9 5z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 12l9-5-9-5-9 5 9 5z"
                ></path>
              </svg>
            </div>

            <h1 className="text-2xl font-bold tracking-wider">BookWebsite</h1>
          </div>

          <nav>
            <button
              onClick={handleChiqish}
              className="flex items-center bg-white text-indigo-600 px-4 py-2 rounded-lg shadow hover:bg-indigo-600 hover:text-white transition duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H3"
                ></path>
              </svg>
              <span className="font-semibold">Chiqish</span>
            </button>
          </nav>
        </div>
      </header>
      <main>{children}</main>

      <footer className="bg-gray-800 text-white py-4 mt-6">
        <div className="container mx-auto px-6 text-center">
          <p>BookWebsite Hozirgi vaqt: {currentTime.toLocaleTimeString()}</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
