import router from "next/router";
import React, { useState } from "react";

import { getQuestions } from "constants/questions";

interface TableProps {
  rowData: any; // the rows of the table, this an array of JSX elements
  relativeLink: string; // this is the non dynamic relative path
}

export default function Table({ rowData, relativeLink }: TableProps) {
  const handleSubmit = (value: number) => {
    console.log(value);
    router.push(`/questions/${value}`);
  };

  let questions = getQuestions();
  const [sortConfig, setSortConfig] = useState({
    key: "QuestionId",
    direction: "asc",
  });
  const requestSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedQuestions = React.useMemo(() => {
    let sortableQuestions = [...questions];
    if (sortConfig.key) {
      sortableQuestions.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableQuestions;
  }, [questions, sortConfig]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold flex justify-center">
            Problems
          </h1>
          <p className="mt-2 text-sm flex justify-center ">
            A set of all practice problems
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-8 flex flex-col w-full sm:w-10/12 lg:w-8/12">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full md:divide-y md:divide-gray-700 ">
                  <thead className="bg-gray-100 collapse md:visible">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 hover:cursor-pointer pl-4 pr-3 text-left text-sm font-semibold sm:pl-6 hover:cursor-pointer"
                        onClick={() => requestSort("QuestionId")}
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 hover:cursor-pointer pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                        onClick={() => requestSort("Title")}
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="hidden hover:cursor-pointer sm:table-cell px-3 py-3.5 text-left text-sm font-semibold "
                        onClick={() => requestSort("Difficulty")}
                      >
                        Difficulty
                      </th>
                      <th
                        scope="col"
                        className="hidden hover:cursor-pointer sm:table-cell px-3 py-3.5 text-left text-sm font-semibold "
                        onClick={() => requestSort("Frequency")}
                      >
                        Frequency
                      </th>
                      <th
                        scope="col"
                        className="hidden hover:cursor-pointer sm:table-cell px-3 py-3.5 text-left text-sm font-semibold "
                        onClick={() => requestSort("Rating")}
                      >
                        Rating
                      </th>
                      <th
                        scope="col"
                        className="hidden hover:cursor-pointer sm:table-cell px-3 py-3.5 text-left text-sm font-semibold "
                        onClick={() => requestSort("Category")}
                      >
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {sortedQuestions.map((question, questionIdx) => (
                      <tr
                        key={question.Title}
                        className={`hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-50 duration-300  ${
                          questionIdx % 2 === 0 ? undefined : "bg-gray-100"
                        }`}
                        onClick={() => handleSubmit(question.QuestionId)}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                          {question.QuestionId}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                          {question.Title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {question.Difficulty === "Easy" && (
                            <div className="bg-green-500 text-white font-bold py-2 px-4 w-16 rounded-full">
                              {question.Difficulty}
                            </div>
                          )}
                          {question.Difficulty === "Med" && (
                            <div className="bg-yellow-500 text-white font-bold py-2 px-4 w-16 rounded-full">
                              {question.Difficulty}
                            </div>
                          )}
                          {question.Difficulty === "Hard" && (
                            <div className="bg-red-500 text-white font-bold py-2 px-4 w-16 rounded-full">
                              {question.Difficulty}
                            </div>
                          )}
                        </td>
                        <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm ">
                          {question.Frequency}
                        </td>
                        <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm ">
                          {question.Rating}
                        </td>
                        <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm ">
                          {question.Category}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
