import React, { useState } from "react";
import "./SignUp.css";
import { auth } from "../../config/FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserProvider";

function SignUp() {
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
    uid: "",
    date: new Date().toLocaleDateString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        login(user);
        setFormData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          userName: "",
          uid: user.uid,
          date: new Date().toLocaleDateString(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signUpContainer">
      <h1>Login</h1>
      <form onSubmit={handleSignUp} className="signUpForm">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="User Name"
        />
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
        <button type="submit">Signup</button>
      </form>
      <div>
        Already have an account <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
