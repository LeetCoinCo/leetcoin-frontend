import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getQuestion } from "../../constants/questions";

import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const Question = () => {
  const router = useRouter();
  // state
  const question = getQuestion("q1");
  const [postBody, setPostBody] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("markdown");
  const supportedLanguages = [
    "markdown",
    "javascript",
    "typescript",
    "html",
    "css",
    "json",
    "rust",
    "solidity",
  ];

  const handleLanguageChange = (e: any) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="container mx-auto ">
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

      <div className="mt-4">
        <MonacoEditor
          editorDidMount={() => {
            // @ts-ignore
            window.MonacoEnvironment.getWorkerUrl = (
              _moduleId: string,
              label: string
            ) => {
              if (label === "json") return "_next/static/json.worker.js";
              if (label === "css") return "_next/static/css.worker.js";
              if (label === "html") return "_next/static/html.worker.js";
              if (label === "rust") return "_next/static/rust.worker.js";
              if (label === "solidity")
                return "_next/static/solidity.worker.js";
              if (label === "typescript" || label === "javascript")
                return "_next/static/ts.worker.js";
              return "_next/static/editor.worker.js";
            };
          }}
          width="800"
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
      </div>
      <button className="bg-orange-500 mt-5 mb-5 hover:bg-orange-700 text-white font-bold py-2 px-4  border-orange-700 rounded">
        Submit
      </button>
    </div>
  );
};

export default Question;
