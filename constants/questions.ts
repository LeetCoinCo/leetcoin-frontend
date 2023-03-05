export interface Question {
  Title: string;
  Description: string;
  Example: string;
  QuestionId: number;
}

export type QuestionId = "q1";

const questions: { [key in QuestionId]: Question } = {
  q1: {
    Title: "Todo List",
    Description:
      "Welcome to the world of Solidity and blockchain where even your daily to-do list needs to be secured! In this challenge, you will create a smart contract that allows you to add tasks to a to-do list on the blockchain. Your goal is to write a smart contract:\n1. The contract keeps track of the To-Do tasks of the user\n2. The contract has only one function createTask that accepts To-Do task content\n3. The createTask function keeps track of the amount of tasks and saves it\n\nYour contract will be run against the test suites",
    Example:
      "Input: createTask('Buy groceries'); Output: Task created: ID: 1 Content: 'Buy groceries' Completed: false",
    QuestionId: 1,
  },
};

export const getQuestion = (questionId: QuestionId): Question =>
  questions[questionId];
