import React, { useState } from "react";

function RealTimeFeedbackForm() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDetails({ ...details, [id]: value });


    if (id === "name") {
      setErrorMessage({
        ...errorMessage,
        name: value.trim() === "" ? "Name is required" : "",
      });
    }

    if (id === "email") {
      setErrorMessage({
        ...errorMessage,
        email: emailRegex.test(value) ? "" : "Invalid email format",
      });
    }

    if (id === "password") {
      setErrorMessage({
        ...errorMessage,
        password:
          value.length < 6
            ? "Password must be at least 6 characters"
            : !passwordRegex.test(value)
            ? "Must include uppercase, lowercase, number & special char"
            : "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      details.name.trim() === "" ||
      !emailRegex.test(details.email) ||
      details.password.length < 6
    ) {
      alert("Please fix validation errors before submitting!");
      return;
    }

    console.log("Form Submitted Successfully ✅", details);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen bg-gray-900 w-screen flex justify-center items-center text-white flex-col gap-3.5"
    >

      <div className="mb-5 flex flex-col">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Your Name"
          className="border-2 border-gray-500 text-white px-2"
          value={details.name}
          onChange={handleChange}
        />
        {errorMessage.name && (
          <p className="error-message text-red-500 text-sm">{errorMessage.name}</p>
        )}
      </div>


      <div className="mb-5 flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email"
          className="border-2 border-gray-500 text-white px-2"
          value={details.email}
          onChange={handleChange}
        />
        {errorMessage.email && (
          <p className="error-message text-red-500 text-sm">{errorMessage.email}</p>
        )}
      </div>

      <div className="mb-5 flex flex-col">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter Your Password"
          className="border-2 border-gray-500 text-white px-2"
          value={details.password}
          onChange={handleChange}
        />
        {errorMessage.password && (
          <p className="error-message text-red-500 text-sm">{errorMessage.password}</p>
        )}
      </div>

      <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}

export default RealTimeFeedbackForm;
