import React, { useState, useRef, useEffect } from "react";
import jazzicon from "@metamask/jazzicon";
import { animated, useSpring } from "react-spring";
import { getQuestion } from "@/constants/questions";
import router from "next/router";
import Link from "next/link";

interface ProfileProps {
  problemsAttempted: number[];
  problemsCompleted: number[];
  rank: string;
}

export const Profile: React.FC<ProfileProps> = ({
  problemsAttempted = [1, 3, 6],
  problemsCompleted = [2],
  rank = "Degen Koder",
}) => {
  const animatedProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const [name, setName] = useState("John Doe");
  const [address, setAddress] = useState(
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  );
  const iconRef: any = useRef();

  const handleSubmit = (value: number) => {
    console.log(value);
    router.push(`/questions/${value}`);
  };

  useEffect(() => {
    if (address && iconRef.current) {
      iconRef.current.innerHTML = "";
      iconRef.current.appendChild(
        jazzicon(48, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <animated.div style={animatedProps} className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto p-8 flex flex-col justify-center items-center space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <div ref={iconRef} className="w-12 h-12"></div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-200 bg-slate-100 rounded-lg px-4 py-2 text-lg w-60 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
            Rank: {rank}
          </h2>
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <h3 className="text-xl font-semibold">
                Problems Attempted: {problemsAttempted.length}
              </h3>
              <ul className="list-disc list-inside">
                {problemsAttempted.map((problemId) => {
                  const problem = getQuestion(problemId);
                  if (!problem) return null;
                  return (
                    <li key={problemId} className="text-lg">
                      <a
                        onClick={() => handleSubmit(problemId)}
                        className="text-blue-600 hover:cursor-pointer hover:opacity-80"
                      >
                        {problem.Title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Problems Completed: {problemsCompleted.length}
              </h3>
              <ul className="list-disc list-inside">
                {problemsCompleted.map((problemId) => {
                  const problem = getQuestion(problemId);
                  if (!problem) return null;
                  return (
                    <li key={problemId} className="text-lg">
                      <a
                        onClick={() => handleSubmit(problemId)}
                        className="text-blue-600 hover:cursor-pointer hover:opacity-80"
                      >
                        {problem.Title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Profile;
