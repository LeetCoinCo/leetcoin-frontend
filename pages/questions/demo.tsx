import React, { useState, useEffect, useRef } from "react";
import { getQuestion } from "../../constants/questions";
import "xterm/css/xterm.css";
import Editor from "@monaco-editor/react";
import axios from "axios";
import dynamic from "next/dynamic";
import * as monaco from "monaco-editor";
// const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const Question = () => {
  // state
  const question = getQuestion("q1");
  const [postBody, setPostBody] = React.useState(
    " // SPDX-License-Identifier: MIT \n // compiler version must be greater than or equal to 0.8.17 and less than 0.9.0 \n pragma solidity ^0.8.0; \n contract TodoList { \n \t uint256 public taskCount = 0; \n \t struct Task { \n \t \t uint256 id; \n \t \t string content; \n \t \t bool completed; \n \t } \n \t mapping(uint256 => Task) public tasks; \n \t function createTask(string memory _content) public { \n \t \t taskCount++; \n \t \t tasks[taskCount] = Task(taskCount, _content, false); \n \t \t } \n } \n"
  );

  const callbackPostBody = (
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ) => {
    if (value) {
      setPostBody(value);
    }
  };

  const [selectedLanguage, setSelectedLanguage] = React.useState("sol");
  const supportedLanguages = ["sol", "javascript", "typescript", "rust"];
  const [terminal, setTerminal] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (e: any) => {
    setSelectedLanguage(e.target.value);
  };

  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import("xterm");
      const { FitAddon } = await import("xterm-addon-fit");

      const term: any = new Terminal({
        cursorBlink: true,
        cursorStyle: "bar",
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
        scrollback: 1000,
        // wrapMode: true, // add this line to enable text wrapping
      });

      const fitAddon: any = new FitAddon();

      term.loadAddon(fitAddon);
      term.open(document.getElementById("terminal") as HTMLElement);
      fitAddon.fit();

      setTerminal(term);
    };

    initTerminal();
  }, []);

  const filterOutput = (input: string): string => {
    const normalizedStr = input
      .replace(/\x1B\[[0-9;]*[mGKH]/g, "")
      .replace(/^\s*:/, "")
      // .replace(/[^\x20-\x7E]+/g, " \n")
      .trim();
    return normalizedStr;
  };

  const handleTerminalSubmit = () => {
    setLoading(true);
    const base64Code = btoa(postBody);
    fetch("https://leetcoin-backend.herokuapp.com/api/demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: base64Code,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("HELLO");
        // console.log(data);
        setLoading(false);
        setShowTerminal(true);
        let out = "";
        if ("rawOutput" in data) {
          out = data.rawOutput;
        } else if ("error" in data) {
          out = data.error;
        } else {
          out = "error when submitting";
        }
        // @ts-ignore
        let filtered: string = filterOutput(out);
        console.log(filtered);
        if (terminal) {
          (terminal as any).write(filtered);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
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
          disabled
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
        <div className="w-3/5 pr-4">
          <div className="h-96 overflow-y-scroll border border-gray-300 rounded resize overflow-auto">
            <Editor
              height="100%"
              defaultLanguage="sol"
              defaultValue="// some comment"
              theme="vs-dark"
              language={selectedLanguage}
              value={postBody}
              onChange={callbackPostBody}
            />
          </div>
          <button
            className="bg-orange-500 mt-5 mb-5 hover:bg-orange-700 text-white font-bold py-2 px-4  border-orange-700 rounded"
            onClick={handleTerminalSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
        <div className="w-2/5">
          <div
            id="terminal"
            className="h-96 resize overflow-auto bg-black border border-gray-300 rounded relative"
          >
            <div className="absolute inset-0 flex justify-center items-center">
              <svg
                className="animate-spin h-12 w-12 text-orange-500"
                viewBox="0 0 24 24"
              >
                <defs>
                  <linearGradient
                    id="orange-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ff7f00" />
                    <stop offset="50%" stopColor="#ffaf46" />
                    <stop offset="100%" stopColor="#ffc97c" />
                  </linearGradient>
                </defs>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="url(#orange-gradient)"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 100-16 8 8 0 000 16zm8-7.938A7.962 7.962 0 0120 12h-4c0 3.042-1.135 5.824-3 7.938l3 2.647z"
                />
              </svg>
              <span className="ml-2 text-orange-500 animate-pulse">
                Loading...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
