"use server";

import config from "../../../../config/config";

export const fetchNews = async (id) => {
  const { apiUrl } = config;
  console.log(`${apiUrl}/api/articles/shared-article/detail/${id}`);
  try {
    const news = await fetch(
      `${apiUrl}/api/articles/shared-article/detail/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!news.ok) {
      throw new Error("One or more requests failed.");
    }
    const newsData = await news.json();
    const res = [
      {
        data: newsData,
      },
    ];

    return res;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};

export const saveSharedArticle = async (id) => {
  const { apiUrl } = config;

  try {
    const response = await fetch(`${apiUrl}/api/analytics/shared-article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to save portals");
    }

    const result = await response.json();
  } catch (error) {
    console.error("Error saving portals:", error);
  }
};

export const saveClickedCategory = async (category) => {
  const { apiUrl } = config;
  console.log("dfsfs");

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

    if (!response.ok) {
      throw new Error("Failed to save portals");
    }

    const result = await response.json();
  } catch (error) {
    console.error("Error saving portals:", error);
  }
};
