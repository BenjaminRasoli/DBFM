import React, { useState } from "react";
import "./SignUp.css";
import { auth, db } from "../../config/FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const { login, user } = useUser();
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

  const validateInput = () => {
    if (formData.firstName.trim() === "") {
      toast.error("First name cannot be empty.");
      return false;
    }
    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      toast.error("First name should contain only letters.");
      return false;
    }
    if (formData.lastName.trim() === "") {
      toast.error("Last name cannot be empty.");
      return false;
    }
    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      toast.error("Last name should contain only letters.");
      return false;
    }
    if (formData.userName.trim() === "") {
      toast.error("User name cannot be empty.");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        uid: user.uid,
        date: new Date().toLocaleDateString(),
      };

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, userData);

      const completeUserData = {
        uid: user.uid,
        email: user.email,
        password: user.password,
        ...userData,
      };
      login(completeUserData);
      navigate("/");
      toast.success("Signup successful.");
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
      toast.error(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      {!user ? (
        <div className="signUpContainer">
          <h1>Sign Up</h1>
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
            <button className="signUpButton" type="submit">
              Signup
            </button>
          </form>
          <div>
            Already have an account
            <Link to="/login">
              <span className="loginLinkSpan">Login</span>
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

export default SignUp;
