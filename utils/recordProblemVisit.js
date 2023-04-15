import supabase from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const recordProblemVisit = async (userId, problemId) => {
  try {
    if (!userId || !problemId) {
      console.error("User ID or Problem ID is missing");
      return null;
    }

    // Check if there is an existing visit for the given user_id and problem_id
    const { data: currentProfile, error: existingVisitError } = await supabase
      .from("profiles")
      .select("problems_attempted")
      .eq("id", userId);
    if (existingVisitError) {
      throw existingVisitError;
    }

    const problemsAttempted = currentProfile[0].problems_attempted.problems;
    // If the problemId is already in the list of problems attempted, return early
    if (problemsAttempted.includes(problemId)) {
      console.log("Problem already attempted");
      return null;
    }

    // Append the problemId to the list of problems attempted
    problemsAttempted.push(problemId);

    // Update the profiles table with the new list of problems attempted
    const { data: updatedProfile, error: updateProfileError } = await supabase
      .from("profiles")
      .update({ problems_attempted: { problems: problemsAttempted } })
      .eq("id", userId);

    if (updateProfileError) {
      throw updateProfileError;
    }

    return updatedProfile;
  } catch (error) {
    console.error("Error recording problem visit:", error);
    return null;
  }
};
