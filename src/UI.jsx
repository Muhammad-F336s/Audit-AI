import Editor from "@monaco-editor/react";
import { IoMdArrowUp } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { TbAnalyze } from "react-icons/tb";
import { useEffect, useState } from "react";
import { FaLessThanEqual } from "react-icons/fa6";
import { PiFlowerLotusThin } from "react-icons/pi";
import { RiMessageAi3Line } from "react-icons/ri";
import { TbWashDryclean } from "react-icons/tb";
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
  const [visibility, setVisibility] = useState("hidden");

  const [userPrompt, setUserPrompt] = useState("");
  const [draftLanguage, setDraftLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [responseText, setResponseText] = useState(
    "Please enter some code to audit.",
  );
  const [isLoading, setIsLoading] = useState(false);

  const [code, setCode] = useState(`INSTRUCTIONS
    1. Select language from the dropdown and press Enter.
    2. Paste your code here to audit.`);

  // Editor Value Handler
  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  // Visibility manager for "action-button-holder"
  const toggleVisibility = (event) => {
    event?.stopPropagation();
    setVisibility((prev) => (prev === "hidden" ? "visible" : "hidden"));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const actionButtonHolder = document.querySelector(
        ".action-button-holder",
      );
      const actionIcon = document.querySelector(".icon");
      const clickedInsideActionArea =
        actionButtonHolder?.contains(event.target) ||
        actionIcon?.contains(event.target);

      if (!clickedInsideActionArea) {
        setVisibility("hidden");
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
    if (!userPrompt.trim()) {
      return;
    }

    alert(`User Prompted: ${userPrompt}`);
  };

  // Main Audit Form Submit Action
  const handleOperationSubmit = async (operationType) => {
    if (!code.trim()) {
      setUserPrompt("");
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

  const handleBtnClick = (e) => {
    const label = e.currentTarget.getAttribute("label");
    handleOperationSubmit(label);
    if (!code.trim()) {
      setUserPrompt("");
      alert("Please enter some code to audit.");
      return;
    } else if (label === "Analyze")
      setUserPrompt(
        `${label} my ${selectedLanguage} code for bugs and issues.`,
      );
    else if (label === "Shorten")
      setUserPrompt(
        `${label} my ${selectedLanguage} code while keeping its behavior.`,
      );
    else if (label === "Beautify")
      setUserPrompt(
        `${label} my ${selectedLanguage} code for better readability.`,
      );
    else if (label === "Feedback")
      setUserPrompt(
        `${label} on my ${selectedLanguage} code for improvement suggestions.`,
      );
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
              <div className="base-section">
                <div className="action-btns-container">
                  <div className="icon" onClick={toggleVisibility}>
                    {/* <TiArrowSortedUp */}
                    <FaPlus
                      style={{
                        zoom: 1,
                      }}
                    />
                  </div>
                  <div className="action-button-holder" style={{ visibility }}>
                    <button
                      type="button"
                      onClick={handleBtnClick}
                      className="submit-btn action-btn"
                      data-tooltip="Analyze code for bugs and issues"
                      aria-label="Analyze code"
                      label="Analyze"
                    >
                      <TbAnalyze />
                    </button>

                    <button
                      type="button"
                      onClick={handleBtnClick}
                      label="Shorten"
                      className="shorten-btn action-btn"
                      data-tooltip="Shorten code while keeping its behavior"
                      aria-label="Shorten code"
                    >
                      <FaLessThanEqual />
                    </button>

                    <button
                      type="button"
                      onClick={handleBtnClick}
                      label="Beautify"
                      className="beautify-btn action-btn"
                      data-tooltip="Format code for better readability"
                      aria-label="Beautify code"
                    >
                      <PiFlowerLotusThin />
                    </button>

                    <button
                      type="button"
                      onClick={handleBtnClick}
                      label="Feedback"
                      className="feedback-btn action-btn"
                      data-tooltip="Get feedback & improvement suggestions"
                      aria-label="Get feedback"
                    >
                      <RiMessageAi3Line
                        style={{
                          rotate: "180deg",
                        }}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCode("");
                        setUserPrompt("");
                        setResponseText("Please enter some code to audit.");
                      }}
                      label="Clear"
                      className="clear-btn action-btn"
                      data-tooltip="Clear code from the editor"
                      aria-label="Clear code"
                    >
                      <TbWashDryclean />
                    </button>
                  </div>
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
          </div>
        </div>
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
