import React, { useState } from "react";
import "./Login.css";
import { auth, db } from "../../config/FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const { login, user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        const completeUserData = {
          uid: user.uid,
          email: user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          userName: userData.userName,
        };

        login(completeUserData);
        navigate("/");
        setFormData({
          email: "",
          password: "",
        });
        toast.success("Login successful.");
      } else {
        toast.error("User data not found.");
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      {!user ? (
        <div className="loginContainer">
          <h1>Login</h1>
          <form onSubmit={handleLogin} className="loginForm">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button className="loginButton" type="submit">
              Login
            </button>
          </form>
          <div>
            Dont have an account
            <Link to="/signup">
              <span className="signupLink"> Sign up</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="alreadyLoggedIn">
            <h2>You are already logged in</h2>
            <Link to="/">Go back to Home</Link>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
