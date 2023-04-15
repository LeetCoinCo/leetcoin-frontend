import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getQuestion } from "../../constants/questions";
import "xterm/css/xterm.css";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { get } from "http";
// const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });
import { recordProblemVisit } from "../../utils/recordProblemVisit";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Question = () => {
  // state
  const router = useRouter();
  const { question } = router.query;
  const questionObj = getQuestion(parseInt(question as string));
  const questionId = questionObj?.QuestionId;

  const [postBody, setPostBody]: any = React.useState(questionObj?.Stub);

  const callbackPostBody = (
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ) => {
    if (value) {
      setPostBody(value);
    }
  };

  const [selectedLanguage, setSelectedLanguage] = React.useState("rust");
  const supportedLanguages = [
    "markdown",
    "javascript",
    "typescript",
    "html",
    "css",
    "json",
    "rust",
    "sol",
  ];

  const [terminal, setTerminal]: any = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] =
    useState("Loading...");

  const handleLanguageChange = (e: any) => {
    setSelectedLanguage(e.target.value);
  };
  const user = useUser();

  useEffect(() => {
    if (user) {
      recordProblemVisit(user.id, questionId);
    }
  }, [user, questionId]);

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
        convertEol: true,

        // wrapMode: true, // add this line to enable text wrapping
      });

      const fitAddon: any = new FitAddon();

      term.loadAddon(fitAddon);
      term.open(document.getElementById("terminal") as HTMLElement);
      fitAddon.fit();

      setTerminal(term);
      // console.log("Terminal initialized:", term);
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

  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const getResponse = async (text: string) => {
    //TODO make context aware of description and example

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }

    return data.data;
  };

  const handleTerminalSubmit = async () => {
    setLoading(true);
    setCurrentLoadingMessage("Submitting...");
    try {
      if (terminal) {
        let responseText = await getResponse(postBody);
        const formattedText = await formatResponseText(responseText);
        terminal.writeln(formattedText);
      }
      setLoading(false);
      setShowTerminal(true);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const formatResponseText = (responseText: any) => {
    let formattedText = responseText
      .split("\n")
      .map((line: any) => line.trim())
      .join("\n")
      .replace(/(\d+\.)/g, "\n$1")
      .replace(/optimized/g, colorizeText("optimized", "orange"))
      .replace(/Optimized/g, colorizeText("Optimized", "orange"))
      .replace(/Optimize/g, colorizeText("Optimized", "orange"))
      .replace(/error/g, colorizeText("error", "red"))
      .replace(/Error/g, colorizeText("Error", "red"))
      .replace(/errors/g, colorizeText("errors", "red"))
      .replace(/Errors/g, colorizeText("Errors", "red"));

    return formattedText;
  };

  const colorizeText = (text: any, color: any) => {
    const colorCodes: any = {
      red: "\x1b[31m",
      orange: "\x1b[33m",
      reset: "\x1b[0m",
    };

    return `${colorCodes[color]}${text}${colorCodes.reset}`;
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="text-3xl font-bold mb-10"> {questionObj?.Title}</div>
      <div className="font-bold">Description:</div>
      <div className="mb-5 bg-gray-100 px-4 sm:px-6 lg:px-8 rounded-lg w-1/2 pt-5 pb-5 mt-2">
        {questionObj?.Description}
      </div>
      <div className="font-bold">Example:</div>
      <div className="mb-5 bg-gray-100 px-4 sm:px-6 lg:px-8 rounded-lg w-1/2 pt-5 pb-5 mt-2">
        {questionObj?.Example}
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
        <div className="w-3/5 pr-4">
          <div className="h-96 overflow-y-scroll border border-gray-300 rounded resize overflow-auto">
            <Editor
              height="100%"
              defaultLanguage="rust"
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
            {loading && (
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
                  {currentLoadingMessage}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
