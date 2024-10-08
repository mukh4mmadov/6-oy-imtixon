import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const formRef = useRef();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    if (!validateEmail(emailRef.current.value)) {
      alert("Email xato kiritilgan!");
      return false;
    }

    const password = passwordRef.current.value;
    if (password.length < 4) {
      alert("Parol kamida 4 ta belgidan iborat bo'lishi kerak!");
      return false;
    }

    if (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(password)) {
      alert("Parolda harf va son mavjud bo'lishi kerak!");
      return false;
    }

    return true;
  }

  function handleLogin(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);

    axios
      .post("https://fn27.vimlc.uz/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.message === "Email yoki parol noto'g'ri") {
          alert(data.message);
        } else if (data.user.id) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.user));
          formRef.current.reset();
          navigate("/");
        }
      })
      .catch((error) => {
        alert("Username yoki parol xato");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form ref={formRef} onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              UserName:
            </label>
            <input
              ref={emailRef}
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="UserName kiriting (email)"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Parol:</label>
            <div className="relative">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Parolni kiriting"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                <span className="text-lg">
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            {loading ? "LOADING" : "LOGIN"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Akaunt mavjud emasmi ?
            <Link
              to="/register"
              className="text-indigo-500 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
