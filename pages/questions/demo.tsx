import React, { useState, useEffect, useRef } from "react";
import { getQuestion } from "../../constants/questions";
import "xterm/css/xterm.css";

import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const Question = () => {
  // state
  const question = getQuestion("q1");
  const [postBody, setPostBody] = React.useState(
    "// SPDX-License-Identifier: MIT \n // compiler version must be greater than or equal to 0.8.17 and less than 0.9.0 \n pragma solidity ^0.8.17; \n contract HelloWorld { \n string public greet = 'Hello World!'; \n}"
  );
  const [selectedLanguage, setSelectedLanguage] = React.useState("sol");
  const supportedLanguages = ["sol"];
  const [terminal, setTerminal] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const handleLanguageChange = (e: any) => {
    setSelectedLanguage(e.target.value);
  };

  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import("xterm");
      const { FitAddon } = await import("xterm-addon-fit");

      const term: any = new Terminal();
      const fitAddon: any = new FitAddon();

      term.loadAddon(fitAddon);
      term.open(document.getElementById("terminal") as HTMLElement);
      fitAddon.fit();

      setTerminal(term);
    };

    initTerminal();
  }, []);

  const handleTerminalSubmit = () => {
    setLoading(true);
    // const result = compileCode(postBody, selectedLanguage);
    setTimeout(() => {
      setLoading(false);
      setShowTerminal(true);
      const result = "Hahahaha noob";
      // @ts-ignore
      terminal?.write(result);
    }, 2000);
  };
  return (
    <div className="container mx-auto mt-10">
      <div className="text-3xl font-bold mb-10"> {question.Title}</div>
      <div className="font-bold">Description:</div>
      <div className="mb-5 bg-gray-100 px-4 sm:px-6 lg:px-8 rounded-lg w-1/2 pt-5 pb-5 mt-2">
        {question.Description}
      </div>
      <div className="font-bold">Example:</div>
      <div className="mb-5 bg-gray-100 px-4 sm:px-6 lg:px-8 rounded-lg w-1/2 pt-5 pb-5 mt-2">
        {question.Example}
      </div>

      <div className="mb-2">Select Language:</div>
      <div className="inline-block relative">
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {supportedLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.293a1 1 0 0 0-1.414-1.414L10 8.586 6.707 5.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4z" />
          </svg>
        </div>
      </div>

      <div className="mt-4 flex">
        {showContent && (
          <div className="absolute inset-0 bg-white z-50">
            <div className="animate-pulse bg-gray-200 w-full h-full z-50"></div>
          </div>
        )}
        <MonacoEditor
          editorDidMount={() => {
            setShowContent(false);
            // @ts-ignore
            window.MonacoEnvironment.getWorkerUrl = (
              _moduleId: string,
              label: string
            ) => {
              if (label === "json") return "_next/static/json.worker.js";
              if (label === "css") return "_next/static/css.worker.js";
              if (label === "html") return "_next/static/html.worker.js";
              if (label === "rust") return "_next/static/rust.worker.js";
              if (label === "sol") return "_next/static/sol.worker.js";
              if (label === "solidity")
                return "_next/static/solidity.worker.js";
              if (label === "typescript" || label === "javascript")
                return "_next/static/ts.worker.js";
              return "_next/static/editor.worker.js";
            };
          }}
          width="1000"
          height="600"
          language={selectedLanguage}
          theme="vs-dark"
          value={postBody}
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onChange={setPostBody}
        />
        <div className="">
          <div id="terminal" className="w-3/4 h-full bg-black relative">
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center">
                <svg
                  className="animate-spin h-12 w-12 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 100-16 8 8 0 000 16zm8-7.938A7.962 7.962 0 0120 12h-4c0 3.042-1.135 5.824-3 7.938l3 2.647z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        className="bg-orange-500 mt-5 mb-5 hover:bg-orange-700 text-white font-bold py-2 px-4  border-orange-700 rounded"
        onClick={handleTerminalSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Question;
