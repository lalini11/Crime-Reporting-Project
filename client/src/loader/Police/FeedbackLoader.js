import { getAuthToken } from "../../action/user/Auth";
import { API } from "../../API";

export async function loader() {
  // Return the promise directly (do not await)
  const policefeedbackData = loadPoliceFeedback();

  return { policefeedbackData };
}

//  Function to fetch users' feedbacks (returns promise)
async function loadPoliceFeedback() {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API}/police/feedback`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // for token authentication
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData?.error || "Failed to fetch users' feedbacks");
    }

    return response.json(); // Return the JSON response
  } catch (error) {
    throw new Error(error.message || "Something went wrong while fetching users' feedbacks.");
  }
}
