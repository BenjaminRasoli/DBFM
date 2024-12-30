import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../config/FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { toast } from "react-toastify";

function Login() {
  const { login } = useUser();
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
      console.log(user);
      login(user);
      navigate("/");
      setFormData({
        email: "",
        password: "",
      });
      toast.success("Login successful.");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
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
  );
}

export default Login;
