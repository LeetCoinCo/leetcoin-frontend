import NextLink from "next/link";
import router from "next/router";

const questions = [
  //Two Sum, Reverse String, Single Number, Longest Common Prefix, Search Insert Position
  {
    number: 1,
    title: "Solid Snake",
    difficulty: "Easy",
    frequency: 100,
    rating: 4,
    category: "Ink!",
  },
  {
    number: 2,
    title: "Solidus Snake",
    difficulty: "Easy",
    frequency: 90,
    rating: 5,
    category: "Ink!",
  },
  {
    number: 3,
    title: "Liquid Solid Snake",
    difficulty: "Hard",
    frequency: 50,
    rating: 5,
    category: "Ink!",
  },
  {
    number: 4,
    title: "Nomad Bridge",
    difficulty: "Med",
    frequency: 20,
    rating: 3,
    category: "Ink!",
  },
  {
    number: 5,
    title: "Not So Smart Contract",
    difficulty: "Hard",
    frequency: 10,
    rating: 5,
    category: "Ink!",
  },
  // More questions...
];

interface TableProps {
  rowData: any; // the rows of the table, this an array of JSX elements
  relativeLink: string; // this is the non dynamic relative path
}

export default function Table({ rowData, relativeLink }: TableProps) {
  const handleSubmit = (value: any) => {
    console.log(value);
    router.push(`/questions/${value}`);
  };

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
        <div className="mt-8 flex flex-col w-8/12">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-700 ">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold "
                      >
                        Difficulty
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold "
                      >
                        Frequency
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold "
                      >
                        Rating
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold "
                      >
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {questions.map((question, questionIdx) => (
                      <tr
                        key={question.title}
                        className={`hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-50 duration-300  ${
                          questionIdx % 2 === 0 ? undefined : "bg-gray-100"
                        }`}
                        onClick={() => handleSubmit(questionIdx)}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                          {question.number}
                        </td>

                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                          {question.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {question.difficulty === "Easy" && (
                            <div className="bg-green-500 text-white font-bold py-2 px-4 w-16 rounded-full">
                              {question.difficulty}
                            </div>
                          )}
                          {question.difficulty === "Med" && (
                            <div className="bg-yellow-500 text-white font-bold py-2 px-4 w-16 rounded-full">
                              {question.difficulty}
                            </div>
                          )}
                          {question.difficulty === "Hard" && (
                            <div className="bg-red-500 text-white font-bold py-2 px-4 w-16 rounded-full">
                              {question.difficulty}
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                          {question.frequency}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                          {question.rating}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                          {question.category}
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
