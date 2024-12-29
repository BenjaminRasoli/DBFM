import React, { useState } from "react";
import "./SignUp.css";
import { auth, db } from "../../config/FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const { login } = useUser();
  const navigate = useNavigate();

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        uid: user.uid,
        date: new Date().toLocaleDateString(),
      });
      login(user);
      navigate("/");
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userName: "",
        uid: user.uid,
        date: new Date().toLocaleDateString(),
      });
    } catch (error) {
      console.error("Error signing up: ", error);
    }
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
