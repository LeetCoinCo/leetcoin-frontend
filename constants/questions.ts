export interface Question {
  Title: string;
  Description: string;
  Example: string;
  QuestionId: number;
}

export type QuestionId = "q1";

const questions: { [key in QuestionId]: Question } = {
  q1: {
    Title: "Solid Snake",
    Description:
      "Your task is to write a function that will take in a sequence of moves that Solid Snake makes in a two-dimensional grid, represented by a string containing 'U' for up, 'D' for down, 'L' for left, and 'R' for right. The function should return the final position of Solid Snake after performing all the given moves. Solid Snake starts at position (0, 0) in the grid. The grid is a rectangular shape, and has a width of w and a height of h. If Solid Snake moves out of the grid, the function should return None. Solid Snake cannot move through walls.",
    Example:
      "let result = final_position(5, 5, 'RUULDD'); assert_eq!(result, Some((2, 2)));",
    QuestionId: 1,
  },
};

export const getQuestion = (questionId: QuestionId): Question =>
  questions[questionId];
