// import React from "react";
import Editor from "@monaco-editor/react";
import { IoMdArrowUp } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./App.css";

const Languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Scala",
  "SQL",
  "HTML",
  "CSS",
  "React",
  "React Native",
  "Next.js",
  "Vue",
  "Angular",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "R",
  "MATLAB",
  "Perl",
  "Shell",
  "Bash",
  "Assembly",
  "Lua",
  "Haskell",
  "Elixir",
  "F#",
  "Julia",
  "Dart",
  "Flutter",
  "SwiftUI",
];
const prepareResponseSet = () => {
  console.log("Preparing Display");
  const editorWindow = document.querySelector(".editor");
  const responseWindow = document.querySelector(".response-window");

  if (editorWindow) {
    console.log("editorWindow");
  }

  if (responseWindow) {
    console.log("Response Window");
  }
};

const UI = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [text, setText] = useState("Ai");
  const { register, handleSubmit } = useForm();
  const [code, setCode] = useState("'Place your code here...'");
  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const submitUserQuery = () => {
    alert(`user prompted: ${userPrompt}`);
  };

  const onSubmit = async (data, btn) => {
    prepareResponseSet();
    setTimeout(async () => {
      const response = await fetch("http://localhost:3000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: data, operation: btn }),
      });
      const result = await response.json();
      console.log("Submitted data:", data);
      console.log("Server response:", result);
      console.log("Message from server:", result.message);
      setText(result.message);
      alert(`Server response: ${result.message}`);
    }, 5000);

    // console.log("Editor data:", data);
    // console.log("Operation:", btn);
  };
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-logo">
            <span>Audit</span>
            <FaCode className="navbar-logo-icon" />
          </div>
          <ul className="navbar-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="submit"
          className="editor-form"
        >
          <div className="main-window">
            <div className="editor">
              <Editor
                className="code-editor"
                {...register("username", { required: true })}
                height="100%"
                width="100%"
                margin="auto"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(e) => {
                  handleEditorChange(e);
                }}
                options={{
                  fontSize: 15,
                  fontFamily: "Fira Code, monospace",
                  lineHeight: 24,
                  padding: { top: 16, bottom: 16 },
                  cursorBlinking: "smooth",
                  cursorStyle: "line",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
            <div className="chat-window">
              <div className="selector-list">
                <input
                  className="language-selector"
                  type="text"
                  // id="city"
                  list="languages-list"
                  placeholder="Select your Language || Framework || Library"
                />

                <datalist id="languages-list">
                  {Languages.map((language) => (
                    <option key={language} value={language} />
                  ))}
                </datalist>
              </div>
              {text}
              <div className="prompt-window">
                <input
                  type="text"
                  name="prompt-receiver"
                  className="prompt-reciever"
                  placeholder="Describe Your Query Here..."
                  value={userPrompt}
                  onChange={(e) => {
                    setUserPrompt(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submitUserQuery();
                    }
                  }}
                />
                <button
                  type="button"
                  className="submit-prompt-btn"
                  onClick={submitUserQuery}
                  aria-label="Submit prompt"
                >
                  <IoMdArrowUp />
                </button>
              </div>
            </div>
          </div>
          <div className="imp-btns">
            <input
              type="button"
              value="Analyze"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(code, e.target.value);
              }}
              className="submit-btn"
            />
            <input
              type="button"
              value="Shorten It"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(code, e.target.value);
              }}
              className="shorten-btn"
            />
            <input
              type="button"
              value="Beautify It"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(code, e.target.value);
              }}
              className="beautify-btn"
            />
            <input
              type="button"
              value="Feedback"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(code, e.target.value);
              }}
              className="feedback-btn"
            />
            <input
              type="button"
              value="Clear"
              onClick={(e) => {
                e.preventDefault();
                setCode("");
              }}
              className="clear-btn"
            />
          </div>
        </form>
      </main>
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>Audit</span>
              <FaCode className="footer-logo-icon" />
            </div>
            <p>
              AI-powered code review for cleaner, faster, and more reliable
              software delivery.
            </p>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#docs">Docs</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#support">Support</a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="#linkedin">LinkedIn</a>
              </li>
              <li>
                <a href="#twitter">Twitter</a>
              </li>
              <li>
                <a href="#github">GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Audit. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default UI;
