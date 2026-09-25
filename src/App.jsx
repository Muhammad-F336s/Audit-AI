// import { useState } from 'react'
// import { useForm } from "react-hook-form";
// import { useState } from "react";
import "./App.css";
import UI from "./UI";

function App() {
  // const [message, setMessage] = useState("Ai Response will be displayed here");

  // const onSubmit = async (data) => {
  //   const response = await fetch("http://localhost:3000/api/ask", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   const result = await response.json();
  //   console.log("Submitted data:", data);
  //   console.log("Server response:", result);
  //   setMessage(result.message || "No username received");
  // };

  // const { register, handleSubmit } = useForm();

  return (
    <>
      <UI />
      {/* <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          type="text"
          placeholder="Enter your name"
          id="form-username-input"
          {...register("username", { required: true })}
        />
        <input type="submit" value="Submit" className="form-button" />
      </form>
      <div className="ai-response">{message}</div> */}
    </>
  );
}

export default App;
