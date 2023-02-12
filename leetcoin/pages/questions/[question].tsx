import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getQuestion } from "../../constants/questions";

const Question = () => {
  const router = useRouter();
  // state
  const question = getQuestion("q1");

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
      <div className=" mb-2">DropDown</div>
      <div className=" mb-5">Code Editor</div>

      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4  border-orange-700 rounded">
        Submit
      </button>
    </div>
  );
};

export default Question;
