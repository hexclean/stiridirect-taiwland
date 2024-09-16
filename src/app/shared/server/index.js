"use server";

import config from "../../../../config/config";

export const saveClickedCategory = async (category) => {
  const { apiUrl } = config;

  try {
    const response = await fetch(
      `${apiUrl}/api/analytics/clicked-navigation-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
      }
    );

    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to save portals");
    }

    const result = await response.json();
  } catch (error) {
    console.error("Error saving portals:", error);
  }
};
