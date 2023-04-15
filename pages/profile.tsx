import React, { useState, useRef, useEffect } from "react";
import jazzicon from "@metamask/jazzicon";
import { animated, useSpring } from "react-spring";
import { getQuestion } from "@/constants/questions";
import router from "next/router";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import supabase from "../supabaseClient";

interface ProfileProps {
  problemsAttempted: number[];
  problemsCompleted: number[];
  rank: string;
}

export const Profile: React.FC<ProfileProps> = ({}) => {
  const animatedProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [problemsAttempted, setProblemsAttempted] = useState([]);
  const [problemsCompleted, setProblemsCompleted] = useState([]);

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

  const user = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      const id = user?.id;

      let { data, error } = await supabase
        .from("profiles")
        .select("user_name, user_rank, problems_attempted, problems_completed")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
      } else {
        setName(data?.user_name);
        setRank(data?.user_rank);
        setProblemsAttempted(data?.problems_attempted.problems);
        setProblemsCompleted(data?.problems_completed.problems);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const updateUserName = async (newName: string) => {
    const id = user?.id;

    if (id) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ user_name: newName })
        .eq("id", id);

      if (error) {
        console.error("Error updating user name:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <animated.div style={animatedProps} className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto p-8 flex flex-col justify-center items-center space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <div ref={iconRef} className="w-12 h-12"></div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                updateUserName(e.target.value);
              }}
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
