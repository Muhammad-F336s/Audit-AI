import Editor from "@monaco-editor/react";
import { IoMdArrowUp } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
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

const UI = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [draftLanguage, setDraftLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [responseText, setResponseText] = useState("Ai");
  const [isLoading, setIsLoading] = useState(false);

  const [code, setCode] = useState(`INSTRUCTIONS
    1. Select language from the dropdown and press Enter.
    2. Paste your code here to audit.`);

  // Editor Value Handler
  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  // Language Selection Handlers
  const handleLanguageChange = (e) => {
    setDraftLanguage(e.target.value);
  };

  const handleLanguageKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Monaco language IDs should be lowercase
      const formattedLang = draftLanguage.trim().toLowerCase();
      setSelectedLanguage(formattedLang);
      console.log(`User agreed on: ${formattedLang}`);
    }
  };

  // Prompt Submit Handler
  const submitUserQuery = () => {
    if (!userPrompt.trim()) return;
    alert(`User Prompted: ${userPrompt}`);
  };

  // Main Audit Form Submit Action
  const handleOperationSubmit = async (operationType) => {
    if (!code.trim()) {
      alert("Please enter some code first!");
      return;
    }

    setIsLoading(true);
    setResponseText("Analyzing code, please wait...");

    try {
      const response = await fetch("http://localhost:3000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          language: selectedLanguage,
          operation: operationType,
          prompt: userPrompt,
        }),
      });

      const result = await response.json();
      console.log("Server Response:", result);
      setResponseText(result.message || "Response received successfully.");
    } catch (error) {
      console.error("API Call Failed:", error);
      setResponseText("Failed to get response from server.");
    } finally {
      setIsLoading(false);
    }
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
        <div className="editor-form">
          <div className="main-window">
            {/* Editor Window */}
            <div className="editor">
              <Editor
                className="code-editor"
                height="100%"
                width="100%"
                language={selectedLanguage}
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                options={{
                  fontSize: 15,
                  fontFamily: "Fira Code, monospace",
                  lineHeight: 24,
                  padding: { top: 16, bottom: 16 },
                  cursorBlinking: "smooth",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Chat & Diagnostic Panel */}
            <div className="chat-window">
              <div className="selector-list">
                <input
                  className="language-selector"
                  type="text"
                  list="languages-list"
                  placeholder="Select language and press Enter"
                  value={draftLanguage}
                  onChange={handleLanguageChange}
                  onKeyDown={handleLanguageKeyDown}
                />

                <datalist id="languages-list">
                  {Languages.map((language) => (
                    <option key={language} value={language} />
                  ))}
                </datalist>

                <div className="language-display">
                  {selectedLanguage.toUpperCase()}
                </div>
              </div>

              <div className="response-display">
                {isLoading ? (
                  <p>Processing Request...</p>
                ) : (
                  <p>{responseText}</p>
                )}
              </div>

              <div className="prompt-window">
                <input
                  type="text"
                  className="prompt-reciever"
                  placeholder="Describe Your Query Here..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
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

          {/* Action Buttons */}
          <div className="imp-btns">
            <button
              type="button"
              onClick={() => handleOperationSubmit("Analyze")}
              className="submit-btn"
            >
              Analyze
            </button>

            <button
              type="button"
              onClick={() => handleOperationSubmit("Shorten It")}
              className="shorten-btn"
            >
              Shorten It
            </button>

            <button
              type="button"
              onClick={() => handleOperationSubmit("Beautify It")}
              className="beautify-btn"
            >
              Beautify It
            </button>

            <button
              type="button"
              onClick={() => handleOperationSubmit("Feedback")}
              className="feedback-btn"
            >
              Feedback
            </button>

            <button
              type="button"
              onClick={() => setCode("")}
              className="clear-btn"
            >
              Clear
            </button>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-bottom">
          <p>© 2026 Audit. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default UI;
