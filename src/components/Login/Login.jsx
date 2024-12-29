import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../config/FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserProvider";

function Login() {
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    password: "123456",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        login(user);
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="loginForm">
        <input
          type="email"
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
        <button type="submit">Login</button>
      </form>
      <div>
        Dont have an account <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
