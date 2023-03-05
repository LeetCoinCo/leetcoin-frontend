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
      "Welcome to the world of Solidity and blockchain where even your daily to-do list needs to be secured! In this challenge, you will create a smart contract that allows you to add tasks to a to-do list on the blockchain. But be careful, completing tasks is serious business in the world of decentralized apps, so make sure your contract is hacker-proof and your tasks are completed with cryptographic precision. Get ready to show off your coding skills and become the ultimate blockchain taskmaster!",
    Example:
      "Input: createTask('Buy groceries'); Output: Task created: ID: 1 Content: 'Buy groceries' Completed: false",
    QuestionId: 1,
  },
};

export const getQuestion = (questionId: QuestionId): Question =>
  questions[questionId];
