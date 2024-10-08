import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const formRef = useRef();

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    if (
      firstNameRef.current.value.length < 3 ||
      lastNameRef.current.value.length < 3
    ) {
      alert("Ism yoki Familiya joylari bosh yoki 3 ta belgidan kam!");
      return false;
    }

    if (!ageRef.current.value) {
      alert("Yoshni kiritish majburiy!");
      return false;
    }

    if (!validateEmail(emailRef.current.value)) {
      alert("Email xato kiritilgan!");
      return false;
    }

    if (passwordRef.current.value.length < 4) {
      alert("Parol kamida 4 ta belgidan iborat bo'lishi kerak!");
      return false;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Parollar birxil emas!");
      return false;
    }

    return true;
  }

  function handleRegister(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      age: ageRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    setLoading(true);

    axios
      .post("https://fn27.vimlc.uz/register", user, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        alert("Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi");
        formRef.current.reset();
        navigate("/login");
      })
      .catch((err) => {
        if (err.response && err.response.data.errors) {
          alert(err.response.data.errors[0]);
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Ro'yxatdan o'tish
        </h2>
        <form ref={formRef}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Ism:</label>
            <input
              ref={firstNameRef}
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Ismingizni kiriting"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Familiya:
            </label>
            <input
              ref={lastNameRef}
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Familiyangizni kiriting"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Yosh:</label>
            <input
              ref={ageRef}
              type="number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Yoshingizni kiriting"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              ref={emailRef}
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Emailingizni kiriting"
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

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Parolni qayta kiriting:
            </label>
            <div className="relative">
              <input
                ref={confirmPasswordRef}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Parolni qayta kiriting"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                <span className="text-lg">
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            onClick={handleRegister}
            className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            {loading ? "LOADING" : "REGISTER"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Allaqachon akkauntingiz bormi?
            <Link
              to="/login"
              className="text-indigo-500 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
