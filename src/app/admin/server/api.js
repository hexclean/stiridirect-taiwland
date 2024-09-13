"use server";

import config from "../../../../config/config";

export const fetchNews = async (category, query, page) => {
  const { apiUrl } = config;

  try {
    const news = await fetch(
      `${apiUrl}/api/articles/${category}?${query}&page=${page}`,
      { cache: "no-store" }
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
