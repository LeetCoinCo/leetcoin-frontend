import React from "react";
import type { NextPage } from "next";
import Table from "../components/questions/Table";
const Questions: NextPage = () => {
  const questions = [
    //Two Sum, Reverse String, Single Number, Longest Common Prefix, Search Insert Position
    {
      number: 1,
      title: "Two Sum",
      difficulty: "Easy",
      frequency: 100,
      rating: 4,
      category: "Ink!",
    },
    {
      number: 2,
      title: "Reverse String",
      difficulty: "Easy",
      frequency: 90,
      rating: 5,
      category: "Ink!",
    },
    {
      number: 3,
      title: "Single Number",
      difficulty: "Hard",
      frequency: 50,
      rating: 5,
      category: "Ink!",
    },
    {
      number: 4,
      title: "Longest Common Prefix",
      difficulty: "Med",
      frequency: 20,
      rating: 3,
      category: "Ink!",
    },
    {
      number: 5,
      title: "Search Insert Position",
      difficulty: "Hard",
      frequency: 10,
      rating: 5,
      category: "Ink!",
    },
    // More questions...
  ];
  return (
    <div className="">
      <Table
        relativeLink={`/products/`}
        // colHeaders={["te1", "te1", "tel1", "te1", "te1"]}
        rowData={questions}
        // listOfLinks={["link1", "link2"]}
      ></Table>
    </div>
  );
};

export default Questions;
